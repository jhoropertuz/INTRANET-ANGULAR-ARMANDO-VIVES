import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesaDeAyudaComponent } from './mesa-de-ayuda.component';

describe('MesaDeAyudaComponent', () => {
  let component: MesaDeAyudaComponent;
  let fixture: ComponentFixture<MesaDeAyudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesaDeAyudaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesaDeAyudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
