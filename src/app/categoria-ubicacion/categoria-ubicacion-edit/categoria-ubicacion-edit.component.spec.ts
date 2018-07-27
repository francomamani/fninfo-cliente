import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaUbicacionEditComponent } from './categoria-ubicacion-edit.component';

describe('CategoriaUbicacionEditComponent', () => {
  let component: CategoriaUbicacionEditComponent;
  let fixture: ComponentFixture<CategoriaUbicacionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaUbicacionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaUbicacionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
