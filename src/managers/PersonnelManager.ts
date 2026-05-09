import { Personnel } from '../classes/Personnel'

export class PersonnelManager {
  private _staff: Personnel[]

  constructor() {
    this._staff = []
  }

  addStaff(staff: Personnel): void {
    this._staff.push(staff)
  }

  removeStaff(id: string): void {
    const result: Personnel[] = []
    for (const s of this._staff) {
      if (s.getId() !== id) {
        result.push(s)
      }
    }
    this._staff = result
  }

  getStaff(): Personnel[] {
    return this._staff
  }

  findStaff(name: string): Personnel[] {
    const result: Personnel[] = []
    for (const staff of this._staff) {
      if (staff.getName().toLowerCase().includes(name.toLowerCase())) {
        result.push(staff)
      }
    }
    return result
  }

  getTotalStaff(): number {
    return this._staff.length
  }

  setStaff(staff: Personnel[]): void {
    this._staff = staff
  }
}