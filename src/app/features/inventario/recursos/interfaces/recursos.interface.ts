import { CategoriasResponse } from "../../categorias/interfaces/categorias.interface";

export interface AllRecursosReponse {
  marca: string;
  descripcion: string;
  fecha_ingreso: Date;
  modelo: string;
  nombre: string;
  estado_recurso: boolean;
  id_categoria: number;
  id_dici: string;
  id_uta: string;
  ubicacion: string;
  categoria: CategoriasResponse;
}