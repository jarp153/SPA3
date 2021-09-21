import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IUsuarioModel } from 'src/app/models/usuario-model';
import { SpaService } from 'src/app/services/spa.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: IUsuarioModel[] = [];
  cargando = false;
  error = false;

  constructor( private readonly spaService: SpaService,
               private readonly fb: FormBuilder, 
               public tools: ToolsService) { }

  ngOnInit(): void {
    this.tools.asignarNombreOpcion('Usuarios');
    this.getUsers();
  }

  getUsers(): void{
    this.spaService.getUsers().subscribe(res=>{
      this.usuarios = res;
     },
    err =>{
      alert('Error en la comunicacion')
      this.error = true;
    })
  }
}
