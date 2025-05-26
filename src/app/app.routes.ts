import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  // Authentication routes
  {
    path: 'sign-in',
    loadComponent: () => import('./pages/sign-in/sign-in.component').then((c) => c.SignInComponent),
  },
  // Secure routes
  {
    path: 'dashboard',
    loadComponent: () => import('./core/layout/layout.component').then((c) => c.LayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cameras',
      },
      {
        path: 'cameras',
        loadComponent: () =>
          import('./pages/cameras/cameras.component').then((c) => c.CamerasComponent),
      },
      // Fallback route
      {
        path: '**',
        redirectTo: 'cameras',
      },
    ],
  },
  // Fallback route
  {
    path: '**',
    redirectTo: 'sign-in',
  },
];
