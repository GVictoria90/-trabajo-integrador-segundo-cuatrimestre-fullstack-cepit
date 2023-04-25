import InterfacePersona from "./interfacePersona";

export default abstract class AbstractPersona implements InterfacePersona{
    name: string;
    lastName: string;
    dni: number;
    email: string;

    public constructor(name: string, lastName: string, dni: number, email: string){
        this.name = name;
        this.lastName = lastName;
        this.dni = dni;
        this.email = email;
    }
}