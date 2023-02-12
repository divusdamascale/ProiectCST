import { AppGuardGuard } from './guards/app-guard.guard';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { redirectTo: 'auth', path: '', pathMatch: 'full' },
  {
    path: 'main',
    loadChildren: () =>
      import('./main/main-routing.module').then((m) => m.MainRoutingModule),
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth-routing.module').then((m) => m.AuthRoutingModule),
    canActivate: [AppGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
