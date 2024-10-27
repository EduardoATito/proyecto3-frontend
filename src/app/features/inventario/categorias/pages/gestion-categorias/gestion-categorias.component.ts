import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';
import { CategoriasResponse } from '../../interfaces/categorias.interface';
import { DatePipe } from '@angular/common';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-categorias',
  standalone: true,
  imports: [DatePipe, SpinnerComponent],
  templateUrl: './gestion-categorias.component.html',
  styleUrl: './gestion-categorias.component.css',
  animations: [
    trigger('notLoading', [
      transition(':enter', [
        style({ opacity: 0}),
        animate('300ms ease-out', style({ opacity: 1})) 
      ]),
    ])
  ]
})
export class GestionCategoriasComponent implements OnInit {

  private categoriasService = inject(CategoriasService);

  private categoriasState = signal<{ loading: boolean, categorias: CategoriasResponse[] }>({loading: true, categorias: []});
  private router = inject(Router);
  public categorias = computed(() => this.categoriasState().categorias);
  public loading = computed(() => this.categoriasState().loading);

  ngOnInit(): void {
    this.getAllCategorias();
  }

  editarRecurso(){}

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
}
