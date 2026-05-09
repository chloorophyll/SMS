import { Student } from "../classes/Student";

export class StudentManager {
  private _students: Student[];

  constructor() {
    this._students = [];
  }

  addStudent(student: Student): void {
    this._students.push(student);
  }

  removeStudent(studentId: string): void {
    this._students = this._students.filter(
      (student) => student.getId() !== studentId,
    );
  }

  getStudents(): Student[] {
    return this._students;
  }

  findStudent(name: string): Student[] {
    const normalizedName = name.toLowerCase();
    return this._students.filter((student) =>
      student.getName().toLowerCase().includes(normalizedName),
    );
  }

  getTotalStudents(): number {
    return this._students.length;
  }
}
