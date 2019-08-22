import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { Customer } from '../center-container/center-customer/Datastructures/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customer: Customer = null;
  customerOld: Customer = null;
  cSubscription = new BehaviorSubject({data: this.customer, type: ''});

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    @Inject('BASE_API_URL') private baseUrl: string,
    ) { }

  getAllCustomers() {
    return this.http.get(`${this.baseUrl}customer`).pipe(catchError(this.errorService.handleError.bind(this)));
  }

  getCSubscription() {
    return this.cSubscription.asObservable();
  }

  callWhenCustomerAdded(customer) {
    this.cSubscription.next({ data: customer, type : 'add'});
  }

  callWhenCustomerModified(customer) {
    this.cSubscription.next({ data: customer, type : 'mod'});
  }

  saveCustomer(data: object) {
    return this.http.post(`${this.baseUrl}customer`, data).pipe(catchError(this.errorService.handleError.bind(this)));
  }

  modifyCustomer(data: object) {
    return this.http.put(`${this.baseUrl}customer`, data).pipe(catchError(this.errorService.handleError.bind(this)));
  }

  fcy_custname() {
    const filterFunction = (data, filter): boolean  => {
      return data.custName.trim().toLowerCase().indexOf(filter) !== -1;
    };
    return filterFunction;
  }
  fcy_id() {
    const filterFunction = (data, filter): boolean  => {
      return data.custID.trim().toLowerCase().indexOf(filter) !== -1;
    };
    return filterFunction;
  }
  fcy_custContact() {
    const filterFunction = (data, filter): boolean  => {
      return data.custContact.trim().toLowerCase().indexOf(filter) !== -1;
    };
    return filterFunction;
  }
  fcy_custEmail() {
    const filterFunction = (data, filter): boolean  => {
      return data.custEmail.trim().toLowerCase().indexOf(filter) !== -1;
    };
    return filterFunction;
  }
  fcy_custAddress() {
    const filterFunction = (data, filter): boolean  => {
      return Object.values(data.custAddress).join(' ').trim().toLowerCase().indexOf(filter) !== -1;
    };
    return filterFunction;
  }



  searchCustomer(custNameOrID: string) {
    return this.http.get(`${this.baseUrl}customer/${custNameOrID}`).pipe(catchError(this.errorService.handleError.bind(this)));
  }

  getCustomerNameList() {
    return this.http.get(`${this.baseUrl}customer/list`).pipe(catchError(this.errorService.handleError.bind(this)));
  }

}
