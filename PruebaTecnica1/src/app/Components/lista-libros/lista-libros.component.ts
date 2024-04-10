import { Component, OnInit,Input, SimpleChange } from '@angular/core';
import { ModelBook } from '../../Models/model-book';
import { ServiceBookService } from '../../Services/service-book.service';
import { MatTabsModule } from '@angular/material/tabs';
import { NavigationEnd,Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { filter, take } from 'rxjs/operators';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ListaLecturaComponent } from '../lista-lectura/lista-lectura.component';
import { ChangeDetectorRef } from '@angular/core';
import { NgZone } from '@angular/core';
import { ApplicationRef } from '@angular/core';
@Component({
  selector: 'app-lista-libros',
  templateUrl: './lista-libros.component.html',
  styleUrls: ['./lista-libros.component.css'],
 
})
export class ListaLibrosComponent implements OnInit {
  librosDisponiblesCount: number = 0;
  librosOcupadosCount: number = 0;
  librosOcupadosCount1: number = 0;
  libros: ModelBook[] = [];
  navLinks: any[];
  activeLinkIndex = -1;
  librosFiltradosCount: number = 0;
  librosFiltradosCount1: number = 0;

  constructor(private appRef: ApplicationRef,private bookService: ServiceBookService, private router: Router,  private cdr: ChangeDetectorRef 
    ,private zone: NgZone 
   
    ) {


    
    this.navLinks = [
      {
        label: 'Libros Disponibles',
        link: './opcion1',
        index: 0,
        count$: this.bookService.librosDisponiblesCount$
      }, {
        label: 'Libros Ocupados',
        link: './opcion2',
        index: 1,
        count$: this.bookService.librosFiltradosCount1$
      }
    ];


    // this.bookService.librosDisponibles$.subscribe(disponibles => {
      
      // this.bookService.librosDisponiblesCount$.subscribe(count => {
      //   this.librosDisponiblesCount = count;
      //   this.navLinks[0].label = `Libros Disponibles (${this.librosDisponiblesCount})`;
      //   this.appRef.tick();
        
      // });
    //});
    this.bookService.librosDisponiblesCount$.subscribe((count) => {
      this.librosDisponiblesCount = count;
      this.updateNavLinkLabel(0);
    });

    // this.bookService.selectedBooks$.subscribe(seleccion => {
      
    //   this.bookService.librosFiltradosCount1$.subscribe(count => {
     
    //     this.librosFiltradosCount1 = count;
    //     // Update the label with librosFiltradosCount
    //     this.navLinks[1].label = `Libros Ocupados (${this.librosFiltradosCount1})`;
    //   });
    // });

    this.bookService.librosFiltradosCount1$.subscribe((count) => {
      this.librosFiltradosCount1 = count;
      this.navLinks[1].label = `Libros Ocupados (${this.librosFiltradosCount1})`;
    });
    
  }

  ngOnInit(): void {  

    
  }

  updateNavLinkLabel(index: number) {
    // Actualiza la etiqueta del enlace de navegación correspondiente
    this.navLinks[index].label = `Libros ${
      index === 0 ? 'Disponibles' : 'Ocupados'
    } (${index === 0 ? this.librosDisponiblesCount : this.librosFiltradosCount1})`;
  }



}