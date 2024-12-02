import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { Estudiante } from '../../interfaces/estudiante.interface';
import { EstudiantesService } from '../../services/estudiantes.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-gestion-estudiantes',
  standalone: true,
  imports: [SpinnerComponent],
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

  public selectedFile: File | null = null;
  public estudiantes = computed(() => this.estudiantesState().estudiantes);
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
  }


  crearEstudiante() {}

  verEstudiante() {}

  editarEstudiante(rut: string) {}

  eliminarEstudiante(rut: string) {}
}
