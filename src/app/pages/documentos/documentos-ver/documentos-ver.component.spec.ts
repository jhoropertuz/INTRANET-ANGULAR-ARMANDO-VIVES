import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosVerComponent } from './documentos-ver.component';

describe('DocumentosVerComponent', () => {
  let component: DocumentosVerComponent;
  let fixture: ComponentFixture<DocumentosVerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentosVerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
