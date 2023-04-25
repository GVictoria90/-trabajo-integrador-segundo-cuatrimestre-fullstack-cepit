import AbstractPersona from "./AbstractPersona";
export class Persona extends AbstractPersona{
    public constructor(name: string, lastName: string, dni: number, email: string){
        super(name, lastName, dni, email);
    }

    public getLastName(): string {
        return this.lastName;
    }
    
}