import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaCarpetaComponent } from './nueva-carpeta.component';

describe('NuevaCarpetaComponent', () => {
  let component: NuevaCarpetaComponent;
  let fixture: ComponentFixture<NuevaCarpetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaCarpetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaCarpetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
