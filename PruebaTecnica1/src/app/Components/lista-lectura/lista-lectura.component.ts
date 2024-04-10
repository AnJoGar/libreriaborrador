import { Component, OnInit, Input, Output, EventEmitter,ViewChild , AfterViewInit, } from '@angular/core';
import { ModelBook } from '../../Models/model-book';
import { ServiceBookService } from '../../Services/service-book.service';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { MatSelectModule } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { Observable,throwError,of  } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lista-lectura',
  templateUrl: './lista-lectura.component.html',
  styleUrls: ['./lista-lectura.component.css'],

})
export class ListaLecturaComponent    {
  p: number = 1; 
  generos: string[] = []
  librosFiltrados: ModelBook[] = [];
  filtroGenero: string | undefined;
  filtroPaginasInput: number =1000;
  selectedGenre: string | null = null;
  libros: ModelBook[] = [];
  @Input() genero: string[] = [];
  @Input() pages: ModelBook[] = [];
  librosSeleccionados: ModelBook[] = [];

  constructor(private bookService: ServiceBookService, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
   // Carga libros disponibles solo si la lista de seleccionados está vacía
   if (this.librosSeleccionados.length === 0) {
    this.bookService.loadBooksData().subscribe(() => {
      this.libros = [...this.bookService.getAvailableBooks()];
      this.genero = [...this.bookService.getUniqueGenres()];
      this.bookService.metodo()
      //this.pages=this.bookService.filtroPagina(1,300);
      console.log("Libros disponibles:", this.libros);
      console.log("Géneros disponibles:", this.genero);
      console.log("Géneros disponibles:", this.pages);

    });

  }
  this.bookService.metodo()
  this.filtroGenero = ''; // O el valor predeterminado que desees
  this.filtroPaginasInput = 2000; 
  this.filtrarLibrosPorPagina();
  this.bookService.librosDisponibles$.subscribe((librosDisponibles) => {
    this.libros = [...librosDisponibles];
    this.bookService.metodo(); 
    //this.cdr.detectChanges();
 
  });

 
  this.bookService.selectedBooks$.subscribe(selectedBooks => {
     this.libros=selectedBooks;
     this.bookService.metodo1(); 
  //  this.cdr.detectChanges();
  });
  }


  get librosaleer(): ModelBook[] {
    const availableBooks = this.bookService.getAvailableBooks();
  
    // Apply genre filter first, if applicable
    let filteredBooks = this.filtroGenero
      ? this.bookService.getAvailableBooks().filter(book => book.book.genre === this.filtroGenero)
      : this.bookService.getAvailableBooks();
      
    // Apply page filter only if both filters are active
    if (this.filtroPaginasInput && this.filtroGenero) {
      filteredBooks = filteredBooks.filter(book => this.bookService.filtroPagina(1, this.filtroPaginasInput).includes(book));
    
     // this.bookService.setLibrosFiltradosCount(filteredBooks.length,this.filtroGenero);
    } else if (this.filtroPaginasInput) {
      filteredBooks = this.bookService.filtroPagina(1, this.filtroPaginasInput);
      this.bookService.metodo
   //  this.bookService.setLibrosFiltradosCount(filteredBooks.length, "Todos");
     //this.bookService.setLibrosFiltradosCount1(filteredBooks.length);
    }
    
    return filteredBooks;
  }

  filtrarLibrosPorGenero(): void {
    if (this.filtroGenero) {
      this.librosFiltrados = this.libros.filter(book => book.book.genre === this.filtroGenero);
      console.log("Libros filtrados por género:", this.librosFiltrados);
     this.bookService.setLibrosFiltradosCount(this.librosFiltrados.length,this.filtroGenero);
    
     console.log("setlibros",this.librosFiltrados)
    } else {
      this.librosFiltrados = this.libros;
      this.bookService.metodo();
      console.log("setlibrosTodos",this.librosFiltrados)
    }

  }

  filtrarLibrosPorPagina(): void {
    if (this.filtroPaginasInput) {
      const librosFiltrados = this.bookService.filtroPagina(1, this.filtroPaginasInput);
      console.log("Libros filtrados por página:", librosFiltrados);  
     // this.libros = [...librosFiltrados];
    // this.bookService.setLibrosFiltradosCount1(librosFiltrados.length);
     
    } else {
      this.libros = [...this.bookService.getAvailableBooks()];
    }

  }

  selectBook(book: ModelBook) {
    console.log("Seleccionar libro:", book);
    this.bookService.selectBook(book);
    this.libros = this.libros.filter(b => b !== book);
    this.filtrarLibrosPorGenero();
    console.log("Libros después de seleccionar:", this.librosaleer);
    

  }

}
