import { UniversityEntity } from "./UniversityEntity"

export abstract class Student extends UniversityEntity {
    private _yearLevel: number
    private _isEnrolled: boolean


    constructor(id: string, name: string, yearLevel: number) {
        super(id, name)
        this._yearLevel = yearLevel
        this._isEnrolled = false
    }
    getYearLevel(): number {
        return this._yearLevel
        }

    setYearLevel(yearLevel: number): void {
        this._yearLevel = yearLevel
        }
        getIsEnrolled(): boolean {
            return this._isEnrolled
        }   

        enroll(): void {
            this._isEnrolled = true

        }

        drop(): void {
            this._isEnrolled = false

        }       

        abstract computeTuition(): number
        abstract getStatus(): string
    }

