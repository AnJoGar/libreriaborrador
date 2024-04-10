import { Component, OnInit,  Input, Output, EventEmitter} from '@angular/core';
import { ModelBook } from '../../Models/model-book';
import { ServiceBookService } from '../../Services/service-book.service';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-libros-seleccionados',
  templateUrl: './libros-seleccionados.component.html',
  styleUrls: ['./libros-seleccionados.component.css']
})
export class LibrosSeleccionadosComponent {
p:number=1;
libros: ModelBook[] = [];  
filtroGenero: string | undefined;
mostrarBotonEliminar: boolean = true; 
@Input() genero1: string[] = [];

filtroPaginasInput: number =2000;


constructor(private servicio:ServiceBookService, private route: ActivatedRoute){
}


ngOnInit(){  
this.servicio.loadBooksData().subscribe(() => {
  this.libros = [...this.servicio.getSelectedBooks()];
  
  this.servicio.metodo1();
  console.log("Libros disponibles:", this.libros);
  console.log("Géneros disponibles:", this.genero1);
  

});
this.genero1 = [...this.servicio.getUniqueGenresSeleccionados()];
this.filtroPaginasInput=2000;

this.servicio.selectedBooks$.subscribe(selectedBooks => {
   this.libros=selectedBooks;
   this.servicio.metodo1()

this.filtrarLibrosPorGenero1() 
  });
 
}

get LibrosSeleccionados(): ModelBook[]{

  let librosFiltrados=this.filtroGenero? this.servicio.getSelectedBooks().filter(book=> book.book.genre===this.filtroGenero) :
    this.servicio.getSelectedBooks()


  if (this.filtroPaginasInput &&this.filtroGenero  ) {
   librosFiltrados= librosFiltrados.filter(book=>this.servicio.filtroPaginaSeleccionados(1,this.filtroPaginasInput).includes(book));
  } else {


   librosFiltrados= this.servicio.filtroPaginaSeleccionados(1,this.filtroPaginasInput);

  }
    return librosFiltrados;
}

RemoveBook(book: ModelBook) {
  this.servicio.removeBook(book);
  this.libros = this.libros.filter(b => b !== book);
  
console.log("librosRemovidos", this.libros)
this.servicio.setLibrosFiltradosCountSel(this.libros.length, "");
this.filtrarLibrosPorGenero1();
 }

 filtrarLibrosPorGenero1(): void {
  if (this.filtroGenero) {
    this.libros = this.libros.filter(book => book.book.genre === this.filtroGenero);
    console.log("Libros filtrados por género:", this.libros);
    this.servicio.setLibrosFiltradosCountSel(this.libros.length,this.filtroGenero);
    console.log("setlibros",this.libros)
  } else {
    this.libros = [...this.servicio.getSelectedBooks()];
    this.servicio.metodo1();
  }
}

}
