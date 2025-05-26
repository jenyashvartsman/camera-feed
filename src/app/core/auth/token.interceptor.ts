import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SessionStateService } from './session-state.service';
import { environment } from '../../../environments/environment';

/**
 * Interceptor to add the Authorization header with the user's token to requests made to the API.
 * It checks if the request URL starts with the API URL and if a user token is available in the session state.
 */
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith(environment.apiUrl)) {
    const sessionStateService = inject(SessionStateService);
    const token = sessionStateService.user()?.id;

    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next(cloned);
    }
  }

  return next(req);
};
