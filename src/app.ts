import { Gestor, getPeople } from "./Gestor";
const student = getPeople();

const gestor = new Gestor(student);

// gestor.setAlumno();
// gestor.setProfesor();

// gestor.getAllAlumnos();
// gestor.getPromedioAlumnos();
// gestor.getMateriasAlumno('patton');
// gestor.getPromedioAlumno('chill');
// gestor.getAlumno('chill')
// console.table(student)
// gestor.getProfesor('hendrix');
// gestor.getProfesores();
// gestor.getAlumnosPorProfesor('gomez');
gestor.getProfesoresPorAlumno('chill');








