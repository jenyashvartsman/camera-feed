import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { SessionFacadeService } from './session-facade.service';
import { provideHttpClient } from '@angular/common/http';
import { SessionService } from '../../api/session/session.service';
import { of, throwError } from 'rxjs';
import { SessionStateService } from './session-state.service';
import { Router } from '@angular/router';
import { dashboardRouteConfig, signInRouteConfig } from '../../shared/config/routes.config';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SessionFacadeService', () => {
  let service: SessionFacadeService;
  let sessionService: SessionService;
  let sessionStateService: SessionStateService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(SessionFacadeService);
    sessionService = TestBed.inject(SessionService);
    sessionStateService = TestBed.inject(SessionStateService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    sessionStateService.setUser(null);
  });

  it('should sign in user', () => {
    spyOn(sessionService, 'signIn').and.returnValue(of({ id: 'ABC123', name: 'John' }));
    spyOn(router, 'navigate');

    service.signIn('admin', '123');

    expect(service.signInLoading()).toBeFalse();
    expect(service.signInError()).toBeNull();
    expect(sessionStateService.user()?.id).toBe('ABC123');
    expect(router.navigate).toHaveBeenCalledWith([dashboardRouteConfig]);
  });

  it('should not sign in user on error', () => {
    spyOn(sessionService, 'signIn').and.callFake(() => throwError(() => ''));
    spyOn(router, 'navigate');

    service.signIn('admin', '123');

    expect(service.signInLoading()).toBeFalse();
    expect(service.signInError()).toBeTruthy();
    expect(sessionStateService.user()).toBeNull();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should sign out user', () => {
    sessionStateService.setUser({ id: '123', name: 'user' });

    spyOn(sessionService, 'signOut').and.returnValue(of(undefined));
    spyOn(router, 'navigate');

    service.signOut();

    expect(sessionService.signOut).toHaveBeenCalledWith('123');
    expect(sessionStateService.user()).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith([signInRouteConfig]);
  });

  it('should not navigate on sign out user error', () => {
    sessionStateService.setUser({ id: '123', name: 'user' });

    spyOn(sessionService, 'signOut').and.callFake(() => throwError(() => ''));
    spyOn(router, 'navigate');

    service.signOut();

    expect(router.navigate).not.toHaveBeenCalledWith([signInRouteConfig]);
  });
});
