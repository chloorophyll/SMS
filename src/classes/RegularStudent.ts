import { Student } from './Student'
export abstract class RegularStudent extends Student {
    private _tuitionFee: number

    constructor(id: string, name: string, yearLevel: number) {
        super(id, name, yearLevel)
        this._tuitionFee = 40000
    }

    computeTuition(): number {
        return this._tuitionFee
    }

    getStatus(): string {
        return 'Regular Student'

    }

    getInfo(): string {
        return `${this.getName()} | ID: ${this.getId()} | Year Level: ${this.getYearLevel()} | ${this.getStatus()} | Tuition Fee: PHP ${this.computeTuition()}`

    }

    getRole(): string {
        return 'Student'

    }
}

