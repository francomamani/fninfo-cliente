import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoEditComponent } from './paso-edit.component';

describe('PasoEditComponent', () => {
  let component: PasoEditComponent;
  let fixture: ComponentFixture<PasoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
