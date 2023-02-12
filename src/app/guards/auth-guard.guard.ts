import { LoggedInService } from './../logged-in.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    private LoggedInService: LoggedInService,
    private router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.LoggedInService.LoggedIn) {
      this.router.navigate(['/auth/login']);
      return false;
    } else {
      return true;
    }
  }
}
