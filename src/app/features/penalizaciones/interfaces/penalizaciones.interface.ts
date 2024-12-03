
export interface IPenalizaciones{
  grado          :string
  id_sanciones   :number           
  comentario     :string        
  estado_sancion :boolean
  id_usuario     :number
  fecha_inicio   :Date       
  fecha_final    :Date       
  rut_estudiante :string
}         

export interface ICrearPenalizacion{
    grado: string;
    comentario: string;
    id_usuario: number;
    rut_estudiante: string;
    estado_sancion: boolean;
}

export enum grados_sancion{
  LEVE = 'LEVE',
  GRAVE = 'GRAVE'
}