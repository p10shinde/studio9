import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
// import { Bill } from '../bill';
import { UserService } from '../../Services/user.service';
import { BillService } from '../../Services/bill.service';
import { CustomsnackbarService } from '../../Services/customsnackbar.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { MatTableDataSource } from '@angular/material';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-center-bill-list',
  templateUrl: './center-bill-list.component.html',
  styleUrls: ['./center-bill-list.component.less'],
  animations: [
    trigger('myAwesomeAnimation', [
      state('closed', style({
        height: '0px'
      })),
      state('open', style({
        height: '50px'
      })),
      transition('closed => open', animate('500ms ease-in')),
      transition('open => closed', animate('500ms ease-in'))
    ]),
  ]
})
export class CenterBillListComponent implements OnInit {

  loggedin = false;
  state = 'closed';
  panelOpenState = false;

  @ViewChild('pendingPaymentQuery', {static: false}) pendingPaymentQuery: NgModel;
  @ViewChild('pendingPayment', {static: false}) pendingPayment: NgModel;
  constructor(
    private userService: UserService,
    private router: Router,
    private billService: BillService,
    private snackbarService: CustomsnackbarService,
  ) { }
  billListTableColumns: string[] = [
    'billNo',
    'billDateTime',
    'custName',
    'custContact',
    'billTotal',
    'discountAmount',
    'billDiscountedTotal',
    'pendingPayment',
    'userFullName',
    // 'select'
  ];

  billListTableColumnsTitles: string[] = [
    'Bill No',
    'Date',
    'Customer',
    'Customer Contact',
    'Total(₹)',
    'Discount(₹/%)',
    'Grand Total(₹)',
    'Pending Payment(₹)',
    'User'
  ];
  maxDate = new Date();
  fMetadata =  [
    { type: 'Bill No', fn: this.billService.fby_billno },
    { type: 'Date', fn: this.billService.fby_date },
    { type: 'Customer', fn: this.billService.fby_custname },
    { type: 'Customer Contact', fn: this.billService.fby_custContact },
    { type: 'Pending Payment(₹)', fn: this.billService.fby_pendingPayment },
    { type: 'User', fn: this.billService.fby_userfullname },
  ];
  dataSource = new MatTableDataSource([]);
  billDetailsTableColumns: string[] =
  [
    'sr',
    'name',
    'address',
    'price'
  ];

  billDetails = [];
  billDetailsSchema = {
    billNo : null,
    custName : null,
    custID : null,
    custContact: null,
    userContact: null,
    userFullName: null,
    userID: null,
    billDateTime: null,
    billDetails : null,
    billTotal: null,
    discountAmount: null,
    billDiscountedTotal: null,
    aPaymentType: null,
    pPaymentType: 'paytm',
    advancePayment: null,
    pendingPayment: null,
    billClearDate: null
  };
  activeBillNo = null;
  billListToolbarActive = false;
  pPaymentType = 'paytm';

  filterByCategories: string[] = [
    'Bill No',
    'Date',
    'Customer',
    'Customer Contact',
    'Pending Payment(₹)',
    'User'
  ];

  pendingPaymentQueryCategories: string[];


  activeFilterType = null;
  selectedFilter = '';

  ngOnInit() {
    this.loggedin = this.userService.checkLoggedIn();
    if (!this.loggedin) {
      this.router.navigate(['/login']);
    }

    this.pendingPaymentQueryCategories =  this.billService.pendingPaymentQueryCategories;
    this.selectedFilter = this.pendingPaymentQueryCategories[0];

    this.billService.getAllBills().subscribe(result => {
      this.dataSource = new MatTableDataSource(result);
    },
    err => {
      if (err.status === 404) {
        this.snackbarService.open('No bills generated yet.');
      } else {
        this.snackbarService.open(err.message);
      }
    },
    () => {
      console.log('Completed successfully');
    });
  }

  showDetails(rowData) {
    this.activeBillNo = rowData.billNo;
    this.billDetailsSchema.billNo = rowData.billNo;
    this.billDetailsSchema.custName = rowData.custName;
    this.billDetailsSchema.custID = rowData.custID;
    this.billDetailsSchema.custContact = rowData.custContact;
    this.billDetailsSchema.userFullName = rowData.userFullName;
    this.billDetailsSchema.userID = rowData.userID;
    this.billDetailsSchema.userContact = rowData.userContact;
    this.billDetailsSchema.billDateTime = rowData.billDateTime;
    this.billDetailsSchema.billDetails = rowData.billDetails;
    this.billDetailsSchema.billTotal = rowData.billTotal;
    this.billDetailsSchema.discountAmount = rowData.discountAmount;
    this.billDetailsSchema.billDiscountedTotal = rowData.billDiscountedTotal;
    this.billDetailsSchema.aPaymentType = rowData.aPaymentType;
    this.billDetailsSchema.pPaymentType = rowData.pPaymentType;
    this.billDetailsSchema.advancePayment = rowData.advancePayment;
    this.billDetailsSchema.pendingPayment = rowData.pendingPayment;
    this.billDetailsSchema.billClearDate = rowData.billClearDate;

  }

  closeBill() {
    this.billDetailsSchema.billNo = null;
    this.activeBillNo = null;
  }

  toggle() {
    this.state = this.state === 'closed' ? 'open' : 'closed';
  }

  filterCategoryListener(filterCategory: string) {
    this.activeFilterType = filterCategory;
    this.dataSource.filter = '';
  }

  // 3rd parameter is for filtering datasource based on two values
  filterTable(filter, ifClear?, query? ) {
    this.dataSource.filterPredicate = this.fMetadata.filter(obj2 => obj2.type === this.activeFilterType)[0].
                                      fn(query, this.pendingPaymentQueryCategories);
    this.dataSource.filter = typeof filter.control.value === 'object' ?
                              filter.control.value.toString().trim().toLowerCase() :
                              filter.control.value.trim().toLowerCase();

    if (ifClear) {
      ifClear.control.setValue(null);
      this.activeFilterType = null;
    }
  }

  filterTableCustom() {
    const query = this.pendingPaymentQuery.value;
    // this.billService.pendingPaymentQuery = this.pendingPaymentQuery.value;
    this.filterTable(this.pendingPayment, false, query);
  }

  paymentReceived() {
    const data = {
        pPaymentType : this.pPaymentType,
        clearedBy: this.billDetailsSchema.userID,
        pendingPayment : 0,
        billNo : this.billDetailsSchema.billNo
    };
    this.billService.clearBill(data)
      .subscribe(respBillDetails => {
        this.snackbarService.open(`Bill : ${respBillDetails.billNo} cleared successfully`, 'success');
        this.dataSource.data = this.dataSource.data.map(rec => {
          this.billDetailsSchema.pendingPayment = respBillDetails.pendingPayment;
          this.billDetailsSchema.pPaymentType = respBillDetails.pPaymentType;
          this.billDetailsSchema.billClearDate = respBillDetails.billClearDate;

          if (rec.billNo === respBillDetails.billNo) {
            rec.pPaymentType = respBillDetails.pPaymentType;
            rec.clearedBy = respBillDetails.clearedBy;
            rec.pendingPayment = respBillDetails.pendingPayment;
            rec.billClearDate = respBillDetails.billClearDate;
            return rec;
          }
          return rec;
        });
      },
      err => {
        console.log(err);
        if (err.status === 404) {
          this.snackbarService.open('Unable to clear bill details');
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

