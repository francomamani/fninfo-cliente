import { TestBed, inject } from '@angular/core/testing';

import { EmergenteService } from './emergente.service';

describe('EmergenteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmergenteService]
    });
  });

  it('should be created', inject([EmergenteService], (service: EmergenteService) => {
    expect(service).toBeTruthy();
  }));
});
