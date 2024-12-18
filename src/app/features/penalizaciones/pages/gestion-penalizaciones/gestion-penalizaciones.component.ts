import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { PenalizacionesService } from '../../services/penalizaciones.service';
import { IPenalizaciones } from '../../interfaces/penalizaciones.interface';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { DatePipe, NgClass } from '@angular/common';
import { LayoutService } from '../../../../core/layout/layout.service';

@Component({
    selector: 'app-gestion-penalizaciones',
    imports: [SpinnerComponent, DatePipe, NgClass],
    templateUrl: './gestion-penalizaciones.component.html',
    styleUrl: './gestion-penalizaciones.component.css',
    animations: [
        trigger('notLoading', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('300ms ease-out', style({ opacity: 1 }))
            ]),
        ])
    ]
})
export class GestionPenalizacionesComponent implements OnInit {


  private penalizacionesService = inject(PenalizacionesService);
  private router = inject(Router);
  private layout = inject(LayoutService);

  private penalizacionState = signal<{loading: boolean, penalizaciones: IPenalizaciones[]}>({loading: true, penalizaciones: []});
  public penalizaciones = computed(() => this.penalizacionState().penalizaciones);
  public loading = computed(() => this.penalizacionState().loading);
  public isMobile = computed(() => this.layout.isMobile());
  public sq = signal<string>('');

  ngOnInit(): void {
    this.setPenalizaciones();
  }

  onSearchUpdated(sq: string){
    this.sq.set(sq);
  }
  crearPenalizacion(){
    this.router.navigate(['penalizaciones/crear-penalizacion']);
  }

  setPenalizaciones(){
    this.penalizacionState.set({loading: true, penalizaciones: []});
    this.penalizacionesService.getPenalizaciones().subscribe({
      next: (data) => {
        this.penalizacionState.set({loading: false, penalizaciones: data});
      },
      error: (error) => {
        console.log(error); 
      }
    });
  };
}
