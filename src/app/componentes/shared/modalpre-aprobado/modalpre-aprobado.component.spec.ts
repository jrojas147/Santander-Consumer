import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalpreAprobadoComponent } from './modalpre-aprobado.component';

describe('ModalpreAprobadoComponent', () => {
  let component: ModalpreAprobadoComponent;
  let fixture: ComponentFixture<ModalpreAprobadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalpreAprobadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalpreAprobadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
