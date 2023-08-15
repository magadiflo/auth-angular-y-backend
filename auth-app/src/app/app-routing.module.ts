import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { isAuthenticatedMatchGuard } from './auth/guards/is-authenticated-match.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canMatch: [isAuthenticatedMatchGuard],
  },
  { path: '**', redirectTo: 'auth', },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
