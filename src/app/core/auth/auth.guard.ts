import { CanActivateFn, Router } from '@angular/router';
import { SessionStateService } from './session-state.service';
import { inject } from '@angular/core';
import { signInRouteConfig } from '../../shared/config/routes.config';

/**
 * guard function to protect routes that require authentication
 * It checks if the user is signed in and redirects to the sign-in page if not.
 */
export const authGuard: CanActivateFn = (_route, _state) => {
  const sessionStateService = inject(SessionStateService);

  if (sessionStateService.isUserSignedIn()) {
    return true;
  } else {
    const router = inject(Router);
    return router.createUrlTree([signInRouteConfig]);
  }
};
