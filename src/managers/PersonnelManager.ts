import { Personnel } from '../classes/Personnel'

export class PersonnelManager {
    private _personnel: Personnel[]
    constructor() {
        this._personnel = []
    }

    addPersonnel(personnel: Personnel): void {
        this ._personnel.push(personnel)

    }

    removePersonnel(personnelId: string): void {
        const result: Personnel[] = []
        for (const personnel of this._personnel) {
            if (personnel.getId() !== personnelId) {
                result.push(personnel)
            }
        }
        this._personnel = result
    }   
    getPersonnel(): Personnel [] {
        return this._personnel

    }   

    findPersonnel(name: string): Personnel[] {
        const result: Personnel[] = []
        for(const personnel of this ._personnel) {
            if (personnel.getName().toLowerCase().includes(name.toLowerCase()))
                result.push(personnel)
        }
        return result
    }   
    getTotalPersonnel(): number {
        return this._personnel.length
    }
    setPersonnel(personnel: Personnel[]): void {
        this ._personnel = personnel
    }

}