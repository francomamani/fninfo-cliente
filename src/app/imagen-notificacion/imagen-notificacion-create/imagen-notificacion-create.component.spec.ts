import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenNotificacionCreateComponent } from './imagen-notificacion-create.component';

describe('ImagenNotificacionCreateComponent', () => {
  let component: ImagenNotificacionCreateComponent;
  let fixture: ComponentFixture<ImagenNotificacionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagenNotificacionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenNotificacionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
