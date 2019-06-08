import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild,  Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    path: ActivatedRouteSnapshot[];
    route: ActivatedRouteSnapshot;
  constructor( private router: Router) {}
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  canActivate(): Observable<boolean> {
    
    
  
    if ( !window.localStorage.getItem('token') ) {
            this.loggedIn.next(false);
            return this.loggedIn.asObservable();
        } else {
            const date = Date.now();
            const loginDate: string = window.localStorage.getItem('date');
            const expirein: string = window.localStorage.getItem('expires_in');
            const expireDate: number = parseInt(loginDate) + parseInt(expirein) * 1000;

            if (date > expireDate) {
                this.router.dispose();
                this.router.navigate(['login']);
                this.loggedIn.next(false);
            return this.loggedIn.asObservable();
               
            }
             this.loggedIn.next(true);
            return this.loggedIn.asObservable();
           

        }
    
  }
  canActivateChild(): Observable<boolean> {
    
    
  
    if ( !window.localStorage.getItem('token') ) {
            this.loggedIn.next(false);
            return this.loggedIn.asObservable();
        } else {
            const date = Date.now();
            const loginDate: string = window.localStorage.getItem('date');
            const expirein: string = window.localStorage.getItem('expires_in');
            const expireDate: number = parseInt(loginDate) + parseInt(expirein) * 1000;

            if (date > expireDate) {
                this.router.dispose();
                this.router.navigate(['login']);
                this.loggedIn.next(false);
            return this.loggedIn.asObservable();
               
            }
             this.loggedIn.next(true);
            return this.loggedIn.asObservable();
           

        }
    
  }
}
