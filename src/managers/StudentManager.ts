import { Student } from "../classes/Student";

export class StudentManager {
  private _students: Student[];

  constructor() {
    this._students = [];
  }

  addStudent(student: Student): void {
    this._students.push(student);
  }

  removeStudent(studentId: number): void {
    this._students = this._students.filter(
      (student) => student.id !== studentId,
    );
  }

  get students(): Student[] {
    return this._students;
  }
}
