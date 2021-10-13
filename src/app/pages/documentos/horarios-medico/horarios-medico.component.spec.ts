import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariosMedicoComponent } from './horarios-medico.component';

describe('HorariosMedicoComponent', () => {
  let component: HorariosMedicoComponent;
  let fixture: ComponentFixture<HorariosMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorariosMedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorariosMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
