import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import{ServiceBookService} from '../app/Services/service-book.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PruebaTecnica1';
  opcion: number = 1; 

  constructor(private servicio: ServiceBookService) {}

}
