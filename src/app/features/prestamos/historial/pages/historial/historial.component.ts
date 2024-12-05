import { Component, computed, inject, signal } from '@angular/core';
import { PrestamoRegularService } from '../../../regular/services/prestamo-regular.service';
import { PrestamoRegularData } from '../../../regular/interfaces/prestamo-regular.interface';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';
import { DatePipe, JsonPipe, NgClass } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { LayoutService } from '../../../../../core/layout/layout.service';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

@Component({
    selector: 'app-historial',
    imports: [SpinnerComponent, DatePipe, MatDatepickerModule, MatFormFieldModule, ReactiveFormsModule, NgClass],
    templateUrl: './historial.component.html',
    styleUrl: './historial.component.css',
    animations: [
        trigger('notLoading', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('300ms ease-out', style({ opacity: 1 }))
            ]),
        ])
    ],
})
export class HistorialComponent {

  private prestamosRegularService = inject(PrestamoRegularService);
  private prestamosRegularState = signal<{loading: boolean, prestamos: PrestamoRegularData[]}>({loading: true, prestamos: []});
  public prestamosRegular = computed(() => {
    const sq = this.search(); 
    return this.prestamosRegularState().prestamos.filter((prestamo) => {
      return Object.values(prestamo).some((value) => {
        // Asegúrate de manejar solo valores que puedan ser convertidos a string
        return String(value).toLowerCase().includes(sq);
      });
    });
  });
  public loading = computed(() => this.prestamosRegularState().loading);
  private layout = inject(LayoutService);
  public currentPage = signal<number>(1);
  public totalPages : number[] = [];


  public isMobile = computed(() => this.layout.isMobile());
  public  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  public search = signal<string>('');
  public rangeEfect = computed(() => {
  
    return this.range.value;
  });

  onSearchUpdated(sq:string){
    this.search.set(sq);
  }

  ngOnInit(): void {
    this.range.valueChanges.subscribe((value) => {{ 
      console.log(value.start?.toJSON());
      console.log(value.end?.toJSON());
    }});
    this.setAllPrestamosregular();
  }
  onPageChange(page: number){
    this.search.set('');
    if(page < 1 || page > this.totalPages.length) return;
    this.currentPage.set(page);
    this.setAllPrestamosregular();
  }

  setAllPrestamosregular(){
    this.prestamosRegularService.getAllPrestamosRegular(this.currentPage()).subscribe((prestamos) => {
      this.totalPages = Array.from({length: prestamos.totalPages}, (_, i) => i + 1);
      this.prestamosRegularState.set({loading: false, prestamos: prestamos.data});
    });
  }
}
