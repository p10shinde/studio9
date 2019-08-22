import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StarterRoutingModule } from './starter-routing.module';
import { LoginComponent } from './login/login/login.component';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule } from '@angular/material';
import { SnackbarComponent } from '../general/snackbar/snackbar.component';

@NgModule({
  declarations: [LoginComponent, SnackbarComponent],
  imports: [
    CommonModule,
    FormsModule,
    StarterRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  entryComponents: [
    SnackbarComponent
  ],
  exports: [ LoginComponent ]
})
export class StarterModule { }
