import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageIndicatorComponent } from './image-indicator.component';

describe('ImageIndicatorComponent', () => {
  let component: ImageIndicatorComponent;
  let fixture: ComponentFixture<ImageIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageIndicatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
