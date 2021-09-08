import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Archivo } from 'src/app/models/archivo-model';
import { UsuarioModel } from 'src/app/models/usuario-model';
import { SpaService } from 'src/app/services/spa.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  forma: FormGroup;
  usuario: any;
  tiene_hermanos: string = 'NO';
  fecha_nacimiento!: string;
  cod_usuario: number = 0;
  error: boolean = false;
  mensaje: string = '';
  
  public archivo: Archivo | undefined;
  public imagenSubir: File | undefined;
  public imgTemp: any = null;
  
  constructor(private router: ActivatedRoute, 
    private spaS: SpaService, 
    private fb: FormBuilder, 
    private routerb: Router, 
    public tools: ToolsService) { 

      this.tools.asignarNombreOpcion('Detalle usuario')
      this.forma = this.fb.group({
        txtNombre : ['', Validators.required],
        txtApellido : ['', Validators.required],
        txtFechaNacimiento: [new Date(), Validators.required],
        txtFoto: ['', Validators.required],
        drpEstadoCivil: ['', Validators.required],
        drpTieneHermanos: ['', Validators.required],
        })

      this.router.params.subscribe(params => {
        this.detalleUsuario(params['id']);
        })
    }

    ngOnInit(): void {
    }

    detalleUsuario(id: number){
      this.spaS.consultarDetalleUsuario(id).subscribe( (res:any) => {
        this.usuario = res;
        this.cod_usuario=res.Cod_Usuario;
        this.tools.asignarNombreOpcion('Detalle usuario ' + this.usuario.Nombre);
         
        this.forma.patchValue({
          txtNombre: this.usuario.Nombre,
          txtApellido: this.usuario.Apellido,
          txtFechaNacimiento: this.usuario.Fecha_Nacimiento,
          txtFoto: this.usuario.Foto,
          drpEstadoCivil: 1, //this.usuario.Estado_Civil,
          drpTieneHermanos: this.usuario.Tiene_Hermanos,
        })

        this.forma.controls.drpTieneHermanos.setValue(1);
      })
    }

   actualizar(){
    
    if (this.forma.invalid) {
      this.error=true;
      this.mensaje = 'Debe diligenciar todos los datos...'
      return false;
    }
    else{
      const data: any = {
        Cod_Usuario: this.cod_usuario,
        Nombre: this.forma.value.txtNombre,
        Apellido: this.forma.value.txtApellido,
        Fecha_Nacimiento: this.forma.value.txtFechaNacimiento,
        Foto: this.forma.value.txtFoto,
        Estado_Civil: this.forma.value.drpEstadoCivil,
        Tiene_Hermanos: this.forma.value.drpTieneHermanos,
      };

      this.spaS.actualizarUsuario(data).subscribe(res=>{
        console.log(res);
      },
      err=>{
        alert('Error ingresando datos');
      }
      )
      this.routerb.navigate(['admin/usuarios']);
      return true;
      
    }
  }

  fileEvent(fileInput: Event){
    const element = fileInput.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    
    if (fileList) {
      const reader = new FileReader();
      reader.readAsDataURL( fileList[0] );

      reader.onloadend = () => {
        this.imgTemp = reader.result;
      }
    }
  }

  subirArchivo(archivo: Archivo){
    this.spaS.subirArchivo(this.archivo).subscribe(res=>{
      console.log('archivo')
    })
  }

  regresar(){
    this.routerb.navigate(['admin/usuarios']);
  }

}
