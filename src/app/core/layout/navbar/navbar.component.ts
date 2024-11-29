import { NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, inject, input, OnInit, output, Renderer2, signal, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PayloadToken } from '../../auth/interface/payload.interface';
import { JWTTokenService } from '../../auth/services/jwttoken.service';
import { single } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  @ViewChild('menu') menu!: ElementRef;

  public collapsed = output();
  public isDropMenu = signal(false);
  private router = inject(Router);

  private render = inject(Renderer2);
  public isMobile = input<boolean>();
  private jwtTokenService = inject(JWTTokenService);

  public userProfile = signal<{user:string, rol:string}>({user: '', rol: ''});
 

  constructor() {
    this.render.listen('document', 'click', (e: Event) => {
      if (this.menu && !this.menu.nativeElement.contains(e.target)) {
        this.isDropMenu.set(false);
      }
    });
  }
  ngOnInit(): void {
    this.userProfile.set({user: this.jwtTokenService.getUser()!, rol: this.jwtTokenService.getRol()!});
  }

  collapsedEmit() {
    this.collapsed.emit();
  }

  dropMenu() {
    this.isDropMenu.set(!this.isDropMenu());
  }


  profile() {
    this.dropMenu();
    this.router.navigate(['/perfil']);
  }

  logout() {
    this.jwtTokenService.removeToken();
    this.router.navigate(['/login']);
  }
}
