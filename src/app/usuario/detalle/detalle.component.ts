import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Archivo } from 'src/app/models/archivo-model';
import { IUsuarioModel } from 'src/app/models/usuario-model';
import { SpaService } from 'src/app/services/spa.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  //forma!: FormGroup;
  usuario!: IUsuarioModel;
  //tiene_hermanos: string = 'NO';
  fecha_nacimiento!: string;
  cod_usuario: number = 0;
  error: boolean = false;
  mensaje: string = '';

  public readonly estados_civiles = [{value: 1, text: 'CASADO' }, {value: 0, text: 'SOLTERO' } ];
  public readonly tiene_hermanos = [{value: 1, text: 'SI' }, {value: 0, text: 'NO' } ];
  
  public archivo: Archivo | undefined;
  public imagenSubir: File | undefined;
  public imgTemp: any = null;

  public readonly forma: FormGroup = new FormGroup({
    Cod_Usuario: new FormControl(null),
    Nombre: new FormControl(null, [Validators.required]),
    Apellido: new FormControl(null, [Validators.required]),
    Fecha_Nacimiento: new FormControl(new Date(), [Validators.required]),
    Foto: new FormControl(null, [Validators.required]),
    Estado_Civil: new FormControl(null, [Validators.required]), 
    Tiene_Hermanos: new FormControl(null, [Validators.required]),
  });
  
  constructor(private readonly router: ActivatedRoute, 
              private readonly spaService: SpaService, 
              private readonly fb: FormBuilder, 
              private readonly routerb: Router, 
              public tools: ToolsService) { 

      this.router.params.subscribe(params => {
        this.detalleUsuario(params['id']);
        })
    }

    ngOnInit(): void {
    }

    detalleUsuario(id: number){
      this.spaService.detailUser(id).subscribe( (res:IUsuarioModel) => {
        this.cod_usuario=res.Cod_Usuario;
        this.tools.asignarNombreOpcion('Detalle usuario ' + res.Nombre);

        this.forma.setValue({
          Cod_Usuario: res.Cod_Usuario,
          Nombre: res.Nombre,
          Apellido: res.Apellido,
          Fecha_Nacimiento: res.Fecha_Nacimiento,
          Foto: res.Foto,
          Estado_Civil: res.Estado_Civil,
          Tiene_Hermanos: res.Tiene_Hermanos,
        }) 
     })
    }

   actualizar(){
    
    if (this.forma.invalid) {
      this.error=true;
      this.mensaje = 'Debe diligenciar todos los datos...'
      return false;
    }
    else{
      const user = this.forma.value as IUsuarioModel;
      
      this.spaService.updateUser(user).subscribe(res=>{
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

  /*fileEvent(fileInput: Event){
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
    this.spaService.subirArchivo(this.archivo).subscribe(res=>{
      console.log('archivo')
    })
  }*/

  regresar(): void{
    this.routerb.navigate(['admin/usuarios']);
  }

}
