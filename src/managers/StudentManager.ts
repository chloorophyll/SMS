import { Student } from '../classes/Student'

export class StudentManager {
    private _students: Student[]

    constructor() {
        this ._students = []

    }

    addStudent(student: Student): void {
        this._students.push(student)

    }

    removeStudent(studentId: string): void {
        const result: Student[] = []
        for (const student of this._students) {
            if (student.getId() !== studentId) {
                result.push(student)
            }
        }
        this._students = result
    }

    getStudents(): Student[] {
        return this._students
    }

    findStudent(name: string): Student[] {
        const result: Student[] = []
        for(const student of this ._students) {
            if (student.getName().toLowerCase().includes(name.toLowerCase()))
                result.push(student)
        }
        return result
    }   

    getTotalStudents(): number {
        return this._students.length

    }
    setStudents(students: Student[]): void {
        this ._students = students

    }
}