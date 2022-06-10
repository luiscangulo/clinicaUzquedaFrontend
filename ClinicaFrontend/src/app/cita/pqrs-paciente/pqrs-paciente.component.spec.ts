import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PqrsPacienteComponent } from './pqrs-paciente.component';

describe('PqrsPacienteComponent', () => {
  let component: PqrsPacienteComponent;
  let fixture: ComponentFixture<PqrsPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PqrsPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PqrsPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
