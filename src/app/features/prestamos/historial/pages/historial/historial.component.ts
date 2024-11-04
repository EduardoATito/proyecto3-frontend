import { Component, computed, inject, signal } from '@angular/core';
import { PrestamoRegularService } from '../../../regular/services/prestamo-regular.service';
import { PrestamoRegularData } from '../../../regular/interfaces/prestamo-regular.interface';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [SpinnerComponent, DatePipe],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent {

  private prestamosRegularService = inject(PrestamoRegularService);
  private prestamosRegularState = signal<{loading: boolean, prestamos: PrestamoRegularData[]}>({loading: true, prestamos: []});
  public prestamosRegular = computed(() => this.prestamosRegularState().prestamos);
  public loading = computed(() => this.prestamosRegularState().loading);


  ngOnInit(): void {
    this.setAllPrestamosregular();
  }


  setAllPrestamosregular(){
    this.prestamosRegularService.getAllPrestamosRegular().subscribe((prestamos) => {
      this.prestamosRegularState.set({loading: false, prestamos})
    });
  }
}
