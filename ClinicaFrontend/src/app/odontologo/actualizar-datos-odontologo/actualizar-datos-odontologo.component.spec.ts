import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarDatosOdontologoComponent } from './actualizar-datos-odontologo.component';

describe('ActualizarDatosOdontologoComponent', () => {
  let component: ActualizarDatosOdontologoComponent;
  let fixture: ComponentFixture<ActualizarDatosOdontologoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarDatosOdontologoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarDatosOdontologoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
