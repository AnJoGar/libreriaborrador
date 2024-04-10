import { Component, Input, Output, EventEmitter } from '@angular/core';
import{ModelBook} from '../../Models/model-book';
import{ServiceBookService} from '../../Services/service-book.service'  
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-filtro-libros',
  templateUrl: './filtro-libros.component.html',
  styleUrls: ['./filtro-libros.component.css']
})
export class FiltroLibrosComponent {



  @Input() genero: string[] = []; 
  @Input() filtroGenero: string | undefined;
  @Output() filtroGeneroChange = new EventEmitter<string>();
  
  constructor(private bookService: ServiceBookService) {}
  ngOnInit(): void {
    this.filtroGenero = '';
  }

  onGeneroChange(): void {
    this.filtroGeneroChange.emit(this.filtroGenero);
    console.log("Cambio de género:", this.filtroGenero);
  }

}
