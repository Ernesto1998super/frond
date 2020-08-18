export class AlertStatusModel {
    _id?: string;
    strNombre: string;
    strDescripcion: string;
    dteCreatedAt: Date;
    dteUpdatedAt: Date;
    blnActivo: boolean = true;
}
