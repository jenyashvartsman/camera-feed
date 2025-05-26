import { TestBed } from '@angular/core/testing';

import { CameraStreamFacadeService } from './camera-stream-facade.service';
import { provideHttpClient } from '@angular/common/http';
import { StreamsService } from '../../../api/streams/streams.service';
import { of, throwError } from 'rxjs';

describe('CameraStreamFacadeService', () => {
  let service: CameraStreamFacadeService;
  let streamsService: StreamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CameraStreamFacadeService, provideHttpClient()],
    });
    service = TestBed.inject(CameraStreamFacadeService);
    streamsService = TestBed.inject(StreamsService);
  });

  it('should start stream refresh', () => {
    spyOn(streamsService, 'getFrame').and.returnValue(of(new Blob()));
    const id = 'stream1';
    service.streamRefresh(id);
    expect(streamsService.getFrame).toHaveBeenCalledWith(id, 400, 400);
    expect(service.loading()).toBeFalse();
    expect(service.error()).toBeFalse();
    expect(service.stream()).toBeTruthy();
  });

  it('should handle stream loading errors', () => {
    spyOn(streamsService, 'getFrame').and.callFake(() => throwError(() => ''));
    const id = 'stream1';
    service.streamRefresh(id);
    expect(service.loading()).toBeFalse();
    expect(service.error()).toBeTrue();
    expect(service.stream()).toBeNull();
  });
});
