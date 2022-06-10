import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroHomeComponent } from './registro-home.component';

describe('RegistroHomeComponent', () => {
  let component: RegistroHomeComponent;
  let fixture: ComponentFixture<RegistroHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
