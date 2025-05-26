import { TestBed } from '@angular/core/testing';

import { CameraStreamFacadeService } from './camera-stream-facade.service';

describe('CameraStreamFacadeService', () => {
  let service: CameraStreamFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CameraStreamFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
