import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './componentes/home/inicio/inicio.component';

const routes: Routes = [
  //{path: '', component: LoginComponent},
  {path: '', component: InicioComponent},
  {path: 'home', component: InicioComponent},
  { path: 'admin', loadChildren: () => import(`./usuario/usuario.module`).then(m => m.UsuarioModule) },
  /* {path: 'login', component: LoginComponent},
  {path: 'consultar-colegios', component: ConsultarColegiosComponent},
  {path: 'crear-colegio', component: IngresarColegioComponent},
  {path: 'detalle-colegio/:id', component: DetalleColegioComponent},
  {path: 'consultar-alumnos', component: ConsultarAlumnosComponent},
  {path: 'detalle-alumno/:id', component: DetalleAlumnoComponent},
  {path: 'ingresar-inscripcion', component: IngresarInscripcionComponent},
  {path: 'inicio', component: InicioComponent}, */

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

