import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Archivo } from 'src/app/models/archivo-model';
import { IUsuarioModel } from 'src/app/models/usuario-model';
import { SpaService } from 'src/app/services/spa.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.css']
})
export class IngresarComponent implements OnInit {
  forma!: FormGroup;
  error: boolean = false;
  mensaje: string = '';

  public archivo: Archivo | undefined;
  public imagenSubir: File | undefined;
  public imgTemp: any = null;

  public readonly estados_civiles = [{value: 1, text: 'CASADO' }, {value: 0, text: 'SOLTERO' } ];
  public readonly tiene_hermanos = [{value: 1, text: 'SI' }, {value: 0, text: 'NO' } ];

  constructor(
    private router: ActivatedRoute, 
    private readonly spaService: SpaService, 
    private readonly fb: FormBuilder, 
    private readonly routerb: Router, 
    public readonly tools: ToolsService) { 
      this.loadForm();
  }

  private loadForm():void{
    this.forma = this.fb.group({
      Nombre : ['', Validators.required],
      Apellido : ['', Validators.required],
      Fecha_Nacimiento: ['', Validators.required],
      Foto: ['', Validators.required],
      Estado_Civil: ['', Validators.required],
      Tiene_Hermanos: ['', Validators.required],
      })
  }

  ngOnInit(): void {
    this.tools.asignarNombreOpcion('Ingresar usuario')
  }

  insertUser():  void{
    if (this.forma.invalid) {
      this.error=true;
      this.mensaje = 'Debe diligenciar todos los datos...'
    }
    else{
      const user = this.forma.value as IUsuarioModel;

      this.spaService.insertUser(user).subscribe(res=>{
        alert('Usuario ingresado');
        this.routerb.navigate(['admin/usuarios']);
      },
      err=>{
        this.error=true;

      }
      )
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

  back():void{
    this.routerb.navigate(['admin/usuarios']);
  }
}
