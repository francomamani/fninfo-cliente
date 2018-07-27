import { TestBed, inject } from '@angular/core/testing';

import { TramiteService } from './tramite.service';

describe('TramiteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TramiteService]
    });
  });

  it('should be created', inject([TramiteService], (service: TramiteService) => {
    expect(service).toBeTruthy();
  }));
});
