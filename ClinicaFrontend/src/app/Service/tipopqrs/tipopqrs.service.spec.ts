import { TestBed } from '@angular/core/testing';

import { TipopqrsService } from './tipopqrs.service';

describe('TipopqrsService', () => {
  let service: TipopqrsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipopqrsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
