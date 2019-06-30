import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (
    public auth: AuthService,
    public router: Router
  ) {

  }


  public canActivate(): Promise<boolean> | boolean {
    return this.auth
              .isLoggedIn()
              .then(
                status => {
                 console.log ( "canActivate: ", status );
                 if ( !status ) {
                   this.router.navigate(['/login']);
                   return false;
                 }
                 return true;
             });
  }
}
