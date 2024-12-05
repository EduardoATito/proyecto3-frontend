import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RecursosService } from '../../../../inventario/recursos/services/recursos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AllRecursosReponse } from '../../../../inventario/recursos/interfaces/recursos.interface';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';
import { NgClass } from '@angular/common';
import { LayoutService } from '../../../../../core/layout/layout.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-seleccionar-recurso',
  imports: [SpinnerComponent, NgClass],
  templateUrl: './seleccionar-recurso.component.html',
  styleUrl: './seleccionar-recurso.component.css',
  animations: [
    trigger('notLoading', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('300ms ease-out', style({ opacity: 1 }))
        ]),
    ])
  ]
})
export class SeleccionarRecursoComponent implements OnInit {
  
  private recursosService = inject(RecursosService);
  private activateRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private layout = inject(LayoutService);

  private recursosState = signal<{loading: boolean, recursos: AllRecursosReponse[]}>({loading: true, recursos: []});

  public currentPage = signal<number>(1);
  public sq = signal<string>('');
  public recursos = computed(() => {
    const sq = this.sq();
    return this.recursosState().recursos.filter((recurso) => recurso.id_dici.toLowerCase().includes(sq.toLowerCase()));
  });
  public loading = computed(() => this.recursosState().loading);
  public isMobile = computed(() => this.layout.isMobile());

  public totalPages : number[] = [];

  ngOnInit(): void {
    this.setRecursosByCategoria();
  }
  
  onSearchUpdated(search: string){
    this.sq.set(search);
  }
  onPageChange(page: number){
    this.currentPage.set(page);
  }
  setRecursosByCategoria(){

    const id_categoria = +this.activateRoute.snapshot.params['id_categoria'];

    this.recursosService.getRecursosByCategoria(id_categoria).subscribe({
      next: (response) => {
        this.recursosState.set({loading: false, recursos: response});
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  onPrestar(id_dici : string){
    const route = this.router.url;
    this.router.navigate([`${route}/${id_dici}`]);
  }
}
