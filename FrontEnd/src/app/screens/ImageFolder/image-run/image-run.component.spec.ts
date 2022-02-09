import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageRunComponent } from './image-run.component';

describe('ImageRunComponent', () => {
  let component: ImageRunComponent;
  let fixture: ComponentFixture<ImageRunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageRunComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
