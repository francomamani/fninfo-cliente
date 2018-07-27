import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaUbicacionCreateComponent } from './categoria-ubicacion-create.component';

describe('CategoriaUbicacionCreateComponent', () => {
  let component: CategoriaUbicacionCreateComponent;
  let fixture: ComponentFixture<CategoriaUbicacionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaUbicacionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaUbicacionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
