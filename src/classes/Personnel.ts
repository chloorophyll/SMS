import { UniversityEntity } from "./UniversityEntity";

export abstract class Personnel extends UniversityEntity {
  private _department: string;
  private _baseSalary: number;

  constructor(
    id: string,
    name: string,
    department: string,
    baseSalary: number,
  ) {
    super(id, name);
    this._department = department;
    this._baseSalary = baseSalary;
  }

  getDepartment(): string {
    return this._department;
  }

  setDepartment(department: string): void {
    this._department = department;
  }

  getBaseSalary(): number {
    return this._baseSalary;
  }

  abstract computeSalary(): number;
  abstract getStatus(): string;
}
