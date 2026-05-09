export abstract class UniversityEntity {
    private _id: string
    private _name: string

    constructor(id: string, name: string) {
        this._id = id
        this._name = name
    }

    getId(): string {
        return this._id
    }

    getName(): string {
        return this._name
    }

    setName(name: string): void {
        this._name = name
    }

    abstract getInfo(): string
    abstract getRole(): string
}