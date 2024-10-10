import { NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, inject, input, output, Renderer2, signal, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @ViewChild('menu') menu!: ElementRef;

  public collapsed = output();
  public isDropMenu = signal(false);

  private render = inject(Renderer2);
  public isMobile = input<boolean>();

  constructor() {
    this.render.listen('document', 'click', (e: Event) => {
      if (this.menu && !this.menu.nativeElement.contains(e.target)) {
        this.isDropMenu.set(false);
      }
    });
  }

  collapsedEmit() {
    this.collapsed.emit();
  }

  dropMenu() {
    this.isDropMenu.set(!this.isDropMenu());
  }
}
