import { Injectable, Injector, NgZone, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomsnackbarService } from './customsnackbar.service';
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from 'src/app/general/snackbar/snackbar.component';
import { isUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements ErrorHandler {

  constructor(
    public injector: Injector,
    private snackbarService: CustomsnackbarService,
    // private readonly zone: NgZone
    ) { }

  handleError(errorText: HttpErrorResponse | any) {
    if (!isUndefined(this.snackbarService)) {
      if (errorText.error) {
        this.snackbarService.open(errorText.error);
      } else if (errorText.status === 422) {
        this.snackbarService.open(errorText.error[0].split('Error [')[1].split(']')[0]);
      } else {
        this.snackbarService.open(errorText.message);
      }
      console.log(errorText);


    }
    return throwError(errorText || 'Server Error');
  }
}
