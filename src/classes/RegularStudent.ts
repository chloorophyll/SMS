import { Student } from "./Student";
export class RegularStudent extends Student {
  private _tuitionFee: number;

  constructor(id: number, name: string, yearLevel: number) {
    super(id, name, yearLevel);
    this._tuitionFee = 40000;
  }

  computeTuition(): number {
    return this._tuitionFee;
  }

  status(): string {
    return `Regular Student`;
  }
}
