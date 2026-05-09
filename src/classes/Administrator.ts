import { Personnel } from './Personnel';

export abstract class Staff extends Personnel {
  private _position: string

  constructor(id: string, name: string, department: string, position: string) {
    super(id, name, department, 30000)
    this._position = position
  }

  getPosition(): string {
    return this._position
  }

  computeSalary(): number {
    return this.getBaseSalary()
  }

  getStatus(): string {
    return `Administrator - ${this._position}`
  }

  getInfo(): string {
    return `${this.getName()} | ID: ${this.getId()} | Dept: ${this.getDepartment()} | ${this.getStatus()} | Salary: PHP ${this.computeSalary()}`
  }

  getRole(): string {
    return 'Administrator'
  }
}