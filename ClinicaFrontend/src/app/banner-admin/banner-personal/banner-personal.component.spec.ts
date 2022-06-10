import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerPersonalComponent } from './banner-personal.component';

describe('BannerPersonalComponent', () => {
  let component: BannerPersonalComponent;
  let fixture: ComponentFixture<BannerPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
