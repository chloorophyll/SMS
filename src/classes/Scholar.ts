import { Student } from "./Student";

export class Scholar extends Student {
  private _tuitionFee: number;
  private _scholarshipStatus: string;
  private _maximumCoursesPerSemester: number;

  constructor(id: string, name: string, yearLevel: number) {
    super(id, name, yearLevel);
    this._tuitionFee = 40000;
    this._scholarshipStatus = "Active";
    this._maximumCoursesPerSemester = 4;
  }

  enrollCourse(course: string): boolean {
    if (this.getGradePointAverage() < 3) {
      this.revokeScholarshipDueToLowGradePointAverage();
      return false;
    }

    if (this.getEnrolledCourses().length >= this._maximumCoursesPerSemester) {
      return false;
    }

    return super.enrollCourse(course);
  }

  getScholarshipStatus(): string {
    return this._scholarshipStatus;
  }

  revokeScholarshipDueToLowGradePointAverage(): void {
    if (this.getGradePointAverage() < 3) {
      this._scholarshipStatus = "Revoked";
    }
  }

  computeTuition(): number {
    return this._scholarshipStatus === "Active"
      ? this._tuitionFee * 0.5
      : this._tuitionFee;
  }

  getStatus(): string {
    return `Scholar - ${this._scholarshipStatus}`;
  }

  getInfo(): string {
    return `${this.getName()} | ${this.getYearLevel()} | GPA ${this.getGradePointAverage().toFixed(2)} | ${this.getStatus()} | PHP ${this.computeTuition()}`;
  }

  getRole(): string {
    return "Student";
  }
}
