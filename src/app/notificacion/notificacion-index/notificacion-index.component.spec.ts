import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionIndexComponent } from './notificacion-index.component';

describe('NotificacionIndexComponent', () => {
  let component: NotificacionIndexComponent;
  let fixture: ComponentFixture<NotificacionIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacionIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
