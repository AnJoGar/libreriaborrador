import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaLecturaComponent } from './lista-lectura.component';

describe('ListaLecturaComponent', () => {
  let component: ListaLecturaComponent;
  let fixture: ComponentFixture<ListaLecturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaLecturaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaLecturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
