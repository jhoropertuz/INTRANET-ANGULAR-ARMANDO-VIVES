import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgMapaProcesosComponent } from './svg-mapa-procesos.component';

describe('SvgMapaProcesosComponent', () => {
  let component: SvgMapaProcesosComponent;
  let fixture: ComponentFixture<SvgMapaProcesosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgMapaProcesosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgMapaProcesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
