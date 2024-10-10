import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RecursosService } from '../../services/recursos.service';
import { AllRecursosReponse } from '../../interfaces/recursos.interface';
import { animate, style, transition, trigger } from '@angular/animations';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-gestion-recursos',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './gestion-recursos.component.html',
  styleUrl: './gestion-recursos.component.css',
  animations: [
    trigger('notLoading', [
      transition(':enter', [
        style({ opacity: 0}),
        animate('300ms ease-out', style({ opacity: 1})) 
      ]),
    ])
  ]
})
export class GestionRecursosComponent implements OnInit {

  private router = inject(Router);
  private recursosService = inject(RecursosService);
  private recursosState = signal<{loading: boolean, recursos: AllRecursosReponse[]}>({loading: true, recursos: []});
  public recursos = computed(() => this.recursosState().recursos);
  public isLoading = computed(() => this.recursosState().loading);
  


  ngOnInit(): void {
    this.getAllRecursos();
  }

  getAllRecursos(){
    this.recursosService.getAllRecursos().subscribe((res) => {
      console.log(res);
      this.recursosState.set({loading: false, recursos: res});
    });
  }

  crearRecurso(){
    this.router.navigate(['/inventario/recursos/crear-recurso']);
  }
  editarRecurso(id_uta: string){
    this.router.navigate([`/inventario/recursos/editar-recurso/${id_uta}`]);
  }

  eliminarRecurso(){}
  verRecurso(){}
}
