import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  // Default route
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
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
      {
        path: '**',
        redirectTo: 'cameras',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'sign-in',
  },
];
