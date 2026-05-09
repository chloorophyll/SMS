import { Student } from './Student'

export class Scholar extends Student {
  private _tuitionFee: number
  private _scholarshipType: string

  constructor(id: string, name: string, yearLevel: number, scholarshipType: string) {
    super(id, name, yearLevel)
    this._tuitionFee = 40000
    this._scholarshipType = scholarshipType
  }

  getScholarshipType(): string {
    return this._scholarshipType

  }

  computeTuition(): number {
    return this._tuitionFee * 0.50
  }

  getStatus(): string {
    return `Scholar - ${this._scholarshipType}`
  }
  
  getInfo(): string {
    return `${this.getName()} | ID: ${this.getId()} | Year Level: ${this.getYearLevel()} | ${this.getStatus()} | Tuition Fee: PHP ${this.computeTuition()}`
  }

  getRole(): string {
    return 'Student'
  }
}
