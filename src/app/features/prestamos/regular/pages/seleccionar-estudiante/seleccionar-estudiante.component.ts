import { Component, computed, inject } from '@angular/core';
import { LayoutService } from '../../../../../core/layout/layout.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-seleccionar-estudiante',
    imports: [],
    templateUrl: './seleccionar-estudiante.component.html',
    styleUrl: './seleccionar-estudiante.component.css'
})
export class SeleccionarEstudianteComponent {

  private layoutService = inject(LayoutService);
  private router = inject(Router);
  public isMobile = computed(() => this.layoutService.isMobile());

  useQrCode(){
    const route = this.router.url;
    this.router.navigate([`${route}/metodo-qr`]);
  }
}
