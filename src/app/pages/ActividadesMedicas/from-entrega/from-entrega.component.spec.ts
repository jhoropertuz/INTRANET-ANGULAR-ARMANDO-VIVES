import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromEntregaComponent } from './from-entrega.component';

describe('FromEntregaComponent', () => {
  let component: FromEntregaComponent;
  let fixture: ComponentFixture<FromEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromEntregaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
