import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoCreateComponent } from './paso-create.component';

describe('PasoCreateComponent', () => {
  let component: PasoCreateComponent;
  let fixture: ComponentFixture<PasoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasoCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
