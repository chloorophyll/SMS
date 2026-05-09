import { Personnel } from "./Personnel";

export class Administrator extends Personnel {
  private _position: string;

  constructor(id: string, name: string, department: string, position: string) {
    super(id, name, department, 30000);
    this._position = position;
  }

  getPosition(): string {
    return this._position;
  }

  setPosition(position: string): void {
    this._position = position;
  }

  computeSalary(): number {
    return this.getBaseSalary() + 10000;
  }

  getStatus(): string {
    return `Administrator - ${this._position}`;
  }

  getInfo(): string {
    return `${this.getName()} | ${this.getDepartment()} | ${this.getStatus()} | PHP ${this.computeSalary()}`;
  }

  getRole(): string {
    return "Administrator";
  }
}
