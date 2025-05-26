import { TestBed } from '@angular/core/testing';

import { CamerasFacadeService } from './cameras-facade.service';
import { provideHttpClient } from '@angular/common/http';
import { CamerasService } from '../../../api/cameras/cameras.service';
import { of, throwError } from 'rxjs';
import { CamerasWrapper } from '../../../api/cameras/dto/cameras.dto';

describe('CamerasFacadeService', () => {
  let service: CamerasFacadeService;
  let camerasService: CamerasService;

  const cameras: CamerasWrapper = {
    cameras: [{ id: '1', name: 'Camera 1', primaryStream: { id: 'stream1' } }],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CamerasFacadeService, provideHttpClient()],
    });
    service = TestBed.inject(CamerasFacadeService);
    camerasService = TestBed.inject(CamerasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load cameras', () => {
    spyOn(camerasService, 'getAll').and.returnValue(of(cameras));
    service.loadCameras();
    expect(service.loading()).toBeFalse();
    expect(service.error()).toBeFalse();
    expect(service.cameras()).toEqual(cameras);
  });

  it('should handle loading errors', () => {
    spyOn(camerasService, 'getAll').and.callFake(() => throwError(() => ''));
    service.loadCameras();
    expect(service.loading()).toBeFalse();
    expect(service.error()).toBeTrue();
    expect(service.cameras()).toEqual({ cameras: [] });
  });
});
