import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';
import { CategoriasResponse } from '../../interfaces/categorias.interface';
import { DatePipe, NgClass } from '@angular/common';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EliminarCategoriaComponent } from '../eliminar-categoria/eliminar-categoria.component';
import { LayoutService } from '../../../../../core/layout/layout.service';


@Component({
    selector: 'app-gestion-categorias',
    imports: [DatePipe, SpinnerComponent, NgClass],
    templateUrl: './gestion-categorias.component.html',
    styleUrl: './gestion-categorias.component.css',
    animations: [
        trigger('notLoading', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('300ms ease-out', style({ opacity: 1 }))
            ]),
        ])
    ]
})
export class GestionCategoriasComponent implements OnInit {

  private categoriasService = inject(CategoriasService);

  private categoriasState = signal<{ loading: boolean, categorias: CategoriasResponse[] }>({loading: true, categorias: []});
  private router = inject(Router);
  private layout = inject(LayoutService);
  public categorias = computed(() => {
    return this.categoriasState().categorias.filter((categoria) => {
      return categoria.nombre_categoria.toLowerCase().includes(this.sq().toLowerCase());
    });
  });
  public loading = computed(() => this.categoriasState().loading);

  public isMobile = computed(() => this.layout.isMobile());

  public sq = signal<string>('');

  public eliminarCategoriaDialog = inject(MatDialog);

  ngOnInit(): void {
    this.getAllCategorias();
  }

  onSearchUpdated(sq: string){
    this.sq.set(sq);
  }
  getAllCategorias(){
    this.categoriasService.getAllCategorias().subscribe((res) => {
      console.log(res);
      this.categoriasState.set({loading: false, categorias: res});
    });
  }

  crearCategoria(){
    this.router.navigate(['/inventario/categorias/crear-categoria']);
  }

  editarCategoria(id_categoria: number){
    this.router.navigate([`/inventario/categorias/editar-categoria/${id_categoria}`]);
  }

  dialogEliminarCategoria(id_categoria: number){
    this.eliminarCategoriaDialog.open(EliminarCategoriaComponent, {
      width: '600px',
      enterAnimationDuration: 200,
      exitAnimationDuration: 200,
      data: {id_categoria},
      position: {top: '300px'}
    });
  }
}
