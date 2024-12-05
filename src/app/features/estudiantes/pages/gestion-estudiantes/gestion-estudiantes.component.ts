import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { Estudiante } from '../../interfaces/estudiante.interface';
import { EstudiantesService } from '../../services/estudiantes.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { LayoutService } from '../../../../core/layout/layout.service';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QRCodeComponent } from 'angularx-qrcode';
import { SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-gestion-estudiantes',
    imports: [SpinnerComponent, NgClass, QRCodeComponent],
    templateUrl: './gestion-estudiantes.component.html',
    styleUrl: './gestion-estudiantes.component.css',
    animations: [
        trigger('notLoading', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('300ms ease-out', style({ opacity: 1 }))
            ]),
        ])
    ]
})
export class GestionEstudiantesComponent implements OnInit{

  private estudiantesState = signal<{loading: boolean, estudiantes: Estudiante[]}>({loading: true, estudiantes: []});
  private estudiantesService = inject(EstudiantesService)
  private layout = inject(LayoutService);
  private router = inject(Router);
  private toaster = inject(ToastrService);

  public selectedFile: File | null = null;

  public search = signal<string>('');
  public isMobile = computed(() => this.layout.isMobile());


  public myAngularxQrCode: string = "";
  public qrCodeDownloadLink: SafeUrl = "";

  public currentPage = signal<number>(1);
  public totalPages :number[]= []

  public estudiantes = computed(() => {
    const sq = this.search().toLowerCase();
    
    return this.estudiantesState().estudiantes.filter((estudiante) => {
      // Verifica cada propiedad del objeto
      return Object.values(estudiante).some((value) => {
        // Asegúrate de manejar solo valores que puedan ser convertidos a string
        return String(value).toLowerCase().includes(sq);
      });
    });
  });

  public loading = computed(() => this.estudiantesState().loading);

  ngOnInit(): void {
    this.setEstudiantes();
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

  downloadQR( qr : string) {
    this.myAngularxQrCode = qr;
    this.qrCodeDownloadLink = this.myAngularxQrCode;
    
  }

  setEstudiantes() {
    this.estudiantesState.set({loading: true, estudiantes: []});
    this.estudiantesService.getAllEstudiantes(this.currentPage()).subscribe({
      next: (response) => {
        this.totalPages = Array.from({length: response.totalPages}, (_, i) => i + 1);
        this.estudiantesState.set({loading: false, estudiantes: response.data});
      },
      error: (error) => {

        console.error(error);
      }
    });
  }

  onSearchUpdated(sq: string){
    this.search.set(sq);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Archivo seleccionado:', this.selectedFile);
    }

    if (!this.selectedFile) {
      console.error('No se ha seleccionado ningún archivo.');
      return;
    }

    const formData = new FormData();

    formData.append('file', this.selectedFile, this.selectedFile.name);

    this.estudiantesState.set({loading: true, estudiantes: []});
    this.estudiantesService.cargarMasivaEstudiantes(formData).subscribe({
      next: (res) => {
        this.toaster.success('Se cargaron los Estudiantes','Exito', {positionClass: 'toast-bottom-center'});
        this.setEstudiantes();
      },
      error: (error) => {
        this.toaster.error(error.error.message,'Error', {positionClass: 'toast-bottom-center'});
        console.error(error);
      }
    })
  }

  onPageChange(page: number) {

    this.search.set('');
    if (page < 1 || page > this.totalPages.length) {
      return;
    }
    this.currentPage.set(page);
    this.currentPage.set(page);
    this.estudiantesState.set({loading: true, estudiantes: []});
    this.estudiantesService.getAllEstudiantes(page).subscribe((res) => {
      this.estudiantesState.set({loading: false, estudiantes: res.data});
    });
  }
  crearEstudiante() {
    this.router.navigate(['/estudiantes/crear-estudiante']);
  }
  
  verEstudiante(rut: string) {
    this.router.navigate([`/estudiantes/ver-estudiante/${rut}`]);
  }

  editarEstudiante(rut: string) {
    this.router.navigate([`/estudiantes/editar-estudiante/${rut}`]);
  }

}
