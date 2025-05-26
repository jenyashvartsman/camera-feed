import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraCardComponent } from './camera-card.component';

describe('CameraCardComponent', () => {
  let component: CameraCardComponent;
  let fixture: ComponentFixture<CameraCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CameraCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CameraCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
