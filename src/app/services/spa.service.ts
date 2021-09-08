import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsuarioModel } from '../models/usuario-model';

@Injectable({
  providedIn: 'root'
})
export class SpaService {
  private url = environment.url;

  constructor(private http: HttpClient) { }

  consultarUsuarios(): Observable<UsuarioModel[]>{
    return this.http.get<UsuarioModel[]>(`${ this.url }/ConsultarUsuarios`)
  }

  consultarDetalleUsuario(id: number){
    return this.http.get<any[]>(`${ this.url }/ConsultarUsuario/${ id }`)
  }

  ingresarUsuario(data: any){
    return this.http.post<any[]>(`${ this.url }/IngresarUsuario/`, data)
  }

  actualizarUsuario(data: any){
    return this.http.put<any[]>(`${ this.url }/ActualizarUsuario/`, data)
  }

  subirArchivo(File: any): Observable<any>{
    var json = JSON.stringify(File);
    console.log(File);
    var headers = new HttpHeaders().set("Content-Type","application/json");

    return this.http.post<any[]>(`${ this.url }/IngresarImagen/`,File, {headers})
  }

}
