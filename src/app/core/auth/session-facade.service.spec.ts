import { TestBed } from '@angular/core/testing';

import { SessionFacadeService } from './session-facade.service';
import { provideHttpClient } from '@angular/common/http';

describe('SessionFacadeService', () => {
  let service: SessionFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(SessionFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
