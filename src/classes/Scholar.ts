import { Student } from "./Student";

export class Scholar extends Student {
  private _baseTuitionFee: number = 40000;
  private _scholarshipStatus: string;
  private _scholarshipLevel: "33%" | "50%" | "100%" = "50%";

  constructor(id: string, name: string, yearLevel: number) {
    super(id, name, yearLevel);
    this._scholarshipStatus = "Active";
  }

  getScholarshipLevel(): "33%" | "50%" | "100%" {
    return this._scholarshipLevel;
  }

  setScholarshipLevel(level: "33%" | "50%" | "100%"): void {
    this._scholarshipLevel = level;
  }

  computeTuition(): number {
    if (this._scholarshipLevel === "33%") {
      return Math.round(this._baseTuitionFee * 0.67);
    } else if (this._scholarshipLevel === "50%") {
      return Math.round(this._baseTuitionFee * 0.5);
    } else {
      return 0;
    }
  }

  getStatus(): string {
    return `Scholar - ${this._scholarshipStatus}`;
  }
}
