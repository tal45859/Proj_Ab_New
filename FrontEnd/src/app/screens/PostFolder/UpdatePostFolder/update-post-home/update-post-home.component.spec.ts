import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePostHomeComponent } from './update-post-home.component';

describe('UpdatePostHomeComponent', () => {
  let component: UpdatePostHomeComponent;
  let fixture: ComponentFixture<UpdatePostHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePostHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePostHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
