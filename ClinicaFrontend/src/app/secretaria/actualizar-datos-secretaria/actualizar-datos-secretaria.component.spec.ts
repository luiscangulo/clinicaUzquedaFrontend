import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarDatosSecretariaComponent } from './actualizar-datos-secretaria.component';

describe('ActualizarDatosSecretariaComponent', () => {
  let component: ActualizarDatosSecretariaComponent;
  let fixture: ComponentFixture<ActualizarDatosSecretariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarDatosSecretariaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarDatosSecretariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
