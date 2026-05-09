import { Student } from "./Student";
export class RegularStudent extends Student {
  private _tuitionFee: number;
  private _maximumCoursesPerSemester: number;

  constructor(id: string, name: string, yearLevel: number) {
    super(id, name, yearLevel);
    this._tuitionFee = 40000;
    this._maximumCoursesPerSemester = 5;
  }

  enrollCourse(course: string): boolean {
    if (this.getEnrolledCourses().length >= this._maximumCoursesPerSemester) {
      return false;
    }

    return super.enrollCourse(course);
  }

  computeTuition(): number {
    return this._tuitionFee;
  }

  getStatus(): string {
    return `Regular Student - ${this.checkAcademicStanding()}`;
  }

  getInfo(): string {
    return `${this.getName()} | ID: ${this.getId()} | Year Level: ${this.getYearLevel()} | Class: ${this.getClassName() || "Not assigned"} | Subject: ${this.getSubjectName() || "Not assigned"} | Teacher: ${this.getAssignedTeacherName() || "Not assigned"} | GPA: ${this.getGradePointAverage().toFixed(2)} | ${this.getStatus()} | Tuition Fee: PHP ${this.computeTuition()}`;
  }

  getRole(): string {
    return "Student";
  }
}
