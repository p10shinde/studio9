import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class APIInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let apiReq = req.clone();
    // if (req.url.search('auth') !== -1) {
      const apiReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: 'Basic ' + this.getToken()
        })
      });
    // }
      return next.handle(apiReq);
  }

  getToken() {
    const userEmail = sessionStorage.getItem('userEmail');
    const password = sessionStorage.getItem('passwordT');
    if (userEmail != null) {
      return btoa(`${userEmail}:${password}`);
    }
  }

}
