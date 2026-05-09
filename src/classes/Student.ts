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

  yearLevel(): number {
    return this._yearLevel;
  }

  changeYearLevel(yearLevel: number): void {
    this._yearLevel = yearLevel;
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

  className(): string {
    return this._className;
  }

  assignClass(className: string): void {
    this._className = className;
  }

  subjectName(): string {
    return this._subjectName;
  }

  assignSubject(subjectName: string): void {
    this._subjectName = subjectName;
  }

  assignedTeacher(): string {
    return this._assignedTeacherName;
  }

  assignTeacher(assignedTeacherName: string): void {
    this._assignedTeacherName = assignedTeacherName;
  }

  abstract computeTuition(): number;
  abstract status(): string;
}
