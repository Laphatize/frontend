
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AppConstants } from '../../../AppConstants';
import { AuthService } from '../../AuthService/auth.service';
import { NgProgress } from '@ngx-progressbar/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private ngProgress: NgProgress) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url): Observable<boolean> {
    return this.authService.currentUser.pipe(
      map<any, boolean>((user) => {
        if (!user) {
          const navExtras = {
            queryParams: {
              redirectUrl: url,
            },
          };
          // Navigate to the login page with extras
          this.router.navigate([AppConstants.LOGIN_ENDPOINT], navExtras)
            .then(() => {
              this.ngProgress.complete();
            });
          return false;
        }
        return true;
      }));
  }
}
