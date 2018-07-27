import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaUbicacionComponent } from './categoria-ubicacion.component';

describe('CategoriaUbicacionComponent', () => {
  let component: CategoriaUbicacionComponent;
  let fixture: ComponentFixture<CategoriaUbicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaUbicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
