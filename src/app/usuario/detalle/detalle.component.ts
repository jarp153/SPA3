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
  forma!: FormGroup;
  usuario!: IUsuarioModel;
  tiene_hermanos: string = 'NO';
  fecha_nacimiento!: string;
  cod_usuario: number = 0;
  error: boolean = false;
  mensaje: string = '';
  
  public archivo: Archivo | undefined;
  public imagenSubir: File | undefined;
  public imgTemp: any = null;
  
  constructor(private readonly router: ActivatedRoute, 
              private readonly spaService: SpaService, 
              private readonly fb: FormBuilder, 
              private readonly routerb: Router, 
              public tools: ToolsService) { 

      this.loadForm();

      this.router.params.subscribe(params => {
        this.detalleUsuario(params['id']);
        })
    }

    private loadForm():void{
      this.forma = this.fb.group({
        Cod_Usuario : [''],
        Nombre : ['', Validators.required],
        Apellido : ['', Validators.required],
        Fecha_Nacimiento: [new Date(), Validators.required],
        Foto: [''],
        Estado_Civil: ['', Validators.required],
        Tiene_Hermanos: ['', Validators.required],
        })

    }
    ngOnInit(): void {
    }

    detalleUsuario(id: number){
      this.spaService.detailUser(id).subscribe( (res:any) => {
        this.usuario = res;
        this.cod_usuario=res.Cod_Usuario;
        this.tools.asignarNombreOpcion('Detalle usuario ' + this.usuario.Nombre);

        this.forma.patchValue({
          Cod_Usuario: this.usuario.Cod_Usuario,
          Nombre: this.usuario.Nombre,
          Apellido: this.usuario.Apellido,
          Fecha_Nacimiento: this.usuario.Fecha_Nacimiento,
          Foto: this.usuario.Foto,
          Estado_Civil: this.usuario.Estado_Civil,
          Tiene_Hermanos: this.usuario.Tiene_Hermanos,
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
    this.spaService.subirArchivo(this.archivo).subscribe(res=>{
      console.log('archivo')
    })
  }

  regresar(): void{
    this.routerb.navigate(['admin/ingresar']);
  }

}
