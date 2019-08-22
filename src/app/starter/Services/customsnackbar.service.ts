import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from 'src/app/general/snackbar/snackbar.component';
import { isUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class CustomsnackbarService {

  error = true;

  constructor(
    public snackBar: MatSnackBar,
    private zone: NgZone
  ) { }

  public open(errorText, type = 'error') {
      // this.zone.run(() => {
          if (typeof errorText === 'object') {
            if (errorText.error) {
              errorText = errorText.error[0].split('Error [')[1].split(']')[0];
            }
          } else {
            errorText = errorText;
          }
          const snackBar = this.snackBar.openFromComponent(SnackbarComponent, {
            data: { errorText, type } ,
            // duration: 4000,
            panelClass: [type]
          });
          snackBar.onAction().subscribe(() => {
            snackBar.dismiss();
          });
      // });
  }
}
