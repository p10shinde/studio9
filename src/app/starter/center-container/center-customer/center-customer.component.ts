import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import { CustomsnackbarService } from '../../Services/customsnackbar.service';
import { CustomerService } from '../../Services/customer.service';
import { MatTableDataSource } from '@angular/material';
import { Customer } from './Datastructures/Customer';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-center-customer',
  templateUrl: './center-customer.component.html',
  styleUrls: ['./center-customer.component.less']
})
export class CenterCustomerComponent implements OnInit {

  loggedin = false;

  listTableColumns: string[] = [
    'sr',
    'custName',
    'custID',
    'custContact',
    'custEmail',
    'custAddress'
  ];

  listTableColumnsTitles: string[] = [
    '#',
    'Name',
    'ID',
    'Contact No',
    'Email',
    'Address'
  ];
  filterByCategories: string[] = [
    'Name',
    'ID',
    'Contact No',
    'Email',
    'Address'
  ];

  fMetadata =  [
    { type: 'Name', fn: this.custService.fcy_custname },
    { type: 'ID', fn: this.custService.fcy_id },
    { type: 'Contact No', fn: this.custService.fcy_custContact },
    { type: 'Email', fn: this.custService.fcy_custEmail },
    { type: 'Address', fn: this.custService.fcy_custAddress },
  ];
  dataSource = new MatTableDataSource<Customer>([]);
  activeFilterType = null;
  activeCustID = null;
  cities = ['Bareilly', 'Dehu', 'Pune'];
  states = ['Maharashtra', 'Uttar Pradesh', 'Madhya Pradesh'];
  countries = ['India'];
  custTitles = ['Mr', 'Ms', 'Mrs'];
  customerModel: Customer = null;
  editMode = false;
  addMode = true;
  showDetailsMode = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private custService: CustomerService,
    private snackbarService: CustomsnackbarService,
  ) { }

  ngOnInit() {
    this.loggedin = this.userService.checkLoggedIn();
    if (!this.loggedin) {
      this.router.navigate(['/login']);
    }

    this.customerModel = {
      // custTitle: 'Ms',
      // custName: 'Shailja Singh',
      // custEmail: 'sshailja7@gmail.com',
      // custID: 'sshailja_7',
      // custContact: '9458694934',
      // custAddress : {
      //   street: '79 Green Park Bisalpur Road',
      //   landmark: 'Radha madhav public school',
      //   city: 'Bareilly',
      //   postalCode: '243005',
      //   state: 'Uttar Pradesh',
      //   country: 'India'
      // }

        custTitle: null,
        custName: null,
        custEmail: null,
        custID: null,
        custContact: null,
        custAddress : {
          street: null,
          landmark: null,
          city: null,
          postalCode: null,
          state: null,
          country: null
        }
    };

    this.custService.getAllCustomers().subscribe(result => {
      this.dataSource = new MatTableDataSource(result);
    },
    err => {
      if (err.status === 404) {
        this.snackbarService.open('No customers available yet. Please register customers.');
      } else {
        this.snackbarService.open(err.message);
      }
    },
    () => {
      console.log('Completed successfully');
    });

    this.custService.getCSubscription().subscribe(result => {
      const newData = result.data;
      if (result.type === 'add') {
        this.dataSource.data.push(newData);
        this.dataSource.data = this.dataSource.data;
      } else {
        this.dataSource.data = this.dataSource.data.map(rec => {
          if (rec.custID === newData.custID) {
            return rec = newData;
          }
          return rec;
        });
      }
    });
  }

  showDetails(rowData, formData: NgForm) {
    this.toggleForm(formData, 'disable');
    this.activeCustID = rowData.custID;
    this.customerModel = { ...rowData };
    this.customerModel.custAddress = { ...rowData.custAddress };
    this.showDetailsMode = true;
  }

  editCustomer(formData: NgForm) {
    if (!this.editMode) {
      this.toggleForm(formData, 'enable');
      this.editMode = true;
    } else {
      this.toggleForm(formData, 'disable');
      this.editMode = false;
    }
    this.addMode = false;
  }

  newCustomer(formData: NgForm) {
    this.toggleForm(formData, 'enable', true);
    this.resetForm(formData);
    this.showDetailsMode = false;
  }

  toggleForm(formData: NgForm, state: 'enable' | 'disable', ifNew?) {
    Object.keys(formData.controls).forEach((controlName) => {
      if (ifNew) {
        formData.controls[controlName][state]();
      } else {
        if (controlName !== 'custID' || state !== 'enable') {
          formData.controls[controlName][state]();
        }
      }
    });
    this.editMode = false;
  }

  resetForm(formData: NgForm) {
    formData.resetForm();
    this.editMode = false;
    this.addMode = true;
  }

  closeItem() {
    console.log('close customer');
  }

  filterCategoryListener(filterCategory: string) {
    this.activeFilterType = filterCategory;
    console.log(this.activeFilterType);
    this.dataSource.filter = '';
  }

  filterTable(filter, ifClear) {
    console.log(filter);
    if (this.activeFilterType) {
      this.dataSource.filterPredicate = this.fMetadata.filter(obj2 => obj2.type === this.activeFilterType)[0].fn();
      this.dataSource.filter = typeof filter.control.value === 'object' ?
                                filter.control.value.toString().trim().toLowerCase() :
                                filter.control.value.trim().toLowerCase();
    }
    if (ifClear) {
      ifClear.control.setValue(null);
      this.activeFilterType = null;
    }
  }

  // ***********CUSTOMER FORM ***************//

  checkCustID(custID) {
    console.log(custID);
  }

  saveCustomer(formData: NgForm) {

    if (!this.editMode) {
        this.custService.saveCustomer(this.customerModel)
        .subscribe(custDetails => {
            this.snackbarService.open(`Customer saved successfully`, 'success');
            this.resetForm(formData);
            this.custService.callWhenCustomerAdded(custDetails);
        },
        err => {
            if (err.status === 404) {
            this.snackbarService.open('Unable to save customer details');
          } else if (err.status === 422) {
              this.snackbarService.open(err.error);
          } else {
            this.snackbarService.open(err.message);
          }
        },
        () => {
          console.log('Completed successfully');
        });
    } else {
      this.custService.modifyCustomer(this.customerModel)
        .subscribe(custDetails => {
            this.snackbarService.open(`Customer details updated successfully`, 'success');
            this.toggleForm(formData, 'disable');
            this.custService.callWhenCustomerModified(custDetails);
        },
        err => {
            if (err.status === 404) {
            this.snackbarService.open('Unable to update customer details');
          } else if (err.status === 422) {
              this.snackbarService.open(err.error);
          } else {
            this.snackbarService.open(err.message);
          }
        },
        () => {
          console.log('Completed successfully');
        });
    }

  }









}

