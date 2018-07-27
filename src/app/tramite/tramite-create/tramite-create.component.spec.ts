import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TramiteCreateComponent } from './tramite-create.component';

describe('TramiteCreateComponent', () => {
  let component: TramiteCreateComponent;
  let fixture: ComponentFixture<TramiteCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TramiteCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TramiteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
