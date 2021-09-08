import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DetalleComponent } from './detalle/detalle.component';
import { IngresarComponent } from './ingresar/ingresar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../modules/material.module';
import { LoadingComponent } from '../componentes/shared/loading/loading.component';


@NgModule({
  declarations: [
    UsuariosComponent, 
    DetalleComponent, 
    IngresarComponent,
    LoadingComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    UsuarioRoutingModule,
    MaterialModule
  ],
  exports:[
    UsuariosComponent,
    DetalleComponent,
    IngresarComponent
  ]
})
export class UsuarioModule { }
