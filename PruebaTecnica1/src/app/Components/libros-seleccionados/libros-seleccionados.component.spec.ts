import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosSeleccionadosComponent } from './libros-seleccionados.component';

describe('LibrosSeleccionadosComponent', () => {
  let component: LibrosSeleccionadosComponent;
  let fixture: ComponentFixture<LibrosSeleccionadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibrosSeleccionadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibrosSeleccionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
