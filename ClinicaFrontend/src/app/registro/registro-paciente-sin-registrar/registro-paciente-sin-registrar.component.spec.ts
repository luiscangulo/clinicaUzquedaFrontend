import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPacienteSinRegistrarComponent } from './registro-paciente-sin-registrar.component';

describe('RegistroPacienteSinRegistrarComponent', () => {
  let component: RegistroPacienteSinRegistrarComponent;
  let fixture: ComponentFixture<RegistroPacienteSinRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroPacienteSinRegistrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPacienteSinRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
