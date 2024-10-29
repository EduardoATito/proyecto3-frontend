import { TestBed } from '@angular/core/testing';

import { PrestamoRegularService } from './prestamo-regular.service';

describe('PrestamoRegularService', () => {
  let service: PrestamoRegularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestamoRegularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
