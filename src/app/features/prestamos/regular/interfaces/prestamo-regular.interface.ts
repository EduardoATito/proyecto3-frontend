export interface CrearPrestamoRegular {
    hora_inicio : string;
    rut: string;
    id_usuario : number;
    id_dici : string;
}

export interface PrestamoRegularData {
    id_prestamo: number;
    hora_inicio: Date;
    hora_fin:    null;
    rut:         string;
    id_usuario:  number;
    id_dici:     string;
}


export interface FinPrestamoDto {
    id_prestamo: number;
    fecha_fin: Date;
}