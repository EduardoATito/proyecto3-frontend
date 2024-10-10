import { Component, computed, effect, ElementRef, inject, OnInit, Renderer2, signal, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { LayoutService } from '../layout.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, CommonModule, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent{

  private layoutService = inject(LayoutService);
  public collapsed = signal<boolean>(false);
  public isMobile = computed(() => this.layoutService.isMobile());

  constructor() {

    effect(() => {
      if (!this.isMobile()) {
        this.collapsed.set(false);
      }
    },{allowSignalWrites: true});
  }

  updateCollapsed(){
    this.collapsed.set(!this.collapsed());
  }


}
