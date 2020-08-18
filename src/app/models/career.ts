import { SpecialtyModel } from 'src/app/models/specialty';
export class CareerModel {
    _id?: string;
    strCarrera: string;
    blnStatus: boolean = true; 
    aJsnEspecialidad?: SpecialtyModel[];
    check:boolean = false;
}