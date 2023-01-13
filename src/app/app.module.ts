import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from "@angular/common/http";
import { NuevoComponent } from './components/nuevo/nuevo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActualizarComponent } from './components/actualizar/actualizar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NuevoComponent,
    ActualizarComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
