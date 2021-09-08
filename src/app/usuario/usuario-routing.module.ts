import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleComponent } from './detalle/detalle.component';
import { IngresarComponent } from './ingresar/ingresar.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  { path: '', component: UsuariosComponent },
  {path: 'detalle/:id', component: DetalleComponent},
  {path: 'usuarios', component: UsuariosComponent  },
  {path: 'ingresar', component: IngresarComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
