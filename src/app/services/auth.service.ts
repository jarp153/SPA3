import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.url;
  token: any = null;
  usuario: any = null;

  constructor(private http: HttpClient, private router: Router) { 
    this.readUser();
  }

  login(data: any) {

     return this.http.post(`${ this.url }/login/`, data).pipe(map((resp: any) => {

      if(resp.cod_usuario != 0){
        localStorage.setItem('token', JSON.stringify(resp.token));
        localStorage.setItem('usuario', JSON.stringify(resp.nom_usuario));
        this.usuario = resp.nom_usuario;
        console.log(resp.nom_usuario)
      }
       
       return resp;
   }),
     catchError(err => {
       return throwError(err);
     })
   );
   }

  isLoggued(){
    return (this.token != null) ? true : false;
  }

  readUser(){
    this.token = localStorage.getItem('token');;
    this.usuario = localStorage.getItem('usuario');
    console.log(this.usuario)
  }

  saveUser(token: string, res: string){
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', res)
  }

  logout(){
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}