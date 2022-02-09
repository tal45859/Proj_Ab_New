import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPosthomeComponent } from './add-posthome.component';

describe('AddPosthomeComponent', () => {
  let component: AddPosthomeComponent;
  let fixture: ComponentFixture<AddPosthomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPosthomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPosthomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
