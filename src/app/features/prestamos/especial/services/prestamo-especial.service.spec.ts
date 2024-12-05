import { TestBed } from '@angular/core/testing';

import { PrestamoEspecialService } from './prestamo-especial.service';

describe('PrestamoEspecialService', () => {
  let service: PrestamoEspecialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestamoEspecialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
