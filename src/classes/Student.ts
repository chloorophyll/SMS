import { UniversityEntity } from "./UniversityEntity";

export abstract class Student extends UniversityEntity {
  private _yearLevel: number;
  private _isEnrolled: boolean;
  private _enrolledCourses: string[];
  private _className: string;
  private _subjectName: string;
  private _assignedTeacherName: string;

  constructor(id: string, name: string, yearLevel: number) {
    super(id, name);
    this._yearLevel = yearLevel;
    this._isEnrolled = false;
    this._enrolledCourses = [];
    
    this._className = "";
    this._subjectName = "";
    this._assignedTeacherName = "";
  }

  getYearLevel(): number {
    return this._yearLevel;
  }

  setYearLevel(yearLevel: number): void {
    this._yearLevel = yearLevel;
  }

  isEnrolled(): boolean {
    return this._isEnrolled;
  }

  getIsEnrolled(): boolean {
    return this._isEnrolled;
  }

  enroll(): void {
    this._isEnrolled = true;
  }

  drop(): void {
    this._isEnrolled = false;
    this._enrolledCourses = [];
  }

  getEnrolledCourses(): string[] {
    return this._enrolledCourses;
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

  getBalanceDue(): number {
    return 0;
  }

  setBalanceDue(_: number): void {
    // no-op
  }

  getAcademicStanding(): string {
    return "";
  }

  getClassName(): string {
    return this._className;
  }

  setClassName(className: string): void {
    this._className = className;
  }

  getSubjectName(): string {
    return this._subjectName;
  }

  setSubjectName(subjectName: string): void {
    this._subjectName = subjectName;
  }

  getAssignedTeacherName(): string {
    return this._assignedTeacherName;
  }

  setAssignedTeacherName(assignedTeacherName: string): void {
    this._assignedTeacherName = assignedTeacherName;
  }

  abstract computeTuition(): number;
  abstract getStatus(): string;
}
