import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { signInRouteConfig } from '../../shared/config/routes.config';
import { environment } from '../../../environments/environment';
import { SessionStateService } from './session-state.service';

/**
 * Interceptor to handle authentication errors globally.
 * If a request returns a 401 Unauthorized error,
 * it clears the user state and redirects to the sign-in page.
 * */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const sessionStateService = inject(SessionStateService);

  return next(req).pipe(
    catchError((error) => {
      if (req.url.startsWith(environment.apiUrl) && error.status === 401) {
        sessionStateService.setUser(null); // Clear user state on 401
        router.navigate([signInRouteConfig]);
      }
      return throwError(() => error);
    }),
  );
};
