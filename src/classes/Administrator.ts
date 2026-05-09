import { Personnel } from "./Personnel";
import { StudentManager } from "../managers/StudentManager";

export class Administrator extends Personnel {
  private _position: string;
  private _studentManager: StudentManager;

  constructor(
    id: number,
    name: string,
    department: string,
    position: string,
    studentManager: StudentManager,
  ) {
    super(id, name, department, 30000);
    this._position = position;
    this._studentManager = studentManager;
  }

  dropStudent(studentId: number): void {
    this._studentManager.removeStudent(studentId);
  }

  computeSalary(): number {
    return this.baseSalary() + 10000;
  }

  status(): string {
    return `Administrator - ${this._position}`;
  }
}
