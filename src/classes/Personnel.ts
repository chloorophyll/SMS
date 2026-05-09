import { UniversityEntity } from "./UniversityEntity";

export abstract class Personnel extends UniversityEntity {
  private _department: string;
  private _baseSalary: number;

  constructor(
    id: number,
    name: string,
    department: string,
    baseSalary: number,
  ) {
    super(id, name);
    this._department = department;
    this._baseSalary = baseSalary;
  }

  department(): string {
    return this._department;
  }

  baseSalary(): number {
    return this._baseSalary;
  }

  abstract computeSalary(): number;
  abstract status(): string;
}
