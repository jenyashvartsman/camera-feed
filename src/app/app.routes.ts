import { Routes } from '@angular/router';

export const routes: Routes = [
  // Authentication routes
  {
    path: 'sign-in',
    loadComponent: () => import('./pages/sign-in/sign-in.component').then((c) => c.SignInComponent),
  },
  // Secure routes
  {
    path: 'dashboard',
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
