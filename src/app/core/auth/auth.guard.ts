import { CanActivateFn, Router } from '@angular/router';
import { SessionStateService } from './session-state.service';
import { inject } from '@angular/core';
import { signInRouteConfig } from '../../shared/config/routes.config';

export const authGuard: CanActivateFn = (_route, _state) => {
  const sessionStateService = inject(SessionStateService);

  if (sessionStateService.isUserSignedIn()) {
    return true;
  } else {
    const router = inject(Router);
    return router.createUrlTree([signInRouteConfig]);
  }
};
