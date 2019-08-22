import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class OfferingService {

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient,
    private errorService: ErrorService,
  ) { }

  getAllOfferings() {
    return this.http.get(`${this.baseUrl}offering`).pipe(catchError(this.errorService.handleError.bind(this)));
  }
}
