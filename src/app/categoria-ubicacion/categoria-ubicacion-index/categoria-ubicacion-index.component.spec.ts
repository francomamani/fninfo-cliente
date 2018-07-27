import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaUbicacionIndexComponent } from './categoria-ubicacion-index.component';

describe('CategoriaUbicacionIndexComponent', () => {
  let component: CategoriaUbicacionIndexComponent;
  let fixture: ComponentFixture<CategoriaUbicacionIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaUbicacionIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaUbicacionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
