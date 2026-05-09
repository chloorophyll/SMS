import { UniversityEntity } from "./UniversityEntity";

export abstract class Student extends UniversityEntity {
  private _yearLevel: number;
  private _isEnrolled: boolean;
  private _enrolledCourses: string[];
  private _className: string;
  private _subjectName: string;
  private _assignedTeacherName: string;

  constructor(id: number, name: string, yearLevel: number) {
    super(id, name);
    this._yearLevel = yearLevel;
    this._isEnrolled = false;
    this._enrolledCourses = [];

    this._className = "";
    this._subjectName = "";
    this._assignedTeacherName = "";
  }

  get yearLevel(): number {
    return this._yearLevel;
  }

  set yearLevel(value: number) {
    this._yearLevel = value;
  }

  get isEnrolled(): boolean {
    return this._isEnrolled;
  }

  enroll(): void {
    this._isEnrolled = true;
  }

  enrollCourse(course: string): boolean {
    if (this._enrolledCourses.includes(course)) {
      return false;
    }

    this._enrolledCourses.push(course);
    this._isEnrolled = true;
    return true;
  }

  dropCourse(course: string): boolean {
    const courseIndex = this._enrolledCourses.indexOf(course);

    if (courseIndex === -1) {
      return false;
    }

    this._enrolledCourses.splice(courseIndex, 1);

    if (this._enrolledCourses.length === 0) {
      this._isEnrolled = false;
    }

    return true;
  }

  get className(): string {
    return this._className;
  }

  set className(value: string) {
    this._className = value;
  }

  get subjectName(): string {
    return this._subjectName;
  }

  set subjectName(value: string) {
    this._subjectName = value;
  }

  get assignedTeacher(): string {
    return this._assignedTeacherName;
  }

  set assignedTeacher(value: string) {
    this._assignedTeacherName = value;
  }

  abstract computeTuition(): number;
  abstract status(): string;
}
