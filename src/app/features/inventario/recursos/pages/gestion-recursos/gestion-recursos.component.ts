import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RecursosService } from '../../services/recursos.service';
import { AllRecursosReponse } from '../../interfaces/recursos.interface';
import { animate, style, transition, trigger } from '@angular/animations';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';
import { MatDialog } from '@angular/material/dialog';
import { EliminarRecursoComponent } from '../eliminar-recurso/eliminar-recurso.component';
import { LayoutService } from '../../../../../core/layout/layout.service';
import { NgClass } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-recursos',
  standalone: true,
  imports: [SpinnerComponent, NgClass, FormsModule, ReactiveFormsModule],
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
  private dialog = inject(MatDialog);
  private layout = inject(LayoutService);
  
  public isMobile = computed(() => this.layout.isMobile());
  public search = signal<string>('');
  public recursos = computed(() => {
    const sq = this.search(); 
    return this.recursosState().recursos.filter((recurso) => recurso.nombre.toLowerCase().includes(sq.toLowerCase()));
    }
  );
  public isLoading = computed(() => this.recursosState().loading);
  
  
  ngOnInit(): void {
    this.getAllRecursos();
  }

  getAllRecursos(){
    this.recursosState.set({loading: true, recursos: []});
    this.recursosService.getAllRecursos().subscribe((res) => {
      this.recursosState.set({loading: false, recursos: res});
    });
  }
  onSearchUpdated(sq: string){
    this.search.set(sq);
  }

  crearRecurso(){
    this.router.navigate(['/inventario/recursos/crear-recurso']);
  }
  editarRecurso(id_dici: string){
    this.router.navigate([`/inventario/recursos/editar-recurso/${id_dici}`]);
  }

  opendModalEliminarRecurso(id_dici: string){
    const dialogRef =  this.dialog.open(EliminarRecursoComponent, {
      width: '600px',
      enterAnimationDuration: 200,
      exitAnimationDuration: 200,
      data: {id_dici},
      position: {top: '300px'}
    });

    dialogRef.afterClosed().subscribe((res) => {
      if(res === 'eliminado') this.getAllRecursos();
    });
  }

  verRecurso(){}
}
