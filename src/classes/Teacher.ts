import { Personnel } from "./Personnel";

const BASE_TEACHER_SALARY = 35000;
const COURSE_BONUS = 5000;

const SUBJECT_MULTIPLIERS: Record<string, number> = {
  "Data Structures": 1.1,
  "Database Systems": 1.05,
  "Web Development": 1.0,
};

const DEFAULT_SUBJECT_MULTIPLIER = 1.0;

export class Teacher extends Personnel {
  private _courseLoad: number;
  private _primarySubject: string | null;

  constructor(id: string, name: string, department: string) {
    super(id, name, department, BASE_TEACHER_SALARY);
    this._courseLoad = 0;
    this._primarySubject = null;
  }

  getCourseLoad(): number {
    return this._courseLoad;
  }

  addCourse(): void {
    this._courseLoad += 1;
  }

  removeCourse(): void {
    if (this._courseLoad > 0) {
      this._courseLoad -= 1;
    }
  }

  setPrimarySubject(subjectName: string): void {
    this._primarySubject = subjectName;
  }

  getPrimarySubject(): string | null {
    return this._primarySubject;
  }

  computeSalary(): number {
    let multiplier = DEFAULT_SUBJECT_MULTIPLIER;

    if (this._primarySubject) {
      if (SUBJECT_MULTIPLIERS[this._primarySubject]) {
        multiplier = SUBJECT_MULTIPLIERS[this._primarySubject];
      } else {
        multiplier = DEFAULT_SUBJECT_MULTIPLIER;
      }
    } else {
      multiplier = DEFAULT_SUBJECT_MULTIPLIER;
    }

    const raw = this.getBaseSalary() + this._courseLoad * COURSE_BONUS;
    return Math.round(raw * multiplier);
  }

  getStatus(): string {
    return `Teacher - Teaching ${this._courseLoad} course(s)`;
  }

  getInfo(): string {
    return `${this.getName()} | ${this.getDepartment()} | ${this.getStatus()} | PHP ${this.computeSalary()}`;
  }

  getRole(): string {
    return "Teacher";
  }
}
