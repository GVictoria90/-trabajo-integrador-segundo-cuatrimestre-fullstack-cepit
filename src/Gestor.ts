import * as fs from "fs";
import { Persona } from "./Persona";
import { Alumno } from "./Alumno";
import { Materia } from "./Materia";
import { Profesor } from "./Profesor";
import { Contrato } from "./Contrato";

const readLineSync = require("readline-sync");
const alumnosJSON = "alumnos.json";
const profesoresJSON = "profesores.json"
const students = JSON.parse(fs.readFileSync(alumnosJSON, 'utf-8'));
const teachers = JSON.parse(fs.readFileSync(profesoresJSON, 'utf-8'));

export class Gestor{
    private perosona: Persona[] = [];
    public constructor(perosona: Persona[]){
        this.perosona = perosona;
    }
    //* crea un nuevo alumno
    setAlumno(){
        const name = readLineSync.question("Nombre del alumno: ").toLowerCase();
        const lastName = readLineSync.question("Apellido del Alumno: ").toLowerCase();
        const dni = readLineSync.question("DNI: ");
        const email = readLineSync.question("Email: ")
        const matricula = readLineSync.question("matricula: ");
        const fechaMatriculacion = readLineSync.question("Fecha de Matriculacion(yyyy/mm/dd): ").toLocaleString();
        const estudiante = new Alumno(name, lastName, dni, email, matricula, fechaMatriculacion,);

        for (let i = 0; i < 3; i++) {
            const materiaNombre = readLineSync.question(`Ingrese el nombre de la materia ${i + 1}: `).toLowerCase();
            const notaMateria = readLineSync.question(`Nota de la materia ${i + 1}: `);
            const materia = new Materia(materiaNombre, notaMateria);
            estudiante.setMateria(materia);
        }
        students.push(estudiante);
        fs.writeFileSync(alumnosJSON, JSON.stringify(students, null, 2), 'utf-8');
    }
    //* crea un nuevo profesor
    setProfesor(){
        const name = readLineSync.question("Nombre del profesor: ").toLowerCase();
        const lastName = readLineSync.question("Apellido del Profesor: ").toLowerCase();
        const dni = readLineSync.question("DNI: ");
        const email = readLineSync.question("Email: ")
        const materia = readLineSync.question("Materia: ")
        const startingDate = readLineSync.question("Fecha de inicio(yyyy/mm/dd): ");
        const expiringDate = readLineSync.question("Fecha de expiración(yyyy/mm/dd: ");
        const contrato = new Contrato(startingDate, expiringDate)
        const profesor = new Profesor(name, lastName, dni, email, materia, contrato);
        teachers.push(profesor);
        fs.writeFileSync(profesoresJSON, JSON.stringify(teachers, null, 2), 'utf-8');
    }
    //! *****
        //* metodos alumno
    //! ****

    //*busca las materias de un alumno
    getMateriasAlumno(lastName: string): any[] {
        //todo busca un alumno por el apellido
        const alumnoEncontrado = students.find((alumno: any) => alumno.lastName === lastName);
        //todo si encuentra el alumno retorna el array materia con las materias que cursa el alumno
        if (alumnoEncontrado) {           
            return alumnoEncontrado.materia;
        //todo si no encuntrsa al alumno devuleve un array vacio
        } else {
            console.log("No se encontró ningún alumno con ese apellido.");
            return [];
        }
    }

    //* buscar promedios por alumno
    getPromedioAlumno(lastName: string): number {
                //todo busca un alumno por el apellido
        const alumnoEncontrado = students.find((alumno: any) => alumno.lastName === lastName);
        //todo si encuentra el alumno retorna el promedio de las materias que cursa el alumno
        if (alumnoEncontrado) {
            let sumaNota = 0;
            //todo itera sobre cada materia sumando las notas
            for(let i = 0; i < alumnoEncontrado.materia.length; i++){
                sumaNota += parseFloat(alumnoEncontrado.materia[i].nota);
            }
            //todo divide las notas entre el total de materias
            const promedio = sumaNota / alumnoEncontrado.materia.length
            // console.log(`promedio: ${promedio}`);
            return promedio;
        }else{
            //todo si no encuntra al alumno devuelve 0
            console.log("No se encontró ningún alumno con ese apellido.");
            return 0;
        }
    }

    //* obtiene un alumno cons sus notas y promedio
    getAlumno(lastName:string): any[]{
        //todo busca el alumno opr el apellido
        const alumnoEncontrado = students.find((alumno: any) => alumno.lastName === lastName);
        if(alumnoEncontrado){
            const name = alumnoEncontrado.name;
            const lastName = alumnoEncontrado.lastName;
            const dni = alumnoEncontrado.dni;
            const email = alumnoEncontrado.email;
            const matricula = alumnoEncontrado.matricula;
            const fechaMatriculacion = alumnoEncontrado.fechaMatriculacion.toLocaleString();
            console.log(`nombre: ${name}\napellido: ${lastName}\n$nro de documento: ${dni}\n$email: ${email}\nmatricula: ${matricula}\nfecha de matriculación: ${fechaMatriculacion}`);
            //todo Obtiene las materias y las notas del alumno buscado
            const materias = this.getMateriasAlumno(alumnoEncontrado.lastName);
            //todo imprime en consola cada materia y nota del del alumno buscado
            for(let i = 0; i < materias.length; i++){
                console.log(`Materia ${i + 1}: ${materias[i].materia} Nota: ${materias[i].nota}`)
                }
            //todo obtiene el promedio del alumno buscado
            const promedio = this.getPromedioAlumno(alumnoEncontrado.lastName)
            console.log(`promedio ${promedio}` );
            return [name, lastName, materias, promedio];
            
        }else{
            //todo si no encuntrsa al alumno devuleve un array vacio
            console.log("No se encontró ningún alumno con ese apellido.");
            return [];
        }
    }

    //* busca todos los alumnos con sus notas promedios
    getPromedioAlumnos() {
        //todo recorre todos los alunmos guardados en la variable students, que contine el archivo JSON donde se almacenan los alumnos
        for (let i = 0; i < students.length; i++) {
            const alumno = students[i];
            console.log(`Alumno: ${alumno.name} ${alumno.lastName}`);
            //todo  obtiene las materias de los alumnos
            const materias = this.getMateriasAlumno(alumno.lastName);
            //todo recorre las materias e imprime en consola cada materia con su nota
            for(let i = 0; i < materias.length; i++){
                console.log(`Materia ${i + 1}: ${materias[i].materia} Nota: ${materias[i].nota}`)
                }
            //todo obtiene el promedio de los alumnos
            let sumaNotas = 0;
            for (let j = 0; j < materias.length; j++) {
                sumaNotas += parseFloat(materias[j].nota);
            }
            const promedio = sumaNotas / materias.length;
            console.log(`Promedio: ${promedio}\n`);
        }
    }


    //* listado de profesores por alumno
    public getProfesoresPorAlumno(lastName: string): void {
        //todo busca al alumno por el apellido 
        const alumnoEncontrado = students.find((alumno: any) => alumno.lastName === lastName);
        if (!alumnoEncontrado) {
            console.log("No se encontró ningún alumno con ese nombre");
            return;
        }
        //todo crea un array vacío para almacenar los nombres de los profesores del alumno
        const profesoresDelAlumno: string[] = [];
        //todo recorre cada materia del alumno y busca el profesor enseña esa materia'
        alumnoEncontrado.materia.forEach((materia: any ) => {
            const profesorDeLaMateria = teachers.find(
            (profesor: any) => profesor.materia === materia.materia
            );
            //todo si se encuentra un profesor que enseña la materia, agrega su nombre completo al array 'profesoresDelAlumno'
            if (profesorDeLaMateria) {
                const nombreCompletoProfesor = `${profesorDeLaMateria.name} ${profesorDeLaMateria.lastName}`;
            if (!profesoresDelAlumno.includes(nombreCompletoProfesor)) {
                profesoresDelAlumno.push(nombreCompletoProfesor);
            }
            }
        });
        //todo Si el array 'profesoresDelAlumno' está vacío, muestra un mensaje y termina la función
        if (profesoresDelAlumno.length === 0) {
            console.log("El alumno no tiene profesores asignados");
            return;
        }
        //todo imprime en consola el listado de profesores del alumno
        // console.log(profesoresDelAlumno);        
        console.log(
            `Los profesores del alumno con nombre ${lastName} son: ${profesoresDelAlumno.join(
            ", "
            )}`
        );
    }
    //! *****
        //* metodos profesor
    //! ****

    //* busca un profesor por su apellido
    getProfesor(profesor: string) {
        const profesorEncontrado = teachers.find((profesor: any) => profesor === profesor);
        console.log(profesorEncontrado);
        return profesorEncontrado
    }

    //* muestra todos los prfesores
    getProfesores() {
        console.log(teachers);
        return teachers
        
    }
    
    //* listado de alumnos por profesor
    getAlumnosPorProfesor(lastName: string): any[] {
        const alumnosPorProfesor: any = [];
        //todo Busca el profesor por su apellido
        const profesorEncontrado = teachers.find((profesor: any) => profesor.lastName === lastName);
        if (profesorEncontrado) {
        //todo Recorre los alumnos y busca aquellos que tengan asignada la materia del profesor
            for (let i = 0; i < students.length; i++) {
                const alumno = students[i];
                const materiaDelAlumno = alumno.materia.find((materia: any) => materia.materia === profesorEncontrado.materia);
                if (materiaDelAlumno) {
                    alumnosPorProfesor.push( `${ alumno.name} ${alumno.lastName}`);
                }
            }
            // console.log(alumnosPorProfesor);
            console.log(`el profesor ${lastName} tiene como alumnos a: ${alumnosPorProfesor.join(",")}`);
            return alumnosPorProfesor;
        } else {
            console.log("No se encontró ningún profesor con ese apellido.");
            
            return [];
        }
    }

}
export function getPeople() {
    try {
        const data = JSON.parse(fs.readFileSync(alumnosJSON, 'utf8'));
        const school = data.map((data: any) => new Alumno(data.name, data.lastName, data.dni, data.email, data.matricula, data.fechaMatriculacion));
        return school;
    } catch (error) {
        console.log(error);
        return [];
    }
}

