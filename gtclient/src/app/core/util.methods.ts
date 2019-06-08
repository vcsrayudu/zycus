import {Injectable} from "@angular/core";
@Injectable()
export class Utils {
    constructor() { }

    validateToken(router): boolean {
      
        if (!window.localStorage.getItem('token')) {
            router.dispose();
            router.navigate(['login']);
            return false;
        } else {
            const date = Date.now();
            const loginDate: string = window.localStorage.getItem('date');
            const expirein: string = window.localStorage.getItem('expires_in');
            const expireDate: number = parseInt(loginDate) + parseInt(expirein) * 1000;

            if (date > expireDate) {
                router.dispose();
                router.navigate(['login']);
                return false;
            }
            return true;

        }
    }
}