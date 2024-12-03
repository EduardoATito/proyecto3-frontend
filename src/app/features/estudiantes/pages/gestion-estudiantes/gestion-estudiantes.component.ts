import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { Estudiante } from '../../interfaces/estudiante.interface';
import { EstudiantesService } from '../../services/estudiantes.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { LayoutService } from '../../../../core/layout/layout.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-gestion-estudiantes',
  standalone: true,
  imports: [SpinnerComponent, NgClass],
  templateUrl: './gestion-estudiantes.component.html',
  styleUrl: './gestion-estudiantes.component.css',
  animations: [
    trigger('notLoading', [
      transition(':enter', [
        style({ opacity: 0}),
        animate('300ms ease-out', style({ opacity: 1})) 
      ]),
    ])
  ]
})
export class GestionEstudiantesComponent implements OnInit{

  private estudiantesState = signal<{loading: boolean, estudiantes: Estudiante[]}>({loading: true, estudiantes: []});
  private estudiantesService = inject(EstudiantesService)
  private layout = inject(LayoutService);

  public selectedFile: File | null = null;

  public search = signal<string>('');
  public isMobile = computed(() => this.layout.isMobile());
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

  setEstudiantes() {
    this.estudiantesState.set({loading: true, estudiantes: []});
    this.estudiantesService.getAllEstudiantes().subscribe({
      next: (response) => {
        console.log('Estudiantes:', response);
        this.estudiantesState.set({loading: false, estudiantes: response});
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
      next: (response) => {
        console.log('Respuesta:', response);
        this.setEstudiantes();
      },
      error: (error) => {
        console.error(error);
      }
    })
  }


  crearEstudiante() {}

  verEstudiante() {}

  editarEstudiante(rut: string) {}

  eliminarEstudiante(rut: string) {}
}
