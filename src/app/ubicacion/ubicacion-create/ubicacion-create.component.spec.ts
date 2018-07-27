import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionCreateComponent } from './ubicacion-create.component';

describe('UbicacionCreateComponent', () => {
  let component: UbicacionCreateComponent;
  let fixture: ComponentFixture<UbicacionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbicacionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbicacionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
