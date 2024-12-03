import { Component, computed, inject, signal } from '@angular/core';
import { PrestamoRegularService } from '../../../regular/services/prestamo-regular.service';
import { PrestamoRegularData } from '../../../regular/interfaces/prestamo-regular.interface';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';
import { DatePipe, NgClass } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { LayoutService } from '../../../../../core/layout/layout.service';

@Component({
  selector: 'app-historial',
  standalone: true,
  providers: [provideNativeDateAdapter(),
  ],
  imports: [SpinnerComponent, DatePipe, MatDatepickerModule, MatFormFieldModule, ReactiveFormsModule, NgClass],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css',
  animations: [
    trigger('notLoading', [
      transition(':enter', [
        style({ opacity: 0}),
        animate('300ms ease-out', style({ opacity: 1})) 
      ]),
    ])
  ]
  
})
export class HistorialComponent {

  private prestamosRegularService = inject(PrestamoRegularService);
  private prestamosRegularState = signal<{loading: boolean, prestamos: PrestamoRegularData[]}>({loading: true, prestamos: []});
  public prestamosRegular = computed(() => this.prestamosRegularState().prestamos);
  public loading = computed(() => this.prestamosRegularState().loading);
  private layout = inject(LayoutService);


  public isMobile = computed(() => this.layout.isMobile());
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  onSearchUpdated(sq:string){}
  ngOnInit(): void {
    this.setAllPrestamosregular();
  }


  setAllPrestamosregular(){
    this.prestamosRegularService.getAllPrestamosRegular().subscribe((prestamos) => {
      this.prestamosRegularState.set({loading: false, prestamos})
    });
  }
}
