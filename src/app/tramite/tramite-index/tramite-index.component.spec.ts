import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TramiteIndexComponent } from './tramite-index.component';

describe('TramiteIndexComponent', () => {
  let component: TramiteIndexComponent;
  let fixture: ComponentFixture<TramiteIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TramiteIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TramiteIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
