import "./style.css";
import { RegularStudent } from "./classes/RegularStudent";
import { Teacher } from "./classes/Teacher";
import { StudentManager } from "./managers/StudentManager";

type Role = "student" | "teacher" | "administrator";

interface User {
  name: string;
  role: Role;
}

interface ClassAssignment {
  className: string;
  subjectName: string;
  teacherName: string;
}

const currentTeacher = new Teacher("T-001", "Maria Santos", "Computer Science");
currentTeacher.addCourse();

const subjects = [
  "Data Structures",
  "Database Systems",
  "Web Development",
];

const classAssignment: ClassAssignment = {
  className: "BSSE 2A",
  subjectName: subjects[0],
  teacherName: currentTeacher.getName(),
};

currentTeacher.setPrimarySubject(classAssignment.subjectName);

const studentManager = new StudentManager();
let currentUser: User | null = null;
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

// Autofill teacher name when role is selected
roleDropdown.addEventListener("change", () => {
  if (roleDropdown.value === "teacher") {
    nameInput.value = currentTeacher.getName();
  } else {
    if (nameInput.value === currentTeacher.getName()) {
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

  // If teacher logs in with the known teacher name, register them as personnel
  if (role === "teacher" && name === currentTeacher.getName()) {
    const exists = teachersRecords.some((t) => t.getId() === currentTeacher.getId());
    if (!exists) teachersRecords.push(currentTeacher);
  }

  nameInput.value = "";
  roleDropdown.value = "";
  showDashboard();
});

logoutBtn.addEventListener("click", () => {
  currentUser = null;
  hideDashboard();
});

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

function renderDashboard(): void {
  if (!currentUser) return;
  clearDashboard();
  if (currentUser.role === "student") return renderStudentView();
  if (currentUser.role === "teacher") return renderTeacherView();
  renderAdministratorView();
}

function clearDashboard(): void {
  studentList.innerHTML = "";
  personnelList.innerHTML = "";
}

function renderStudentView(): void {
  const studentRecord = getStudentRecord(currentUser?.name ?? "");
  const selectedYearLevel = studentRecord?.getYearLevel() ?? 1;
  const selectedSubject = studentRecord?.getSubjectName() || classAssignment.subjectName;

  studentList.innerHTML = `
    <div class="card">
      <h3>Student Profile</h3>
      <form id="student-profile-form">
        <div class="form-group">
          <label for="year-level-select">Year level</label>
          <select id="year-level-select" required>
            <option value="1" ${selectedYearLevel === 1 ? "selected" : ""}>1</option>
            <option value="2" ${selectedYearLevel === 2 ? "selected" : ""}>2</option>
            <option value="3" ${selectedYearLevel === 3 ? "selected" : ""}>3</option>
            <option value="4" ${selectedYearLevel === 4 ? "selected" : ""}>4</option>
          </select>
        </div>

        <div class="form-group">
          <label for="class-select">Class and subject</label>
          <select id="class-select" required>
            ${subjects
              .map(
                (subject) => `
              <option value="${classAssignment.className} - ${subject}" ${selectedSubject === subject ? "selected" : ""}>
                ${classAssignment.className} - ${subject}
              </option>
            `,
              )
              .join("")}
          </select>
        </div>

        <button type="submit" class="login-btn">Save</button>
      </form>
    </div>

    <div class="card">
      <h3>Saved Student Information</h3>
      <div id="student-summary"></div>
    </div>
  `;

  // Show registered teachers in the personnel column for students
  personnelList.innerHTML = renderTeachersList();
  const personnelHeader = document.querySelector<HTMLHeadingElement>('#personnel-column h2');
  if (personnelHeader) personnelHeader.textContent = 'Personnel (Teachers)';

  bindStudentProfileForm();
  renderStudentSummary(studentRecord);
}

function renderTeacherView(): void {
  const assignedStudents = getStudentsForCurrentTeacher();
  studentList.innerHTML = `
    <div class="card">
      <h3>Students in My Class</h3>
      ${renderStudentCards(assignedStudents, "No students have been saved for this class yet.", true)}
    </div>
  `;

  personnelList.innerHTML = `
    <div class="card">
      <h3>Teacher Information</h3>
      <p><strong>Name:</strong> ${currentTeacher.getName()}</p>
      <p><strong>Department:</strong> ${currentTeacher.getDepartment()}</p>
      <p><strong>Course Load:</strong> ${currentTeacher.getCourseLoad()}</p>
      <p><strong>Class:</strong> ${classAssignment.className}</p>
      <p><strong>Subject:</strong> ${classAssignment.subjectName}</p>
      <p><strong>Salary:</strong> PHP ${currentTeacher.computeSalary()}</p>
    </div>
  `;
  // Show list of registered teachers in the personnel column and teacher info in teacher column
  personnelList.innerHTML = renderTeachersList();
  const personnelHeader = document.querySelector<HTMLHeadingElement>('#personnel-column h2');
  if (personnelHeader) personnelHeader.textContent = 'Personnel (Teachers)';

  const teacherListEl = document.getElementById('teacher-list');
  if (teacherListEl) {
    teacherListEl.innerHTML = `
      <div class="card">
        <h3>Teacher Information</h3>
        <p><strong>Name:</strong> ${currentTeacher.getName()}</p>
        <p><strong>Department:</strong> ${currentTeacher.getDepartment()}</p>
        <p><strong>Course Load:</strong> ${currentTeacher.getCourseLoad()}</p>
        <p><strong>Primary Subject:</strong> ${currentTeacher.getPrimarySubject()}</p>
        <p><strong>Salary:</strong> PHP ${currentTeacher.computeSalary()}</p>
      </div>
    `;
  }
}

function renderAdministratorView(): void {
  personnelList.innerHTML = `
    <div class="card">
      <h3>Student List</h3>
      ${renderStudentCards(studentManager.getStudents() as RegularStudent[], "No students have been saved yet.", true, true)}
    </div>
  `;

  // Update personnel column header for administrator view
  const personnelHeader = document.querySelector<HTMLHeadingElement>('#personnel-column h2');
  if (personnelHeader) personnelHeader.textContent = 'Personnel';

  // Also show teachers in the personnel column for admin
  personnelList.innerHTML += renderTeachersList();

  bindDeleteButtons();
}

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
  const [pickedClassName, pickedSubject] = classSelectValue.split(" - ").map((s) => s.trim());
  const selectedAssignment = {
    className: pickedClassName || classAssignment.className,
    subjectName: pickedSubject || classAssignment.subjectName,
    teacherName: classAssignment.teacherName,
  };
  const studentRecord = getOrCreateStudentRecord(
    currentUser.name,
    selectedYearLevel,
  );

  studentRecord.setYearLevel(selectedYearLevel);
  studentRecord.enroll();
  studentRecord.dropCourse(selectedAssignment.subjectName);
  studentRecord.enrollCourse(selectedAssignment.subjectName);
  studentRecord.setClassName(selectedAssignment.className);
  studentRecord.setSubjectName(selectedAssignment.subjectName);
  studentRecord.setAssignedTeacherName(selectedAssignment.teacherName);
  studentRecord.setBalanceDue(0);
}

function renderStudentSummary(studentRecord: RegularStudent | null): void {
  const studentSummary = document.getElementById("student-summary");
  if (!studentSummary) return;
  if (!studentRecord) {
    studentSummary.innerHTML = `<p>No saved student profile yet. Choose your year level and save.</p>`;
    return;
  }

  studentSummary.innerHTML = `
    <p><strong>Name:</strong> ${studentRecord.getName()}</p>
    <p><strong>Year Level:</strong> ${studentRecord.getYearLevel()}</p>
    <p><strong>Class:</strong> ${studentRecord.getClassName()}</p>
    <p><strong>Subject:</strong> ${studentRecord.getSubjectName()}</p>
    <p><strong>Teacher:</strong> ${studentRecord.getAssignedTeacherName()}</p>
    <p><strong>Academic Standing:</strong> ${studentRecord.getAcademicStanding()}</p>
    <p><strong>Balance Due:</strong> PHP ${studentRecord.getBalanceDue()}</p>
  `;
}

function renderStudentCards(
  records: RegularStudent[],
  emptyMessage: string,
  showTuition: boolean = true,
  allowDelete: boolean = false,
): string {
  if (records.length === 0) return `<p>${emptyMessage}</p>`;

  return records
    .map(
      (studentRecord) => `
        <div class="card">
          <p><strong>Name:</strong> ${studentRecord.getName()}</p>
          <p><strong>ID:</strong> ${studentRecord.getId()}</p>
          <p><strong>Year Level:</strong> ${studentRecord.getYearLevel()}</p>
          <p><strong>Class:</strong> ${studentRecord.getClassName()}</p>
          <p><strong>Subject:</strong> ${studentRecord.getSubjectName()}</p>
          <p><strong>Teacher:</strong> ${studentRecord.getAssignedTeacherName()}</p>
          <p><strong>Academic Standing:</strong> ${studentRecord.getAcademicStanding()}</p>
          ${showTuition ? `<p><strong>Tuition:</strong> PHP ${studentRecord.computeTuition()}</p>` : ""}
          ${allowDelete ? `<button class="delete-student-btn" data-id="${studentRecord.getId()}">Drop</button>` : ""}
        </div>
      `,
    )
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
          <p><strong>Name:</strong> ${t.getName()}</p>
          <p><strong>ID:</strong> ${t.getId()}</p>
          <p><strong>Department:</strong> ${t.getDepartment()}</p>
          <p><strong>Course Load:</strong> ${t.getCourseLoad()}</p>
        </div>
      `,
    )
    .join("");
}

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
  const id = target.getAttribute("data-id");
  if (!id) return;
  studentManager.removeStudent(id);
  renderDashboard();
}

function getStudentRecord(studentName: string): RegularStudent | null {
  const normalizedName = studentName.toLowerCase();
  return (
    (studentManager.getStudents() as RegularStudent[]).find(
      (studentRecord) =>
        studentRecord.getName().toLowerCase() === normalizedName,
    ) ?? null
  );
}

function getOrCreateStudentRecord(
  studentName: string,
  yearLevel: number,
): RegularStudent {
  const existing = getStudentRecord(studentName);
  if (existing) return existing;
  const studentId = `S-${String((studentManager.getStudents() as RegularStudent[]).length + 1).padStart(3, "0")}`;
  const newStudent = new RegularStudent(studentId, studentName, yearLevel);
  studentManager.addStudent(newStudent);
  return newStudent;
}

function getStudentsForCurrentTeacher(): RegularStudent[] {
  return (studentManager.getStudents() as RegularStudent[]).filter(
    (studentRecord) =>
      studentRecord.getAssignedTeacherName() === currentTeacher.getName(),
  );
}

function formatRoleName(role: Role): string {
  return role.charAt(0).toUpperCase() + role.slice(1);
}
