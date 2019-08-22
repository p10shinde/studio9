import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItems } from '../center-container/center-bill-add/Datastructures/CartItems';
import { catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { formatDate } from '@angular/common';
import { Bill } from '../center-container/center-bill-add/Datastructures/bill';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  public pendingPaymentQueryCategories: string[];

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient,
    private errorService: ErrorService,
    public self: BillService
  ) {
    this.pendingPaymentQueryCategories = [
      'Equal to',
      'Greater than',
      'Less than'
    ];
   }

  saveBill(data: Bill) {
    // console.log(data);
    return this.http.post(`${this.baseUrl}bill`, data).pipe(catchError(this.errorService.handleError.bind(this)));
  }

  modifyBill(data: object) {
    console.log(data);
    return this.http.put(`${this.baseUrl}bill`, data).pipe(catchError(this.errorService.handleError.bind(this)));
  }

  getAllBills() {
    return this.http.get(`${this.baseUrl}bill`).pipe(catchError(this.errorService.handleError.bind(this)));
  }

  clearBill(data: object) {
    return this.http.put(`${this.baseUrl}bill/clear`, data).pipe(catchError(this.errorService.handleError.bind(this)));
  }

  printBill(billNo: number) {
    return this.http.get(`${this.baseUrl}bill/print/${billNo}`).pipe(catchError(this.errorService.handleError.bind(this)));
  }

  fby_all(): (data: any, filter: string) => boolean {
    const filterFunction = (data, filter): boolean  => {
      return data.custName.trim().toLowerCase().indexOf(filter) !== -1;
    };
    return filterFunction;
  }

  fby_billno(): (data: any, filter: string) => boolean {
    const filterFunction = (data, filter): boolean  => {
      return data.billNo === Number(filter);
    };
    return filterFunction;
  }

  fby_date(): (data: any, filter: string) => boolean {
    const filterFunction = (data, filter): boolean  => {
      return formatDate(data.billDateTime, 'MMM d, y', 'en-US').trim().toLowerCase() ===
            formatDate(filter, 'MMM d, y', 'en-US').trim().toLowerCase();
    };
    return filterFunction;
  }

  fby_custname(): (data: any, filter: string) => boolean {
    const filterFunction = (data, filter): boolean  => {
      return data.custName.trim().toLowerCase().indexOf(filter) !== -1;
    };
    return filterFunction;
  }

  fby_custContact(): (data: any, filter: string) => boolean {
    const filterFunction = (data, filter): boolean  => {
      return data.custContact.trim().toLowerCase().indexOf(filter) !== -1;
    };
    return filterFunction;
  }

  fby_pendingPayment(query, pendingPaymentQueryCategories): (data: any, filter: string) => boolean {
    console.log(query);
    console.log(pendingPaymentQueryCategories);
    let filterFunction;
    if (query === pendingPaymentQueryCategories[0]) {
      filterFunction = (data, filter): boolean  => {
        return data.pendingPayment === +filter;
      };
    } else if (query === pendingPaymentQueryCategories[1]) {
      filterFunction = (data, filter): boolean  => {
        return data.pendingPayment > +filter;
      };
    } else if (query === pendingPaymentQueryCategories[2]) {
      filterFunction = (data, filter): boolean  => {
        return data.pendingPayment < +filter;
      };
    } else {
      filterFunction = (data, filter): boolean  => {
        return true;
      };
    }
    return filterFunction;
  }

  fby_userfullname(): (data: any, filter: string) => boolean {
    const filterFunction = (data, filter): boolean  => {
      return data.userFullName.trim().toLowerCase().indexOf(filter) !== -1;
    };
    return filterFunction;
  }

}
