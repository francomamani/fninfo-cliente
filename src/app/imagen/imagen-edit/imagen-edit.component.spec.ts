import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenEditComponent } from './imagen-edit.component';

describe('ImagenEditComponent', () => {
  let component: ImagenEditComponent;
  let fixture: ComponentFixture<ImagenEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagenEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
