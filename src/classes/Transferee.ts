import { Student } from './Student'

export class Transferee extends Student {
  private _tuitionFee: number
  private _previousSchool: string

  constructor(id: string, name: string, yearLevel: number, previousSchool: string) {
    super(id, name, yearLevel)
    this ._tuitionFee = 30000
    this ._previousSchool = previousSchool
  }

  getPreviousSchool(): string {
    return this._previousSchool
  }

  computeTuition(): number {
    return this ._tuitionFee + 5000

  }

  getStatus(): string {
    return `Transferee - From ${this._previousSchool}`

  }

  getInfo(): string {
    return `${this.getName()} | ID: ${this.getId()} | Year Level: ${this.getYearLevel()} | ${this.getStatus()} | Tuition Fee: PHP ${this.computeTuition()}`
  }

  getRole() : string {
    return 'Student'
  }
}

