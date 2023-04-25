
import * as fs from 'fs';
import { Persona } from "./Persona";
import { Materia } from "./Materia";

const alumnosJSON = "alumnos.json";
const students = JSON.parse(fs.readFileSync(alumnosJSON, 'utf-8'));


export class Alumno extends Persona{
    public matricula: string;
    private fechaMatriculacion: Date;
    public materia: Materia[];

    public constructor(name: string, lastName: string, dni: number, email: string, matricula: string, fechaMatriculacion: Date){
        super(name, lastName, dni, email);
        this.matricula = matricula;
        this.fechaMatriculacion = new Date(fechaMatriculacion);
        this.materia = [];
    }
    public setMateria(materia: Materia){
        this.materia.push(materia);
    }
    public getMateria(): Materia[] {
        console.log(this.materia)
        return this.materia;
    }

    public getLastName(): string {
        return super.getLastName();
    }
}