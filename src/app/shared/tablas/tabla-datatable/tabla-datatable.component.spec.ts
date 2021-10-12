import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaDatatableComponent } from './tabla-datatable.component';

describe('TablaDatatableComponent', () => {
  let component: TablaDatatableComponent;
  let fixture: ComponentFixture<TablaDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaDatatableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
