import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionEditComponent } from './ubicacion-edit.component';

describe('UbicacionEditComponent', () => {
  let component: UbicacionEditComponent;
  let fixture: ComponentFixture<UbicacionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbicacionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbicacionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
