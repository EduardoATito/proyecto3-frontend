import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { LayoutService } from '../../../layout/layout.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../interface/login.interface';
import {CookieService} from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { JWTTokenService } from '../../services/jwttoken.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgOptimizedImage, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private layoutService = inject(LayoutService);
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private jwtTokenService = inject(JWTTokenService);
  private router = inject(Router);

  public loginForm = this.formBuilder.group({
    rut: ['', Validators.required],
    password: ['', Validators.required]
  });
  public isMobile = computed(() => this.layoutService.isMobile());

  public login(){

    if(this.loginForm.invalid){
      console.log('Por favor, completa los campos');
      this.loginForm.markAllAsTouched();
      return;
    }

    const loginData : Login= { 
      rut: this.loginForm.get('rut')?.value!,
      password: this.loginForm.get('password')?.value!
    }

    this.authService.login(loginData).subscribe({
      next: (response) => {
        this.jwtTokenService.setToken(response.access_token);
        this.router.navigate(['/']);
        this.toastrService.success('Login exitoso', 'Bienvenido', {positionClass: 'toast-bottom-center'});
      },
      error: (error) => {
        this.toastrService.error(error.error.message, 'Error', {positionClass: 'toast-bottom-center'});
      }
    });
  }
}
