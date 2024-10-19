import { Component, computed, inject } from '@angular/core';
import { LayoutService } from '../../../../../core/layout/layout.service';

@Component({
  selector: 'app-confirmar-prestamo',
  standalone: true,
  imports: [],
  templateUrl: './confirmar-prestamo.component.html',
  styleUrl: './confirmar-prestamo.component.css'
})
export class ConfirmarPrestamoComponent {

  private layoutService = inject(LayoutService);
  public isMobile = computed(() => this.layoutService.isMobile());
}
