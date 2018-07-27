import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenNotificacionEditComponent } from './imagen-notificacion-edit.component';

describe('ImagenNotificacionEditComponent', () => {
  let component: ImagenNotificacionEditComponent;
  let fixture: ComponentFixture<ImagenNotificacionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagenNotificacionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenNotificacionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
