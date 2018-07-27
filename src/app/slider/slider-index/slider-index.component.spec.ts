import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderIndexComponent } from './slider-index.component';

describe('SliderIndexComponent', () => {
  let component: SliderIndexComponent;
  let fixture: ComponentFixture<SliderIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
