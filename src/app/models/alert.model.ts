import { FileModel } from './file.model';
import { ReasonsModel } from './reasons-crde.model';


export class AlertModel {
    _id?: string;
    idUser: string;
    idEstatus: string;
    strMatricula: string;
    strNombreAlumno: string;
    idAsignatura: string;
    idCarrera?: string;
    idEspecialidad: string;
    strGrupo: string;
    idConductaRiesgo: string;
    chrTurno: string;
    idModalidad: string;
    strDescripcion: string;
    arrCrde?: any = [{
        ReasonsModel
    }];
    aJsnEvidencias?: any = [{
        FileModel
    }];
    aJsnSeguimiento?: [{
        SeguimientoModel
    }];
    blnAvtivo?: boolean = true;
}
