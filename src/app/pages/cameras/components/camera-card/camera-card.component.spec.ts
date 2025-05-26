import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraCardComponent } from './camera-card.component';
import { provideHttpClient } from '@angular/common/http';
import { CameraStreamFacadeService } from '../../facade/camera-stream-facade.service';

describe('CameraCardComponent', () => {
  let component: CameraCardComponent;
  let fixture: ComponentFixture<CameraCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CameraCardComponent],
      providers: [provideHttpClient(), CameraStreamFacadeService],
    }).compileComponents();

    fixture = TestBed.createComponent(CameraCardComponent);
    component = fixture.componentInstance;

    component.camera = {
      id: 'camera1',
      name: 'Test Camera',
      primaryStream: {
        id: 'stream1',
      },
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
