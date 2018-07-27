import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoIndexComponent } from './paso-index.component';

describe('PasoIndexComponent', () => {
  let component: PasoIndexComponent;
  let fixture: ComponentFixture<PasoIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasoIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
