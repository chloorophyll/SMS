import { Personnel } from './Personnel'

export abstract class Staff extends Personnel {
  private _allowance: number

  constructor(id: string, name: string, department: string) {
    super(id, name, department, 35000)
    this._allowance = 5000
  }

  getAllowance(): number {
    return this._allowance
  }

  computeSalary(): number {
    return this.getBaseSalary() + this._allowance
  }

  getStatus(): string {
    return 'Full Time Teacher'
  }

  getInfo(): string {
    return `${this.getName()} | ID: ${this.getId()} | Dept: ${this.getDepartment()} | ${this.getStatus()} | Salary: PHP ${this.computeSalary()}`
  }

  getRole(): string {
    return 'Teacher'
  }
}

