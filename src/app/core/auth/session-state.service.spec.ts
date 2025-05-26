import { TestBed } from '@angular/core/testing';

import { SessionStateService } from './session-state.service';

describe('SessionStateService', () => {
  let service: SessionStateService;

  const storageKey = 'camera_feed_session_user';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionStateService);
  });

  it('should set user', () => {
    service.setUser({ id: '123', name: 'John' });

    expect(service.user()!.id).toBe('123');
    const id = JSON.parse(window.localStorage.getItem(storageKey)!)['id'];
    expect(id).toBe('123');

    service.setUser(null);
    expect(service.user()).toBeNull();
    expect(window.localStorage.getItem(storageKey)).toBeNull();
  });

  it('should return if user is signed in', () => {
    service.setUser({ id: '123', name: 'John' });
    expect(service.isUserSignedIn()).toBeTrue();

    service.setUser(null);
    expect(service.isUserSignedIn()).toBeFalse();
  });
});
