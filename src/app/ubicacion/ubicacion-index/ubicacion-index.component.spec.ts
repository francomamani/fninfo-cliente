import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionIndexComponent } from './ubicacion-index.component';

describe('UbicacionIndexComponent', () => {
  let component: UbicacionIndexComponent;
  let fixture: ComponentFixture<UbicacionIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbicacionIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbicacionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
