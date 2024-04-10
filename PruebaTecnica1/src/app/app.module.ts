import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importa el módulo HttpClient
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaLibrosComponent } from './Components/lista-libros/lista-libros.component';

import { ListaLecturaComponent } from './Components/lista-lectura/lista-lectura.component';
import { FiltroLibrosComponent } from './Components/filtro-libros/filtro-libros.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import{MatSelectModule} from '@angular/material/select';
import { ServiceBookService } from '../app/Services/service-book.service';
import { FormsModule } from '@angular/forms';
import { LibrosSeleccionadosComponent } from './Components/libros-seleccionados/libros-seleccionados.component';
//import { FiltroLibrosSeleccionadosComponent } from './Components/filtro-libros-seleccionados/filtro-libros-seleccionados.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatButtonModule} from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import {MatSliderModule} from '@angular/material/slider';
@NgModule({
  declarations: [
    AppComponent,
    ListaLibrosComponent,

    ListaLecturaComponent,
    FiltroLibrosComponent,
    LibrosSeleccionadosComponent,
  //  FiltroLibrosSeleccionadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatSelectModule,
    FormsModule,
    MatPaginatorModule,
    NgxPaginationModule,
    MatButtonModule,
    MatBadgeModule,
    MatSliderModule,
  ],
  providers: [ServiceBookService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
