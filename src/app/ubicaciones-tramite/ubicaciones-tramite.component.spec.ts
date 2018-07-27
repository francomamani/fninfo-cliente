import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionesTramiteComponent } from './ubicaciones-tramite.component';

describe('UbicacionesTramiteComponent', () => {
  let component: UbicacionesTramiteComponent;
  let fixture: ComponentFixture<UbicacionesTramiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbicacionesTramiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbicacionesTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
