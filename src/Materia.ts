export class Materia{
    public materia: string;
    public nota: number;

    public constructor(materia: string, nota: number){
        this.materia = materia;
        this.nota = nota;
    }

    public getMaterias(): Materia{
        return this;
    }

    

    public toJson(){
        return {
            materia: this.materia,
            nota: this.nota
        }
    }
}