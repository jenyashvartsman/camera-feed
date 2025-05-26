import { Injectable, Signal, signal } from '@angular/core';
import { SessionService } from '../../api/session/session.service';
import { SessionStateService } from './session-state.service';
import { Router } from '@angular/router';
import { dashboardRouteConfig, signInRouteConfig } from '../../shared/config/routes.config';

/**
 * SessionFacadeService provides a simplified interface for session management,
 * encapsulating the logic for signing in and signing out users.
 **/
@Injectable({
  providedIn: 'root',
})
export class SessionFacadeService {
  private readonly _signInLoading = signal(false);
  private readonly _signInError = signal<string | null>(null);

  get signInLoading(): Signal<boolean> {
    return this._signInLoading.asReadonly();
  }

  get signInError(): Signal<string | null> {
    return this._signInError.asReadonly();
  }

  constructor(
    private sessionService: SessionService,
    private sessionStateService: SessionStateService,
    private router: Router,
  ) {}

  /**
   * Returns a readonly signal indicating whether a session operation is in progress.
   * @param {string} username - The username of the user attempting to sign in.
   * @param {string} password - The password of the user attempting to sign in.
   */
  signIn(username: string, password: string): void {
    this._signInLoading.set(true);
    this._signInError.set(null);

    this.sessionService.signIn({ username, password }).subscribe({
      next: (response) => {
        this._signInLoading.set(false);
        this._signInError.set(null);
        this.sessionStateService.setUser(response);
        this.router.navigate([dashboardRouteConfig]);
      },
      error: (error) => {
        this._signInLoading.set(false);

        if (error.status === 401) {
          this._signInError.set('Invalid username or password.');
        } else {
          this._signInError.set('An unexpected error occurred. Please try again later.');
        }

        // Reset the user state if sign-in fails
        // This ensures that the application does not retain an invalid user state
        if (this.sessionStateService.user()) {
          this.sessionStateService.setUser(null);
        }
      },
    });
  }

  /**
   * Signs out the current user if they are signed in.
   * */
  signOut(): void {
    const user = this.sessionStateService.user();
    if (user?.id) {
      this.sessionService.signOut(user!.id).subscribe({
        next: () => {
          this.sessionStateService.setUser(null);
          this.router.navigate([signInRouteConfig]);
        },
        error: (error) => {
          console.error('Sign out failed', error);
        },
      });
    } else {
      console.warn('No user is currently signed in.');
    }
  }
}
