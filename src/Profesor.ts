import { Contrato } from './Contrato'
import { Materia } from './Materia'
import { Persona } from './Persona'

export class Profesor extends Persona{
    private materia: string;
    private contrato: Contrato
    public constructor(name: string, lastName: string, dni: number, email: string, materia: string, contrato: Contrato){
        super(name, lastName, dni, email)
        this.materia = materia;
        this.contrato = contrato;
    }

}

