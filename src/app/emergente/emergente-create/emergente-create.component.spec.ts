import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergenteCreateComponent } from './emergente-create.component';

describe('EmergenteCreateComponent', () => {
  let component: EmergenteCreateComponent;
  let fixture: ComponentFixture<EmergenteCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergenteCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergenteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
