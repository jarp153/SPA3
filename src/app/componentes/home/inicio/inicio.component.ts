import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  constructor(private tools: ToolsService) { 
    
  }

  ngOnInit(): void {
    this.tools.asignarNombreOpcion('Inicio')
  }

  grabar(){

  }
}
