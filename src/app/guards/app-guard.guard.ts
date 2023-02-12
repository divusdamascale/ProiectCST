import { LoggedInService } from './../logged-in.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppGuardGuard implements CanActivate {
  constructor(
    private LoggedInService: LoggedInService,
    private Router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.LoggedInService.LoggedIn) {
      this.Router.navigate(['/main']);
      return false;
    } else {
      return true;
    }
  }
}
