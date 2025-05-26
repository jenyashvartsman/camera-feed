import { TestBed } from '@angular/core/testing';

import { CamerasFacadeService } from './cameras-facade.service';

describe('CamerasFacadeService', () => {
  let service: CamerasFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CamerasFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
