import { TestBed } from '@angular/core/testing';

import { PenalizacionesService } from './penalizaciones.service';

describe('PenalizacionesService', () => {
  let service: PenalizacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PenalizacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
