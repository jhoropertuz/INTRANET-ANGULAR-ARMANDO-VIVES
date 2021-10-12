import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidadorDeColaboradorComponent } from './validador-de-colaborador.component';

describe('ValidadorDeColaboradorComponent', () => {
  let component: ValidadorDeColaboradorComponent;
  let fixture: ComponentFixture<ValidadorDeColaboradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidadorDeColaboradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidadorDeColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
