import { Personnel } from "./Personnel";
import { StudentManager } from "../managers/StudentManager";

export class Administrator extends Personnel {
  private _position: string;
  private _studentManager: StudentManager;

  constructor(
    id: string,
    name: string,
    department: string,
    position: string,
    studentManager: StudentManager,
  ) {
    super(id, name, department, 30000);
    this._position = position;
    this._studentManager = studentManager;
  }

  dropStudent(studentId: string): void {
    this._studentManager.removeStudent(studentId);
  }

  computeSalary(): number {
    return this.getBaseSalary() + 10000;
  }

  getStatus(): string {
    return `Administrator - ${this._position}`;
  }

  getInfo(): string {
    return `${this.getName()} | ${this.getDepartment()} | ${this.getStatus()} | PHP ${this.computeSalary()}`;
  }

  getRole(): string {
    return "Administrator";
  }
}
