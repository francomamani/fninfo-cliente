import { TestBed, inject } from '@angular/core/testing';

import { PasoService } from './paso.service';

describe('PasoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PasoService]
    });
  });

  it('should be created', inject([PasoService], (service: PasoService) => {
    expect(service).toBeTruthy();
  }));
});
