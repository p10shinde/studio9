import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderModule } from './starter/header/header.module';
import { FooterModule } from './starter/footer/footer.module';
import { NavigationModule } from './starter/navigation/navigation.module';
import { CenterContainerModule } from './starter/center-container/center-container.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { StarterModule } from './starter/starter.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APIInterceptor } from './interceptors/APIInterceptor';
import { ErrorService } from './starter/Services/error.service';

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HeaderModule,
    FooterModule,
    NavigationModule,
    CenterContainerModule,
    StarterModule,
    BrowserAnimationsModule,
    NgbModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
  ],
  providers: [
    ErrorService,
    { provide: ErrorHandler, useClass: ErrorService },
    { provide: 'BASE_API_URL', useValue: environment.apiUrl },
    { provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
