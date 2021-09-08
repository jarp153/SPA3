import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SpaService } from 'src/app/services/spa.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: any = [];
  cargando = false;
  error = false;

  constructor(public spaS: SpaService,
               private fb: FormBuilder, 
               public tools: ToolsService) { }

  ngOnInit(): void {
    this.tools.asignarNombreOpcion('Usuarios');
    this.consultar();

  }

  consultar(){
    this.spaS.consultarUsuarios().subscribe(res=>{
      this.usuarios = res;
     },
    err =>{
      alert('Error en la comunicacion')
      this.error = true;
    })

  }

}
