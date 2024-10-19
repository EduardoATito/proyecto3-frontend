import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { LayoutService } from '../../../layout/layout.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private layoutService = inject(LayoutService);

  public isMobile = computed(() => this.layoutService.isMobile());
}
