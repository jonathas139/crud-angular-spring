import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { DefaultLoginLayoutComponent } from '../default-login-layout/default-login-layout.component';
import { PrimaryInputComponent } from '../primary-input/primary-input.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    readonly  router: Router,
    readonly loginService: LoginService,
    readonly  toastService: ToastrService
  ){
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)])
    })
  }

  submit(){
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: () => {
        this.toastService.success("Login feito com sucesso!");
        this.router.navigate(['/courses']); // Substitua com o caminho correto
      },
      error: () => {
        this.toastService.error("Erro inesperado! Tente novamente mais tarde")
      }
    });
  }
  navigate(){
    this.router.navigate(["signup"])
  }

}
