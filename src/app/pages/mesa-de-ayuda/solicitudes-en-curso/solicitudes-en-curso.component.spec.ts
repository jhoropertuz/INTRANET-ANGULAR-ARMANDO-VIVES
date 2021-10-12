import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesEnCursoComponent } from './solicitudes-en-curso.component';

describe('SolicitudesEnCursoComponent', () => {
  let component: SolicitudesEnCursoComponent;
  let fixture: ComponentFixture<SolicitudesEnCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudesEnCursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesEnCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
