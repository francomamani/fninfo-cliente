import { TestBed, inject } from '@angular/core/testing';

import { CategoriaUbicacionService } from './categoria-ubicacion.service';

describe('CategoriaUbicacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoriaUbicacionService]
    });
  });

  it('should be created', inject([CategoriaUbicacionService], (service: CategoriaUbicacionService) => {
    expect(service).toBeTruthy();
  }));
});
