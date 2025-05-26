import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SessionStateService } from './session-state.service';
import { environment } from '../../../environments/environment';

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
