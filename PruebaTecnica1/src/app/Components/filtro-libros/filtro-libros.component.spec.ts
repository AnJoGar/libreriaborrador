import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroLibrosComponent } from './filtro-libros.component';

describe('FiltroLibrosComponent', () => {
  let component: FiltroLibrosComponent;
  let fixture: ComponentFixture<FiltroLibrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroLibrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
