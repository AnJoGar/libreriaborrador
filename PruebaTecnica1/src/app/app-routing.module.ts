import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{ListaLecturaComponent} from '../app/Components/lista-lectura/lista-lectura.component'

import{ListaLibrosComponent} from '../app/Components/lista-libros/lista-libros.component'
import{FiltroLibrosComponent} from '../app/Components/filtro-libros/filtro-libros.component'
import{LibrosSeleccionadosComponent} from '../app/Components/libros-seleccionados/libros-seleccionados.component'
const routes: Routes = [
  
  { path: '', redirectTo: '/opcion1', pathMatch: 'full' },
  { path: 'opcion1', component: ListaLecturaComponent },
  { path: 'opcion2', component: LibrosSeleccionadosComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
