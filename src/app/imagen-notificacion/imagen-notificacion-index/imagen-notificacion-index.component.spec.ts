import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenNotificacionIndexComponent } from './imagen-notificacion-index.component';

describe('ImagenNotificacionIndexComponent', () => {
  let component: ImagenNotificacionIndexComponent;
  let fixture: ComponentFixture<ImagenNotificacionIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagenNotificacionIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenNotificacionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
