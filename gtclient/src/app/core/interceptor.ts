import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Injectable} from "@angular/core";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = window.localStorage.getItem('token');
    const uri = request.url;
    if(uri.search("transaction")<0)
    {

    
    if (token) {
       // alert(token);
       const date = Date.now();
            const loginDate: string = window.localStorage.getItem('date');
            const expirein: string = window.localStorage.getItem('expires_in');
            const expireDate: number = parseInt(loginDate) + parseInt(expirein) * 1000;

            if (date > expireDate) {
              window.localStorage.removeItem('token');
        window.localStorage.removeItem('expires_in');
        window.localStorage.removeItem('date');
        window.localStorage.removeItem('loginUser');
        window.localStorage.removeItem('tenantname');
                 request = request.clone({
            setHeaders: {
               
               Authorization: 'Basic ' + btoa('my-trusted-client' + ':' + 'secret')
                }
            });
            }
        else{

      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
    }
    } else {
        request = request.clone({
            setHeaders: {
               
               Authorization: 'Basic ' + btoa('my-trusted-client' + ':' + 'secret')
                }
            });
           // alert('Setting');
    }
  }
    return next.handle(request);
  }
}
