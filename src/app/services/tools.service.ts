import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
 nombre_opcion = '';

  constructor() { }

  asignarNombreOpcion(opcion: string){
    this.nombre_opcion = opcion;
  }


}
