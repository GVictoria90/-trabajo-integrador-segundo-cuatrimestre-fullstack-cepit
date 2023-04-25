export class Contrato{
    startingDate: string;
    expiringDate: string;

    public  constructor(startingDate: string, expiringDate: string){
        this.startingDate = new Date(startingDate).toLocaleString();
        this.expiringDate = new Date(expiringDate).toLocaleString();
    }
}