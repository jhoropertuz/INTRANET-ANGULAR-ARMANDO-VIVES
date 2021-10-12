import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarSolicitudesComponent } from './gestionar-solicitudes.component';

describe('GestionarSolicitudesComponent', () => {
  let component: GestionarSolicitudesComponent;
  let fixture: ComponentFixture<GestionarSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarSolicitudesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
