import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';
import { PrestamoEspecialService } from '../../services/prestamo-especial.service';
import { DatePipe, NgClass } from '@angular/common';
import { LayoutService } from '../../../../../core/layout/layout.service';
import { IPresmtamoEspecial } from '../../interfaces/prestamo-especial.interface';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-gestion-prestamos-especial',
  imports: [SpinnerComponent, NgClass, DatePipe],
  templateUrl: './gestion-prestamos-especial.component.html',
  styleUrl: './gestion-prestamos-especial.component.css',
  animations: [
    trigger('notLoading', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('300ms ease-out', style({ opacity: 1 }))
        ]),
    ])
  ]
})
export class GestionPrestamosEspecialComponent implements OnInit {

  private prestamosEspecialesService = inject(PrestamoEspecialService);
  private layoutService = inject(LayoutService);
  private router = inject(Router);

  public isMobile = computed(() => this.layoutService.isMobile());

  private prestamosEspecialState = signal<{loading: boolean, prestamosEspeciales: IPresmtamoEspecial[] }>({loading: false, prestamosEspeciales: []});
  public isLoading = computed(() => this.prestamosEspecialState().loading);
  public prestamosEspeciales = computed(() => {
    return this.prestamosEspecialState().prestamosEspeciales.filter((prestamo) => {
      return prestamo.id_prestamo.toString().toLowerCase().includes(this.sq().toLowerCase());
    });
  }); 

  public sq = signal<string>('');
  public currentPage = signal<number>(1);
  public totalPages : number[]= []

  ngOnInit(): void {
    this.setPrestamosEspeiales();
  }

  setPrestamosEspeiales(){
    this.prestamosEspecialesService.getAllPrestamosEspeciales(this.currentPage()).subscribe((response) => {
      this.totalPages = Array.from({length: response.totalPages}, (_, i) => i + 1);
      this.prestamosEspecialState.set({loading: false, prestamosEspeciales: response.data});
    });
  }
  crearPrestamoEspecial(){
    this.router.navigate(['/prestamos-especiales/crear-prestamos-especial']);
  }

  onSearchUpdated(sq: string){
    this.sq.set(sq);
  }


  verPrestamoEspecial(id_prestamo: number){
    this.router.navigate(['/prestamos-especiales/ver-prestamo-especial', id_prestamo]);
  }

  editarPrestamoEspecial(id_prestamo: number){
    this.router.navigate(['/prestamos-especiales/editar-prestamo-especial', id_prestamo]);
  }


  onPageChange(page: number){
    this.currentPage.set(page);
    if(page < 1){
      return;
    }
    if(page > this.totalPages.length){
      return;
    }
    this.setPrestamosEspeiales();
  }
}
