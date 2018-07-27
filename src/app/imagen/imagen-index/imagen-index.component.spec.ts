import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenIndexComponent } from './imagen-index.component';

describe('ImagenIndexComponent', () => {
  let component: ImagenIndexComponent;
  let fixture: ComponentFixture<ImagenIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagenIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
