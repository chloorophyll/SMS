import "./style.css";
import { RegularStudent } from "./classes/RegularStudent";
import { Teacher } from "./classes/Teacher";
import { Scholar } from "./classes/Scholar";
import { Student } from "./classes/Student";
import { Administrator } from "./classes/Administrator";
import { StudentManager } from "./managers/StudentManager";

type Role = "regular" | "scholar" | "teacher" | "administrator";

interface User {
  name: string;
  role: Role;
}

interface ClassAssignment {
  className: string;
  subjectName: string;
  teacherName: string;
}

const currentTeacher = new Teacher(1, "Maria Santos", "Computer Science");
currentTeacher.addCourse();

const ADMIN_NAME = "Juan dela Cruz";
const ADMIN_DEPARTMENT = "Administration";
const ADMIN_POSITION = "Dean of Student Affairs";

const subjects = ["Data Structures", "Database Systems", "Web Development"];

const classAssignment: ClassAssignment = {
  className: "BSSE 2A",
  subjectName: subjects[0],
  teacherName: currentTeacher.name,
};

currentTeacher.assignPrimarySubject(classAssignment.subjectName);

const studentManager = new StudentManager();
let currentUser: User | null = null;
let currentAdmin: Administrator | null = null;
const teachersRecords: Teacher[] = [];

const loginSection = document.getElementById("login-section") as HTMLDivElement;
const dashboardSection = document.getElementById(
  "dashboard-section",
) as HTMLDivElement;
const loginForm = document.getElementById("login-form") as HTMLFormElement;
const nameInput = document.getElementById("name-input") as HTMLInputElement;
const roleDropdown = document.getElementById(
  "role-dropdown",
) as HTMLSelectElement;
const personnelColumn = document.getElementById(
  "personnel-column",
) as HTMLDivElement;
const studentList = document.getElementById("student-list") as HTMLDivElement;
const personnelList = document.getElementById(
  "personnel-list",
) as HTMLDivElement;
const logoutBtn = document.getElementById("logout-btn") as HTMLButtonElement;
const userDisplay = document.getElementById("user-display") as HTMLSpanElement;

// ── Events ────────────────────────────────────────────────────────────────────

roleDropdown.addEventListener("change", () => {
  if (roleDropdown.value === "teacher") {
    nameInput.value = currentTeacher.name;
  } else if (roleDropdown.value === "administrator") {
    nameInput.value = ADMIN_NAME;
  } else {
    if (
      nameInput.value === currentTeacher.name ||
      nameInput.value === ADMIN_NAME
    ) {
      nameInput.value = "";
    }
  }
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();
  const role = roleDropdown.value as Role;
  if (!name || !role) return;
  currentUser = { name, role };

  if (role === "teacher" && name === currentTeacher.name) {
    const exists = teachersRecords.some((t) => t.id === currentTeacher.id);
    if (!exists) teachersRecords.push(currentTeacher);
  }

  if (role === "administrator") {
    currentAdmin = new Administrator(
      1,
      ADMIN_NAME,
      ADMIN_DEPARTMENT,
      ADMIN_POSITION,
      studentManager,
    );
  }

  nameInput.value = "";
  roleDropdown.value = "";
  showDashboard();
});

logoutBtn.addEventListener("click", () => {
  currentUser = null;
  currentAdmin = null;
  hideDashboard();
});

// ── Dashboard visibility ──────────────────────────────────────────────────────

function showDashboard(): void {
  if (!currentUser) return;
  loginSection.style.display = "none";
  dashboardSection.style.display = "block";
  personnelColumn.style.display = "block";
  userDisplay.textContent = `${currentUser.name} (${formatRoleName(currentUser.role)})`;
  renderDashboard();
}

function hideDashboard(): void {
  loginSection.style.display = "flex";
  dashboardSection.style.display = "none";
  clearDashboard();
}

// ── Dashboard rendering ───────────────────────────────────────────────────────

function renderDashboard(): void {
  if (!currentUser) return;
  updateLayoutForRole(currentUser.role);
  clearDashboard();
  if (currentUser.role === "regular" || currentUser.role === "scholar") {
    renderStudentView();
  } else if (currentUser.role === "teacher") {
    renderTeacherView();
  } else {
    renderAdministratorView();
  }
}

function clearDashboard(): void {
  studentList.innerHTML = "";
  personnelList.innerHTML = "";
}

// ── Render helpers ────────────────────────────────────────────────────────────

function yearLevelSelected(selectedYearLevel: number, level: number): string {
  return selectedYearLevel === level ? "selected" : "";
}

function subjectSelected(selectedSubject: string, subject: string): string {
  return selectedSubject === subject || selectedSubject.endsWith(subject)
    ? "selected"
    : "";
}

function renderScholarshipSection(
  selectedScholarshipLevel: "33%" | "50%" | "100%",
): string {
  if (currentUser?.role !== "scholar") return "";

  const opt = (val: string, label: string) =>
    `<option value="${val}"${selectedScholarshipLevel === val ? " selected" : ""}>${label}</option>`;

  return `
  <div class="form-group">
    <label for="scholarship-level-select">Scholarship Level</label>
    <select id="scholarship-level-select" required>
      ${opt("33%", "33% Scholarship (PHP 26,800)")}
      ${opt("50%", "50% Scholarship (PHP 20,000)")}
      ${opt("100%", "100% Scholarship (Free)")}
    </select>
  </div>
  `;
}

function renderStudentView(): void {
  const studentRecord = getStudentRecord(currentUser?.name ?? "");
  const selectedYearLevel = studentRecord?.yearLevel ?? 1;
  const selectedSubject =
    studentRecord?.subjectName || classAssignment.subjectName;
  let selectedScholarshipLevel: "33%" | "50%" | "100%";
  if (studentRecord instanceof Scholar) {
    selectedScholarshipLevel = studentRecord.scholarshipLevel;
  } else {
    selectedScholarshipLevel = "50%";
  }

  studentList.innerHTML = `
    <div class="card">
      <h3>Student Profile</h3>
      <form id="student-profile-form">
        <div class="form-group">
          <label for="year-level-select">Year level</label>
          <select id="year-level-select" required>
            <option value="1" ${yearLevelSelected(selectedYearLevel, 1)}>1</option>
            <option value="2" ${yearLevelSelected(selectedYearLevel, 2)}>2</option>
            <option value="3" ${yearLevelSelected(selectedYearLevel, 3)}>3</option>
            <option value="4" ${yearLevelSelected(selectedYearLevel, 4)}>4</option>
          </select>
        </div>

        <div class="form-group">
          <label for="class-select">Class and subject</label>
          <select id="class-select" required>
            ${subjects
              .map(
                (subject) => `
              <option value="${classAssignment.className} - ${subject}" ${subjectSelected(selectedSubject, subject)}>
                ${classAssignment.className} - ${subject}
              </option>
            `,
              )
              .join("")}
          </select>
        </div>

        ${renderScholarshipSection(selectedScholarshipLevel)}

        <button type="submit" class="login-btn">Save</button>
      </form>
    </div>

    <div class="card">
      <h3>Saved Student Information</h3>
      <div id="student-summary"></div>
    </div>
  `;

  personnelList.innerHTML = renderTeachersList();

  bindStudentProfileForm();
  renderStudentSummary(studentRecord);
}

function renderTeacherView(): void {
  const assignedStudents = studentManager.students.filter(
    (s) => s.assignedTeacher === currentTeacher.name,
  );
  const regulars = assignedStudents.filter((s) => s instanceof RegularStudent);
  const scholars = assignedStudents.filter((s) => s instanceof Scholar);

  personnelList.innerHTML = renderTeachersList();

  studentList.innerHTML = `
    <div class="card">
      <h3>Regular Students</h3>
      ${renderStudentCards(regulars, "No regular students assigned.", false)}
    </div>
    <div class="card">
      <h3>Scholars</h3>
      ${renderStudentCards(scholars, "No scholars assigned.", false)}
    </div>
  `;

  let teacherObj: Teacher | null =
    teachersRecords.find((t) => t.name === currentUser?.name) ?? null;
  if (teacherObj === null && currentUser?.name === currentTeacher.name) {
    teacherObj = currentTeacher;
  }

  const teacherListEl = document.getElementById("teacher-list");
  let teacherInfoHtml: string;
  if (teacherObj) {
    teacherInfoHtml = `
      <div class="card">
        <h3>Teacher Information</h3>
        <p><strong>Name:</strong> ${teacherObj.name}</p>
        <p><strong>ID:</strong> ${teacherObj.id}</p>
        <p><strong>Department:</strong> ${teacherObj.department}</p>
        <p><strong>Course Load:</strong> ${teacherObj.courseLoad}</p>
        <p><strong>Primary Subject:</strong> ${teacherObj.primarySubject}</p>
        <p><strong>Salary:</strong> PHP ${teacherObj.computeSalary()}</p>
      </div>
    `;
  } else {
    teacherInfoHtml = `<div class="card"><h3>Teacher Information</h3><p>No profile available for ${currentUser?.name}</p></div>`;
  }

  if (teacherListEl) {
    teacherListEl.innerHTML = teacherInfoHtml;
  } else {
    personnelList.innerHTML = teacherInfoHtml + renderTeachersList();
  }
}

function renderAdministratorView(): void {
  if (!currentAdmin) return;
  const allStudents = studentManager.students;
  const regulars = allStudents.filter((s) => s instanceof RegularStudent);
  const scholars = allStudents.filter((s) => s instanceof Scholar);

  personnelList.innerHTML = `
    <div class="card personnel">
      <h3>Administrator Information</h3>
      <p><strong>Name:</strong> ${currentAdmin.name}</p>
      <p><strong>ID:</strong> ${currentAdmin.id}</p>
      <p><strong>Department:</strong> ${currentAdmin.department}</p>
      <p><strong>Status:</strong> ${currentAdmin.status()}</p>
      <p><strong>Salary:</strong> PHP ${currentAdmin.computeSalary()}</p>
    </div>
    ${renderTeachersList()}
  `;

  studentList.innerHTML = `
    <div class="card">
      <h3>Regular Students</h3>
      ${renderStudentCards(regulars, "No regular students have been saved yet.", true, true)}
    </div>
    <div class="card">
      <h3>Scholars</h3>
      ${renderStudentCards(scholars, "No scholars have been saved yet.", true, true)}
    </div>
  `;

  bindDeleteButtons();
}

function renderStudentSummary(studentRecord: Student | null): void {
  const studentSummary = document.getElementById("student-summary");
  if (!studentSummary) return;
  if (!studentRecord) {
    studentSummary.innerHTML = `<p>No saved student profile yet. Choose your year level and save.</p>`;
    return;
  }

  studentSummary.innerHTML = `
    <p><strong>Name:</strong> ${studentRecord.name}</p>
    <p><strong>Year Level:</strong> ${studentRecord.yearLevel}</p>
    <p><strong>Enrollment Status:</strong> ${studentRecord.isEnrolled ? "Enrolled" : "Not Enrolled"}</p>
    <p><strong>Class:</strong> ${studentRecord.className}</p>
    <p><strong>Subject:</strong> ${studentRecord.subjectName}</p>
    <p><strong>Teacher:</strong> ${studentRecord.assignedTeacher}</p>
    <p><strong>Tuition Fee:</strong> PHP ${studentRecord.computeTuition()}</p>
  `;
}

function renderStudentCards(
  records: Student[],
  emptyMessage: string,
  showTuition: boolean = true,
  allowDelete: boolean = false,
): string {
  if (records.length === 0) return `<p>${emptyMessage}</p>`;

  return records
    .map((studentRecord) => {
      const tuitionHtml = showTuition
        ? `<p><strong>Tuition:</strong> PHP ${studentRecord.computeTuition()}</p>`
        : "";
      const deleteButtonHtml = allowDelete
        ? `<button class="delete-student-btn" data-id="${studentRecord.id}">Drop</button>`
        : "";

      return `
        <div class="card">
          <p><strong>Name:</strong> ${studentRecord.name}</p>
          <p><strong>ID:</strong> ${studentRecord.id}</p>
          <p><strong>Year Level:</strong> ${studentRecord.yearLevel}</p>
          <p><strong>Enrollment Status:</strong> ${studentRecord.isEnrolled ? "Enrolled" : "Not Enrolled"}</p>
          <p><strong>Class:</strong> ${studentRecord.className}</p>
          <p><strong>Subject:</strong> ${studentRecord.subjectName}</p>
          <p><strong>Teacher:</strong> ${studentRecord.assignedTeacher}</p>
          ${tuitionHtml}
          ${deleteButtonHtml}
        </div>
      `;
    })
    .join("");
}

function renderTeachersList(): string {
  if (teachersRecords.length === 0) {
    return `<div class="card"><h3>Teachers</h3><p>No teachers have registered yet.</p></div>`;
  }

  return teachersRecords
    .map(
      (t) => `
        <div class="card">
          <p><strong>Name:</strong> ${t.name}</p>
          <p><strong>ID:</strong> ${t.id}</p>
          <p><strong>Department:</strong> ${t.department}</p>
          <p><strong>Course Load:</strong> ${t.courseLoad}</p>
        </div>
      `,
    )
    .join("");
}

// ── Form binding & save ───────────────────────────────────────────────────────

function bindStudentProfileForm(): void {
  const studentProfileForm = document.getElementById(
    "student-profile-form",
  ) as HTMLFormElement | null;
  if (!studentProfileForm) return;
  studentProfileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveStudentProfile();
    renderDashboard();
  });
}

function saveStudentProfile(): void {
  if (!currentUser) return;
  const yearLevelSelect = document.getElementById(
    "year-level-select",
  ) as HTMLSelectElement | null;
  const classSelect = document.getElementById(
    "class-select",
  ) as HTMLSelectElement | null;
  if (!yearLevelSelect || !classSelect) return;

  const selectedYearLevel = Number(yearLevelSelect.value);
  const classSelectValue = classSelect.value;
  const [pickedClassName, pickedSubject] = classSelectValue
    .split(" - ")
    .map((s) => s.trim());
  const selectedAssignment = {
    className: pickedClassName || classAssignment.className,
    subjectName: pickedSubject || classAssignment.subjectName,
    teacherName: classAssignment.teacherName,
  };

  const studentRecord = getOrCreateStudentRecord(
    currentUser.name,
    selectedYearLevel,
  );

  studentRecord.yearLevel = selectedYearLevel;
  studentRecord.dropCourse(selectedAssignment.subjectName);
  studentRecord.enrollCourse(selectedAssignment.subjectName);
  studentRecord.className = selectedAssignment.className;
  studentRecord.subjectName = selectedAssignment.subjectName;
  studentRecord.assignedTeacher = selectedAssignment.teacherName;

  if (currentUser.role === "scholar" && studentRecord instanceof Scholar) {
    const scholarshipLevelSelect = document.getElementById(
      "scholarship-level-select",
    ) as HTMLSelectElement | null;
    if (scholarshipLevelSelect) {
      const level = scholarshipLevelSelect.value as "33%" | "50%" | "100%";
      studentRecord.changeScholarshipLevel(level);
    }
  }
}

// ── Delete buttons ────────────────────────────────────────────────────────────

function bindDeleteButtons(): void {
  const deleteBtns = Array.from(
    document.querySelectorAll(".delete-student-btn"),
  ) as HTMLButtonElement[];
  deleteBtns.forEach((btn) => {
    btn.removeEventListener("click", handleDeleteClick as any);
    btn.addEventListener("click", handleDeleteClick as any);
  });
}

function handleDeleteClick(event: Event): void {
  const target = event.currentTarget as HTMLButtonElement;
  const id = Number(target.getAttribute("data-id"));
  if (!id || !currentAdmin) return;
  currentAdmin.dropStudent(id);
  renderDashboard();
}

// ── Student lookup helpers ────────────────────────────────────────────────────

function getStudentRecord(studentName: string): Student | null {
  const normalizedName = studentName.toLowerCase();
  return (
    studentManager.students.find(
      (s) => s.name.toLowerCase() === normalizedName,
    ) ?? null
  );
}

function getOrCreateStudentRecord(
  studentName: string,
  yearLevel: number,
): Student {
  const existing = getStudentRecord(studentName);
  if (existing) return existing;
  const studentId = studentManager.students.length + 1;
  if (currentUser?.role === "scholar") {
    const s = new Scholar(studentId, studentName, yearLevel);
    studentManager.addStudent(s);
    return s;
  }
  const newStudent = new RegularStudent(studentId, studentName, yearLevel);
  studentManager.addStudent(newStudent);
  return newStudent;
}

// ── Layout helpers ────────────────────────────────────────────────────────────

function formatRoleName(role: Role): string {
  switch (role) {
    case "regular":
      return "Regular Student";
    case "scholar":
      return "Scholar";
    case "teacher":
      return "Teacher";
    case "administrator":
      return "Administrator";
    default:
      return role;
  }
}

function updateLayoutForRole(role: Role): void {
  const studentColumn = document.getElementById("student-list")
    ?.parentElement as HTMLElement | null;
  const personnelCol = document.getElementById(
    "personnel-column",
  ) as HTMLElement | null;
  const teacherCol = document.getElementById(
    "teacher-column",
  ) as HTMLElement | null;

  if (!studentColumn || !personnelCol || !teacherCol) return;

  if (role === "regular" || role === "scholar") {
    studentColumn.style.display = "block";
    personnelCol.style.display = "block";
    teacherCol.style.display = "none";
    const sh = studentColumn.querySelector("h2") as HTMLHeadingElement | null;
    if (sh) sh.textContent = "Student Profile";
    const ph = personnelCol.querySelector("h2") as HTMLHeadingElement | null;
    if (ph) ph.textContent = "Teachers";
  } else if (role === "teacher") {
    studentColumn.style.display = "block";
    personnelCol.style.display = "none";
    teacherCol.style.display = "block";
    const sh = studentColumn.querySelector("h2") as HTMLHeadingElement | null;
    if (sh) sh.textContent = "Students";
    const th = teacherCol.querySelector("h2") as HTMLHeadingElement | null;
    if (th) th.textContent = "Teacher Profile";
  } else {
    studentColumn.style.display = "block";
    personnelCol.style.display = "block";
    teacherCol.style.display = "none";
    const sh = studentColumn.querySelector("h2") as HTMLHeadingElement | null;
    if (sh) sh.textContent = "Students";
    const ph = personnelCol.querySelector("h2") as HTMLHeadingElement | null;
    if (ph) ph.textContent = "Personnel";
  }
}
