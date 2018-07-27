import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenNotificacionComponent } from './imagen-notificacion.component';

describe('ImagenNotificacionComponent', () => {
  let component: ImagenNotificacionComponent;
  let fixture: ComponentFixture<ImagenNotificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagenNotificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenNotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
