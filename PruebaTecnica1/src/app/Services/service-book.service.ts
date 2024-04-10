import { Injectable } from '@angular/core';

import { ModelBook } from '../../app/Models/model-book';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable,throwError,of  } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { NgZone } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ServiceBookService {

  private availableBooks: ModelBook[] = [];
  private librosDisponibles: ModelBook[] = [];
  private selectedBooks: ModelBook[] = [];
  private selectedGenero: String | undefined;
  private librosDisponiblesSubject = new BehaviorSubject<ModelBook[]>([]);
  private selectedBooksSubject = new BehaviorSubject<ModelBook[]>([]);
  selectedBooks$ = this.selectedBooksSubject.asObservable();
  getAvailableBooks(): ModelBook[] {
    
    return this.librosDisponibles;
  }
  constructor(private http: HttpClient,  private zone: NgZone) {
    
    const storedLibrosDisponibles = localStorage.getItem('librosDisponibles');
    if (storedLibrosDisponibles) {
      this.librosDisponibles = JSON.parse(storedLibrosDisponibles);
      this.librosDisponiblesSubject.next([...this.librosDisponibles]);
    }

 

    const storedSelectedBooks = localStorage.getItem('selectedBooks');
    if (storedSelectedBooks) {
      this.selectedBooks = JSON.parse(storedSelectedBooks);
      this.selectedBooksSubject.next([...this.selectedBooks]);
    }


    if (this.librosDisponibles.length === 0) {
      this.librosDisponibles = this.availableBooks;
      this.librosDisponiblesSubject.next([...this.librosDisponibles]);
    }

    // Set the initial count for librosFiltradosCountSource
    const initialCount = this.librosDisponibles.length;
    this.librosFiltradosCountSource.next(initialCount);


    if (this.selectedBooks.length === 0) {
      this.selectedBooks = this.availableBooks;
      this.selectedBooksSubject.next([...this.selectedBooks]);
    }

    // Set the initial count for librosFiltradosCountSource
    const initialCount1 = this.selectedBooks.length;
    this.librosFiltradosCountSource1.next(initialCount1);



  }

public metodo(){



  if (this.librosDisponibles.length === 0) {
    this.librosDisponibles = this.availableBooks;
    this.librosDisponiblesSubject.next([...this.librosDisponibles]);
  }

  // Set the initial count for librosFiltradosCountSource
  const initialCount = this.librosDisponibles.length;
  this.librosFiltradosCountSource.next(initialCount);

}

public metodo1(){



  if (this.selectBook.length === 0) {
    this.selectedBooks = this.availableBooks;
    this.selectedBooksSubject.next([...this.selectedBooks]);
  }

  // Set the initial count for librosFiltradosCountSource
  const filteredCount  = this.selectedBooks.length;
  this.librosFiltradosCountSource1.next(filteredCount );

}
  public loadBooksData(): Observable<any> {
    return this.http.get<any>('../../assets/products.json').pipe(
      tap((data: any) => {
        this.availableBooks = data.products.map((bookData: any) => {
          return {
            book: {
              title: bookData.book.title,
              pages: bookData.book.pages,
              genre: bookData.book.genre,
              cover: bookData.book.cover,
              synopsis: bookData.book.synopsis,
              year: bookData.book.year,
              ISBN: bookData.book.ISBN,
              author: {
                name: bookData.book.author.name,
                otherBooks: bookData.book.author.otherBooks
              }
            }
          } as ModelBook;

          
        });
    

        if (this.librosDisponibles.length === 0) {
          this.librosDisponibles = this.availableBooks;
          this.librosDisponiblesSubject.next([...this.librosDisponibles]);
      
        }
        
       
      
      }),
      catchError(error => {
        console.error('Error loading books data', error);
        return throwError(error);
      })

    );

  }
 
  
  loadSelectedBooks(): void {
    const storedSelectedBooks = localStorage.getItem('selectedBooks');
    if (storedSelectedBooks) {
      const selectedBooks = JSON.parse(storedSelectedBooks);
      this.selectedBooksSubject.next([...selectedBooks]);
    }
  }
  public getUniqueGenres(): string[] {
    // Extract unique genres from the available books
    // Obtén todos los géneros de los libros
    const allGenres = this.availableBooks.map(book => book.book.genre);

    // Utiliza un conjunto (Set) para obtener valores únicos
    const uniqueGenresSet = new Set(allGenres);

    // Convierte el conjunto de nuevo a un array
    const uniqueGenresArray = Array.from(uniqueGenresSet);

    return uniqueGenresArray;
  }
  public getUniqueGenresSeleccionados(): string[] {
    // Extract unique genres from the available books
    // Obtén todos los géneros de los libros
    const allGenres = this.availableBooks.map(book => book.book.genre);

    // Utiliza un conjunto (Set) para obtener valores únicos
    const uniqueGenresSet = new Set(allGenres);

    // Convierte el conjunto de nuevo a un array
    const uniqueGenresArray = Array.from(uniqueGenresSet);

    return uniqueGenresArray;
  }


  public filtroPagina(minPaginas: number, maxPaginas: number): ModelBook[]{
    const librosFiltrados = this.librosDisponibles.filter(
      (book) => book.book.pages >= minPaginas && book.book.pages <= maxPaginas
    );
  
    return librosFiltrados;
  }
  public filtroPaginaSeleccionados(minPaginas: number, maxPaginas: number): ModelBook[]{
    const librosFiltrados = this.selectedBooks.filter(
      (book) => book.book.pages >= minPaginas && book.book.pages <= maxPaginas
    );
  
    return librosFiltrados;
  }
  selectBook(book: ModelBook) {
    const selectedBooks = this.selectedBooksSubject.value;
    selectedBooks.push(book);
    this.selectedBooks = selectedBooks;
  //  this.saveSelectedBooks(selectedBooks);
    this.librosDisponibles = this.librosDisponibles.filter(b => b !== book); 
    this.librosDisponiblesSubject.next([...this.librosDisponibles]); // Asegúrate de que se emita una nueva referencia del array
  
    this.selectedBooksSubject.next([...selectedBooks]); 
    this.saveLibrosDisponiblesToLocalStorage();
    this.saveLibrosSeleccionadosToLocalStorage();
  
  
  }


  removeBook(book: ModelBook) {
    const selectedBooks = this.selectedBooksSubject.value.filter(b => b !== book);
    this.selectedBooksSubject.next(selectedBooks);
    this.librosDisponibles.unshift(book);

    this.selectedBooks = selectedBooks;
    // Notificar cambios en librosDisponibles
    this.librosDisponiblesSubject.next([...this.librosDisponibles]);
   // this.saveSelectedBooks(selectedBooks);
    this.saveLibrosDisponiblesToLocalStorage();
    this.saveLibrosSeleccionadosToLocalStorage();
  }

  private saveLibrosDisponiblesToLocalStorage() {
    localStorage.setItem('librosDisponibles', JSON.stringify(this.librosDisponibles));
  }

  private saveLibrosSeleccionadosToLocalStorage() {
    localStorage.setItem('selectedBooks', JSON.stringify(this.selectedBooks));
  }
   get librosDisponibles$(): Observable<ModelBook[]> {
    return this.librosDisponiblesSubject.asObservable();
  }

  get selectedBook$(): Observable<ModelBook[]> {
    return this.selectedBooksSubject.asObservable();
  }
   getSelectedBooks(): ModelBook[] {
     return this.selectedBooksSubject.value;
   }




  
  private librosFiltradosCountSource = new BehaviorSubject<number>(0);
  
  librosDisponiblesCount$ = this.librosFiltradosCountSource.asObservable();


  setLibrosFiltradosCount(count: number, selectedGenre: string | null): void {
    if (count >= 0) {
      const filteredBooks = this.librosDisponibles.filter(book =>
        (selectedGenre ? (book.book.genre === selectedGenre) : true)
      );
  
      const filteredCount = filteredBooks.length;
  
      this.librosFiltradosCountSource.next(filteredCount);

    } else {
      this.librosFiltradosCountSource.next(6);
    }
  }
  private librosFiltradosCountSource1 = new BehaviorSubject<number>(0);
  librosFiltradosCount1$ = this.librosFiltradosCountSource1.asObservable();

  setLibrosFiltradosCountSel(count: number, selectedGenre: string | null): void {
    if (count >= 0) {
      const filteredBooks = this.selectedBooks.filter(book =>
        (selectedGenre ? (book.book.genre === selectedGenre) : true)
      );
  
      const filteredCount = filteredBooks.length;
  
      this.librosFiltradosCountSource1.next(filteredCount);
    } else {
      this.librosFiltradosCountSource1.next(this.selectedBooks.length);
    }
  }


}
