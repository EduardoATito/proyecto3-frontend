import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { LayoutService } from '../../../../../core/layout/layout.service';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { CategoriasService } from '../../../../inventario/categorias/services/categorias.service';
import { delay } from 'rxjs';
import { CategoriasResponse } from '../../../../inventario/categorias/interfaces/categorias.interface';

@Component({
    selector: 'app-seleccionar-categoria',
    imports: [],
    templateUrl: './seleccionar-categoria.component.html',
    styleUrl: './seleccionar-categoria.component.css',
    animations: [
        trigger('fadeInDiagonal', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('300ms ease-out', style({ opacity: 1 }))
            ]),
        ])
    ]
})
export class SeleccionarCategoriaComponent implements OnInit {

  private layoutService = inject(LayoutService);
  private router = inject(Router);
  private categoriasService = inject(CategoriasService);

  public isMobile = computed(() => this.layoutService.isMobile());

  public categoriasState = signal<{ loading: boolean, categorias: CategoriasResponse[] }>({loading: true, categorias: []});

  ngOnInit(): void {
    this.getAllCategorias();
  }

  getAllCategorias(){
    this.categoriasService.getAllCategorias().subscribe((res) => {
      this.categoriasState.set({loading: false, categorias: res});
    });
  }

  onPrestar(id_categoria: number){
    this.router.navigate([`/prestamos/regular/${id_categoria}`]);
  }

  onDevolver(id_categoria: number){
    this.router.navigate([`/prestamos/devolver/${id_categoria}`]);
  }
}
