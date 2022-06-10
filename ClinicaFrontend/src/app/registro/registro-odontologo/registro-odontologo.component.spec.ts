import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroOdontologoComponent } from './registro-odontologo.component';

describe('RegistroOdontologoComponent', () => {
  let component: RegistroOdontologoComponent;
  let fixture: ComponentFixture<RegistroOdontologoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroOdontologoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroOdontologoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
