export abstract class UniversityEntity {
  private _id: number;
  private _name: string;

  constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
  }

  id(): number {
    return this._id;
  }

  name(): string {
    return this._name;
  }

  rename(name: string): void {
    this._name = name;
  }
}
