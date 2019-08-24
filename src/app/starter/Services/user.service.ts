import { Injectable, Inject, NgZone } from '@angular/core';
import { Subscription, Observable, Subject, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from 'src/app/general/snackbar/snackbar.component';
import { ErrorService } from './error.service';
import { User } from 'src/app/general/Datastructures/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userLoggedInStatus = new Subject<boolean>();
  user: User = null;
  uSubscription = new BehaviorSubject({data: this.user, type: ''});


  constructor(private http: HttpClient,
              @Inject('BASE_API_URL') private baseUrl: string,
              public snackBar: MatSnackBar,
              public errorService: ErrorService) { }


  validateUser(userData: User): Observable<any> {
    sessionStorage.setItem('userEmail', userData.userEmail);
    sessionStorage.setItem('passwordT', userData.passwordT);
    return this.http.get(this.baseUrl + 'auth').pipe(catchError(this.errorService.handleError.bind(this)));
  }

  userValidated(ifTrue: boolean, user: User) {
    if (ifTrue) {
      sessionStorage.setItem('userEmail', user.userEmail);
      sessionStorage.setItem('password', user.password);
      sessionStorage.setItem('passwordT', user.passwordT);
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



  getAllUsers() {
    return this.http.get(`${this.baseUrl}user`).pipe(catchError(this.errorService.handleError.bind(this)));
  }

  getUSubscription() {
    return this.uSubscription.asObservable();
  }

  callWhenUserAdded(customer) {
    this.uSubscription.next({ data: customer, type : 'add'});
  }

  callWhenUserModified(customer) {
    this.uSubscription.next({ data: customer, type : 'mod'});
  }

  saveUser(data: User) {
    return this.http.post(`${this.baseUrl}user`, data).pipe(catchError(this.errorService.handleError.bind(this)));
  }

  modifyUser(data: User, userID) {
    return this.http.put(`${this.baseUrl}user/${userID}`, data).pipe(catchError(this.errorService.handleError.bind(this)));
  }


  fuy_username() {
    const filterFunction = (data, filter): boolean  => {
      return data.userFullName.trim().toLowerCase().indexOf(filter) !== -1;
    };
    return filterFunction;
  }
  fuy_id() {
    const filterFunction = (data, filter): boolean  => {
      return data.userID.trim().toLowerCase().indexOf(filter) !== -1;
    };
    return filterFunction;
  }
  fuy_type() {
    const filterFunction = (data, filter): boolean  => {
      return data.type.trim().toLowerCase().indexOf(filter) !== -1;
    };
    return filterFunction;
  }
  fuy_userContact() {
    const filterFunction = (data, filter): boolean  => {
      return data.userContact.trim().toLowerCase().indexOf(filter) !== -1;
    };
    return filterFunction;
  }
  fuy_userEmail() {
    const filterFunction = (data, filter): boolean  => {
      return data.userEmail.trim().toLowerCase().indexOf(filter) !== -1;
    };
    return filterFunction;
  }
  fuy_userAddress() {
    const filterFunction = (data, filter): boolean  => {
      return Object.values(data.userAddress).join(' ').trim().toLowerCase().indexOf(filter) !== -1;
    };
    return filterFunction;
  }

}
