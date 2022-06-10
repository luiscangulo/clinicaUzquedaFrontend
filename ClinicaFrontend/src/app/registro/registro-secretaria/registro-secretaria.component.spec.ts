import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroSecretariaComponent } from './registro-secretaria.component';

describe('RegistroSecretariaComponent', () => {
  let component: RegistroSecretariaComponent;
  let fixture: ComponentFixture<RegistroSecretariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroSecretariaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroSecretariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
