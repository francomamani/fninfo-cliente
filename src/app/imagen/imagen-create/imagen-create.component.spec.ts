import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenCreateComponent } from './imagen-create.component';

describe('ImagenCreateComponent', () => {
  let component: ImagenCreateComponent;
  let fixture: ComponentFixture<ImagenCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagenCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
