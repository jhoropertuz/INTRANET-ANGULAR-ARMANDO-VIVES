import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquiposFisicosComponent } from './equipos-fisicos.component';

describe('EquiposFisicosComponent', () => {
  let component: EquiposFisicosComponent;
  let fixture: ComponentFixture<EquiposFisicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquiposFisicosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquiposFisicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
