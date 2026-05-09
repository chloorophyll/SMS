import { Student } from './Student'
export abstract class RegularStudent extends Student {

    private _tuitionFee: number

    constructor(id: string, name: string, yearLevel: number) {
        super(id, name, yearLevel)
        this ._tuitionFee = 38000

    }

    computeTuition(): number {
        return this._tuitionFee

    }
    getInfo(): string {
        return `ID: ${this.getId()}, Name: ${this.getName()}, Year Level: ${this.getYearLevel()}, Tuition Fee: ${this.computeTuition()}`

    }
    
    getRole(): string {
        return 'Student'

    }
}

