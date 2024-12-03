import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CrearPrestamoRegular, FinPrestamoDto, PrestamoRegularData } from '../../../regular/interfaces/prestamo-regular.interface';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';
import { PrestamoRegularService } from '../../../regular/services/prestamo-regular.service';
import { DatePipe } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-seguimiento-prestamos',
    imports: [SpinnerComponent, DatePipe],
    templateUrl: './seguimiento-prestamos.component.html',
    styleUrl: './seguimiento-prestamos.component.css',
    animations: [
        trigger('notLoading', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('300ms ease-out', style({ opacity: 1 }))
            ]),
        ])
    ]
})
export class SeguimientoPrestamosComponent implements OnInit{
  
  private prestamosRegularService = inject(PrestamoRegularService);
  private prestamosRegularState = signal<{loading: boolean, prestamos: PrestamoRegularData[]}>({loading: true, prestamos: []});
  private toastrService = inject(ToastrService);
  public prestamosRegular = computed(() => this.prestamosRegularState().prestamos);
  public loading = computed(() => this.prestamosRegularState().loading);


  ngOnInit(): void {
    this.setAllPrestamosregular();
  }
  onDevolver(id_prestamos:number){

    const finPrestamo : FinPrestamoDto = {
      id_prestamo: id_prestamos,
      fecha_fin: new Date()
    }

    console.log(finPrestamo);

    this.prestamosRegularService.devolverPrestamoRegular(finPrestamo).subscribe({
      next: (r) => {
        console.log(r);
        this.setAllPrestamosregular();
      },
      error: (err) => {
        this.toastrService.error(err.error.message, 'Error', {positionClass: 'toast-bottom-center'});
        console.log(err);
      }
    });
  }

  setAllPrestamosregular(){
    this.prestamosRegularService.getAllPrestamosRetugularActivos().subscribe((prestamos) => {
      this.prestamosRegularState.set({loading: false, prestamos})
    });
  }

}
