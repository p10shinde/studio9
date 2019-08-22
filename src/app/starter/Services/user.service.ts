import { Injectable, Inject, NgZone } from '@angular/core';
import { Subscription, Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../login/Datastructures/User';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from 'src/app/general/snackbar/snackbar.component';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userLoggedInStatus = new Subject<boolean>();

  constructor(private http: HttpClient,
              @Inject('BASE_API_URL') private baseUrl: string,
              public snackBar: MatSnackBar,
              public errorService: ErrorService) { }


  validateUser(userData: User): Observable<any> {
    sessionStorage.setItem('userEmail', userData.userEmail);
    sessionStorage.setItem('password', userData.password);
    return this.http.get(this.baseUrl + 'auth').pipe(catchError(this.errorService.handleError.bind(this)));
  }

  userValidated(ifTrue: boolean, user: User) {
    if (ifTrue) {
      sessionStorage.setItem('userEmail', user.userEmail);
      sessionStorage.setItem('password', user.password);
      sessionStorage.setItem('userFullName', user.userFullName);
      sessionStorage.setItem('type', user.type);
      sessionStorage.setItem('userID', user.userID);
      sessionStorage.setItem('userContact', user.userContact);
      this.userLoggedInStatus.next(true);
    }
  }

  validateUserSubscription() {
    return this.userLoggedInStatus.asObservable();
  }

  checkLoggedIn(): boolean {
    const userID = sessionStorage.getItem('userID');
    if (userID == null) {
      return false;
    } else {
      return true;
      // this.router.navigate(['/report/list']);
      // this.router.navigate(['/bill/add']);
    }
  }

  logout() {
    sessionStorage.clear();
    this.userLoggedInStatus.next(false);
  }
}
