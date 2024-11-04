import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CrearPrestamoRegular, FinPrestamoDto, PrestamoRegularData } from '../../../regular/interfaces/prestamo-regular.interface';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';
import { PrestamoRegularService } from '../../../regular/services/prestamo-regular.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-seguimiento-prestamos',
  standalone: true,
  imports: [SpinnerComponent, DatePipe],
  templateUrl: './seguimiento-prestamos.component.html',
  styleUrl: './seguimiento-prestamos.component.css'
})
export class SeguimientoPrestamosComponent implements OnInit{
  
  private prestamosRegularService = inject(PrestamoRegularService);
  private prestamosRegularState = signal<{loading: boolean, prestamos: PrestamoRegularData[]}>({loading: true, prestamos: []});
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

    this.prestamosRegularService.devolverPrestamoRegular(finPrestamo).subscribe(() => {
      this.setAllPrestamosregular()
    });
  }

  setAllPrestamosregular(){
    this.prestamosRegularService.getAllPrestamosRetugularActivos().subscribe((prestamos) => {
      this.prestamosRegularState.set({loading: false, prestamos})
    });
  }

}
