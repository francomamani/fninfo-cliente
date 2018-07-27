import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeDialogComponent } from './mensaje-dialog.component';

describe('MensajeDialogComponent', () => {
  let component: MensajeDialogComponent;
  let fixture: ComponentFixture<MensajeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensajeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
