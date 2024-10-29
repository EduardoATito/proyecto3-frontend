import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RecursosService } from '../../../../inventario/recursos/services/recursos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AllRecursosReponse } from '../../../../inventario/recursos/interfaces/recursos.interface';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-seleccionar-recurso',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './seleccionar-recurso.component.html',
  styleUrl: './seleccionar-recurso.component.css'
})
export class SeleccionarRecursoComponent implements OnInit {
  
  private recursosService = inject(RecursosService);
  private activateRoute = inject(ActivatedRoute);
  private router = inject(Router);

  private recursosState = signal<{loading: boolean, recursos: AllRecursosReponse[]}>({loading: true, recursos: []});
  public recursos = computed(() => this.recursosState().recursos);
  public loading = computed(() => this.recursosState().loading);

  ngOnInit(): void {
    this.setRecursosByCategoria();
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
