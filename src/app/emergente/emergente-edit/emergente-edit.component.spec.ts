import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergenteEditComponent } from './emergente-edit.component';

describe('EmergenteEditComponent', () => {
  let component: EmergenteEditComponent;
  let fixture: ComponentFixture<EmergenteEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergenteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergenteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
