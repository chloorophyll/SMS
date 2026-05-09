import { Student } from "./Student";

export class Scholar extends Student {
  private _tuitionFee: number;
  private _scholarshipStatus: string;
  private _maximumCoursesPerSemester: number;

  constructor(id: string, name: string, yearLevel: number) {
    super(id, name, yearLevel);
    this._tuitionFee = 20000;
    this._scholarshipStatus = "Active";
    this._maximumCoursesPerSemester = 4;
  }

  enrollCourse(course: string): boolean {
    if (this.getEnrolledCourses().length >= this._maximumCoursesPerSemester) {
      return false;
    }

    return super.enrollCourse(course);
  }

  getScholarshipStatus(): string {
    return this._scholarshipStatus;
  }

  computeTuition(): number {
    return this._tuitionFee;
  }

  getStatus(): string {
    return `Scholar - ${this._scholarshipStatus}`;
  }

  getInfo(): string {
    return `${this.getName()} | ${this.getYearLevel()} | ${this.getStatus()} | PHP ${this.computeTuition()}`;
  }

  getRole(): string {
    return "Student";
  }
}
