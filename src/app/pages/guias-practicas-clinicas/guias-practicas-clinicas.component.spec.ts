import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiasPracticasClinicasComponent } from './guias-practicas-clinicas.component';

describe('GuiasPracticasClinicasComponent', () => {
  let component: GuiasPracticasClinicasComponent;
  let fixture: ComponentFixture<GuiasPracticasClinicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuiasPracticasClinicasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiasPracticasClinicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
