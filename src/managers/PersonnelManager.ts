import { Personnel } from "../classes/Personnel";

export class PersonnelManager {
  private _personnel: Personnel[];

  constructor() {
    this._personnel = [];
  }

  addPersonnel(personnel: Personnel): void {
    this._personnel.push(personnel);
  }

  removePersonnel(personnelId: string): void {
    this._personnel = this._personnel.filter(
      (personnel) => personnel.getId() !== personnelId,
    );
  }

  getPersonnel(): Personnel[] {
    return this._personnel;
  }
}
