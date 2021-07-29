import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRespuestaComponent } from './modal-respuesta.component';

describe('ModalRespuestaComponent', () => {
  let component: ModalRespuestaComponent;
  let fixture: ComponentFixture<ModalRespuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRespuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
