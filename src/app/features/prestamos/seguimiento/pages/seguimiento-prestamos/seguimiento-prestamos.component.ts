import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CrearPrestamoRegular, FinPrestamoDto, PrestamoRegularData } from '../../../regular/interfaces/prestamo-regular.interface';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';
import { PrestamoRegularService } from '../../../regular/services/prestamo-regular.service';
import { DatePipe, NgClass } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from '../../../../../core/layout/layout.service';

@Component({
    selector: 'app-seguimiento-prestamos',
    imports: [SpinnerComponent, DatePipe, NgClass],
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
  private layoutService = inject(LayoutService);


  public prestamosRegular = computed(() => {
    const sq = this.sq().toLowerCase();
    return this.prestamosRegularState().prestamos.filter((prestamoRegularActivos) => {
      return Object.values(prestamoRegularActivos).some((value) => {
        return String(value).toLowerCase().includes(sq);
      });
  })});

  public loading = computed(() => this.prestamosRegularState().loading);

  public isMobile = computed(() => this.layoutService.isMobile());
  public sq = signal<string>('');
  public currentPage = signal<number>(1);
  public totalPages : number[] =[];


  ngOnInit(): void {
    this.setAllPrestamosregular();
  }

  onSearchUpdated(sq: string){
    this.sq.set(sq);
  }
  onDevolver(id_prestamos:number){

    const finPrestamo : FinPrestamoDto = {
      id_prestamo: id_prestamos,
      fecha_fin: new Date()
    }

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

  onPageChange(page: number){
    this.sq.set('');
    this.currentPage.set(page);
    this.setAllPrestamosregular();
  }


  setAllPrestamosregular(){
    this.prestamosRegularService.getAllPrestamosRetugularActivos(this.currentPage()).subscribe((prestamos) => {
      this.totalPages = Array.from({length: prestamos.totalPages}, (_, i) => i + 1);
      this.prestamosRegularState.set({loading: false, prestamos: prestamos.data});
    });
  }

}
