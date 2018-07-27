import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionMapComponent } from './ubicacion-map.component';

describe('UbicacionMapComponent', () => {
  let component: UbicacionMapComponent;
  let fixture: ComponentFixture<UbicacionMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbicacionMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbicacionMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
