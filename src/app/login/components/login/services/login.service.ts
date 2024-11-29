import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginResponse } from '../types/login-response.types';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl: string = "http://localhost:8080/auth"
  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string){
    return this.httpClient.post<loginResponse>(this.apiUrl + "/login",{email,password}).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("username", value.name)
        sessionStorage.setItem("user_id", value.id) // Salvando o ID do usuário
      })
    )
  }


  signup(name: string, email: string, password: string){
    return this.httpClient.post<loginResponse>(this.apiUrl + "/register",{name,email,password}).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("username", value.name)
        sessionStorage.setItem("user_id", value.id) // Salvando o ID do usuário
      })
    )
  }

}
