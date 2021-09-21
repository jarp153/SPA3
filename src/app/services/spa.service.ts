import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUsuarioModel } from '../models/usuario-model';

@Injectable({
  providedIn: 'root'
})
export class SpaService {
  private url = environment.url;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUsuarioModel[]>{
    return this.http.get<IUsuarioModel[]>(`${ this.url }/ConsultarUsuarios`)
  }

  detailUser(id: number){
    return this.http.get<IUsuarioModel>(`${ this.url }/ConsultarUsuario/${ id }`)
  }

  insertUser(user: IUsuarioModel): Observable<IUsuarioModel>{
    return this.http.post<IUsuarioModel>(`${ this.url }/IngresarUsuario/`, user)
  }

  updateUser(user: IUsuarioModel){
    return this.http.put<IUsuarioModel>(`${ this.url }/ActualizarUsuario/`, user)
  }

  subirArchivo(File: any): Observable<any>{
    var json = JSON.stringify(File);
    console.log(File);
    var headers = new HttpHeaders().set("Content-Type","application/json");

    return this.http.post<any[]>(`${ this.url }/IngresarImagen/`,File, {headers})
  }

}
