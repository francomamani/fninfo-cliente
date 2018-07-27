import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionCreateComponent } from './notificacion-create.component';

describe('NotificacionCreateComponent', () => {
  let component: NotificacionCreateComponent;
  let fixture: ComponentFixture<NotificacionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
