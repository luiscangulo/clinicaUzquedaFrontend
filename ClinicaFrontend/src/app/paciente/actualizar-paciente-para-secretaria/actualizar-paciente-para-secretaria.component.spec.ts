import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarPacienteParaSecretariaComponent } from './actualizar-paciente-para-secretaria.component';

describe('ActualizarPacienteParaSecretariaComponent', () => {
  let component: ActualizarPacienteParaSecretariaComponent;
  let fixture: ComponentFixture<ActualizarPacienteParaSecretariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarPacienteParaSecretariaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarPacienteParaSecretariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
