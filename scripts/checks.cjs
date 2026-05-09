const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');

const exts = ['.ts', '.js', '.css', '.html', '.json'];

function walk(dir) {
  const results = [];
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      results.push(...walk(p));
    } else if (exts.includes(path.extname(name))) {
      results.push(p);
    }
  }
  return results;
}

function scanFile(file) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split(/\r?\n/);
  const issues = [];

  lines.forEach((line, i) => {
    if (/TODO|FIXME/i.test(line)) issues.push({line: i+1, type: 'TODO/FIXME', text: line.trim()});
    if (/console\.log\(/.test(line)) issues.push({line: i+1, type: 'console.log', text: line.trim()});
    if (/\bas\s+[A-Za-z0-9_<>\[\], ]+/.test(line)) issues.push({line: i+1, type: 'as-cast', text: line.trim()});
    if (/!\s*;|!\s*$/m.test(line) || /\w!\b/.test(line)) {
      if (!/!=/.test(line)) issues.push({line: i+1, type: 'non-null-assertion', text: line.trim()});
    }
  });

  return issues;
}

function main() {
  if (!fs.existsSync(SRC)) {
    console.error('src directory not found');
    process.exit(1);
  }

  const files = walk(SRC);
  const summary = {};
  const report = [];

  files.forEach((file) => {
    const issues = scanFile(file);
    if (issues.length) {
      report.push({file: path.relative(ROOT, file), issues});
      issues.forEach((iss) => {
        summary[iss.type] = (summary[iss.type] || 0) + 1;
      });
    }
  });

  console.log('\nProject heuristic scan report');
  console.log('Files scanned:', files.length);
  console.log('Issue types found:', Object.keys(summary).join(', ') || 'none');
  console.log('Counts:', summary);

  if (report.length === 0) {
    console.log('No heuristic issues found.');
    return;
  }

  console.log('\nDetailed findings:');
  report.forEach((r) => {
    console.log('\n' + r.file);
    r.issues.forEach((iss) => {
      console.log(`  [${iss.type}] line ${iss.line}: ${iss.text}`);
    });
  });
}

main();
