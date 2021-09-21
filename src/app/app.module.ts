import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './modules/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './componentes/shared/header/header.component';
import { InicioComponent } from './componentes/home/inicio/inicio.component';
import { SidebarComponent } from './componentes/shared/sidebar/sidebar.component';
import { MessagesComponent } from './componentes/shared/messages/messages.component';
import { NavbarComponent } from './componentes/shared/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InicioComponent,
    SidebarComponent,
    MessagesComponent,
    NavbarComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    //FormsModule,
    //ReactiveFormsModule,
  ],
  providers: [ ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
