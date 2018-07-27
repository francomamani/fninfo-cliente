import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergenteIndexComponent } from './emergente-index.component';

describe('EmergenteIndexComponent', () => {
  let component: EmergenteIndexComponent;
  let fixture: ComponentFixture<EmergenteIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergenteIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergenteIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
