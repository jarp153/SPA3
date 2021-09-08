import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario-model';
import { SpaService } from 'src/app/services/spa.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.css']
})
export class IngresarComponent implements OnInit {
  forma: FormGroup;
  error: boolean = false;
  mensaje: string = '';

  constructor(private router: ActivatedRoute, 
    private spaS: SpaService, 
    private fb: FormBuilder, 
    private routerb: Router, 
    public tools: ToolsService) { 

      this.tools.asignarNombreOpcion('Ingresar usuario');

      this.forma = this.fb.group({
        txtNombre : ['', Validators.required],
        txtApellido : ['', Validators.required],
        txtFechaNacimiento: ['', Validators.required],
        txtFoto: ['', Validators.required],
        drpEstadoCivil: ['', Validators.required],
        drpTieneHermanos: ['', Validators.required],
        })
    }

  ngOnInit(): void {
    this.tools.asignarNombreOpcion('Ingresar usuario')
  }

  ingresar(){

    if (this.forma.invalid) {
      //alert('Debe diligenciar todos los datos');
      this.error=true;
      this.mensaje = 'Debe diligenciar todos los datos...'
      return false;
    }
    else{
      const data: any = {
        Nombre: this.forma.value.txtNombre,
        Apellido: this.forma.value.txtApellido,
        Fecha_Nacimiento: this.forma.value.txtFechaNacimiento,
        Foto: this.forma.value.txtFoto,
        Estado_Civil: this.forma.value.drpEstadoCivil,
        Tiene_Hermanos: this.forma.value.drpTieneHermanos,
      };

      this.spaS.ingresarUsuario(data).subscribe(res=>{
        alert('Usuario ingresado');
      },
      err=>{
        this.error=true;
        //alert('Error ingresando datos');
        return false;
      }
      )
      this.routerb.navigate(['admin/usuarios']);
      return true;
      
    }
  }

  regresar(){
    this.routerb.navigate(['admin/usuarios']);
  }


}
