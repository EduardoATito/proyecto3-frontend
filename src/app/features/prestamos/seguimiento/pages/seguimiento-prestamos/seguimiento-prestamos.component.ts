import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CrearPrestamoRegular } from '../../../regular/interfaces/prestamo-regular.interface';
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
  private prestamosRegularState = signal<{loading: boolean, prestamos: CrearPrestamoRegular[]}>({loading: true, prestamos: []});
  public prestamosRegular = computed(() => this.prestamosRegularState().prestamos);
  public loading = computed(() => this.prestamosRegularState().loading);


  ngOnInit(): void {
    this.setAllPrestamosregular();
  }
  onDevolver(id_dici:string){

  }

  setAllPrestamosregular(){
    this.prestamosRegularService.getAllPrestamosRegular().subscribe((prestamos) => {
      this.prestamosRegularState.set({loading: false, prestamos})
    });
  }

}
