import { TestBed, inject } from '@angular/core/testing';

import { ImagenNotificacionService } from './imagen-notificacion.service';

describe('ImagenNotificacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImagenNotificacionService]
    });
  });

  it('should be created', inject([ImagenNotificacionService], (service: ImagenNotificacionService) => {
    expect(service).toBeTruthy();
  }));
});
