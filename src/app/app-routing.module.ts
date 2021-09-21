import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './componentes/home/inicio/inicio.component';

const routes: Routes = [
  { path: '', redirectTo:'admin', pathMatch: 'full'},
  { path: 'home', component: InicioComponent},
  { path: 'admin', loadChildren: () => import(`./usuario/usuario.module`).then(m => m.UsuarioModule) },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

