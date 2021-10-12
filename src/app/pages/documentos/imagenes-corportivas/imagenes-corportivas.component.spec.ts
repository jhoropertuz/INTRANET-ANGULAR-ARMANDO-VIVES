import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenesCorportivasComponent } from './imagenes-corportivas.component';

describe('ImagenesCorportivasComponent', () => {
  let component: ImagenesCorportivasComponent;
  let fixture: ComponentFixture<ImagenesCorportivasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagenesCorportivasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenesCorportivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
