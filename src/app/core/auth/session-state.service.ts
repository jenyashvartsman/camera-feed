import { Injectable, Signal, signal } from '@angular/core';
import { UserDto } from './user.dto';

/**
 * SessionStateService manages the state of the user session.
 * It provides methods to get and set the current user.
 */
@Injectable({
  providedIn: 'root',
})
export class SessionStateService {
  private readonly _user = signal<UserDto | null>(null);

  private readonly storageKey = 'camera_feed_session_user';

  constructor() {
    // Load the user from localStorage if it exists
    const storedUser = localStorage.getItem(this.storageKey);
    if (storedUser) {
      this._user.set(JSON.parse(storedUser));
    }
  }

  /**
   * Returns a readonly signal of the current user.
   * @returns {UserDto} A Signal that emits the current UserDto or null if no user is signed in.
   */
  get user(): Signal<UserDto | null> {
    return this._user.asReadonly();
  }

  /**
   * Sets the current user in the session state.
   * @param {UserDto} user - set as the current user, or null to clear the session.
   */
  setUser(user: UserDto | null): void {
    this._user.set(user);

    // Store the user in localStorage for persistence
    if (user) {
      localStorage.setItem(this.storageKey, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.storageKey);
    }
  }

  /**
   * Checks if a user is currently signed in (dummy).
   * @returns {boolean} True if a user is signed in, false otherwise.
   */
  isUserSignedIn(): boolean {
    return !!this._user();
  }
}
