import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import { CustomsnackbarService } from '../../Services/customsnackbar.service';
import { MatTableDataSource } from '@angular/material';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/general/Datastructures/User';
import * as _ from 'underscore';

@Component({
  selector: 'app-center-user',
  templateUrl: './center-user.component.html',
  styleUrls: ['./center-user.component.less']
})
export class CenterUserComponent implements OnInit {

  loggedin = false;

  listTableColumns: string[] = [
    'sr',
    'userFullName',
    'userID',
    'type',
    'userContact',
    'userEmail',
    'userAddress'
  ];

  listTableColumnsTitles: string[] = [
    '#',
    'Name',
    'ID',
    'Type',
    'Contact No',
    'Email',
    'Address'
  ];
  filterByCategories: string[] = [
    'Name',
    'ID',
    'Type',
    'Contact No',
    'Email',
    'Address'
  ];

  fMetadata =  [
    { type: 'Name', fn: this.userService.fuy_username },
    { type: 'ID', fn: this.userService.fuy_id },
    { type: 'Contact No', fn: this.userService.fuy_userContact },
    { type: 'Type', fn: this.userService.fuy_type },
    { type: 'Email', fn: this.userService.fuy_userEmail },
    { type: 'Address', fn: this.userService.fuy_userAddress },
  ];
  dataSource = new MatTableDataSource<User>([]);
  activeFilterType = null;
  activeUserID = null;
  cities = ['Bareilly', 'Dehu', 'Pune'];
  states = ['Maharashtra', 'Uttar Pradesh', 'Madhya Pradesh'];
  countries = ['India'];
  userTitles = ['Mr', 'Ms', 'Mrs'];
  userTypes = ['user', 'admin', 'superadmin'];
  userModel: User = null;
  editMode = false;
  addMode = true;
  showDetailsMode = false;
  passwordMatch = true;
  passwordCriteria = `Match at least one uppercase letter\nMatch at least one lowercase letter\n
                      Match at least one number\nMatch at least one of these characters: #@$?\n
                      Match any character at least 8 times`;
  customError = {
    hasError: false,
    error: ''
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private snackbarService: CustomsnackbarService,
  ) { }

  ngOnInit() {
    this.loggedin = this.userService.checkLoggedIn();
    if (!this.loggedin) {
      this.router.navigate(['/login']);
    } else {
      this.userModel = {
        // userTitle: 'Ms',
        // userFullName: 'Shailja Singh',
        // userEmail: 'sshailja7@gmail.com',
        // userID: 'sshailja_7',
        // type: 'user',
        // password: null,
        // passwordT: null,
        // userContact: '9458694934',
        // userAddress : {
        //   street: '79 Green Park Bisalpur Road',
        //   landmark: 'Radha madhav public school',
        //   city: 'Bareilly',
        //   postalCode: '243005',
        //   state: 'Uttar Pradesh',
        //   country: 'India'
        // }

          userTitle: null,
          userFullName: null,
          userEmail: null,
          userID: null,
          type: 'user',
          password: null,
          passwordT: null,
          userContact: null,
          userAddress : {
            street: null,
            landmark: null,
            city: null,
            postalCode: null,
            state: null,
            country: null
          }
      };

      this.userService.getAllUsers().subscribe(result => {
        this.dataSource = new MatTableDataSource(result);
      },
      err => {
        if (err.status === 404) {
          this.snackbarService.open('No Users available yet. Please register users.');
        } else {
          this.snackbarService.open(err.message);
        }
      },
      () => {
        console.log('Completed successfully');
      });

      this.userService.getUSubscription().subscribe(result => {
        const newData = result.data;
        if (result.type === 'add') {
          this.dataSource.data.push(newData);
          this.dataSource.data = this.dataSource.data;
        } else {
          this.dataSource.data = this.dataSource.data.map(rec => {
            if (rec.userID === newData.userID) {
              return rec = newData;
            }
            return rec;
          });
        }
      });
    }
  }

  showDetails(rowData: User, formData: NgForm) {
    this.toggleForm(formData, 'disable');
    this.activeUserID = rowData.userID;
    this.userModel = { ...rowData };
    this.userModel.userAddress = { ...rowData.userAddress };
    this.showDetailsMode = true;
  }

  editUser(formData: NgForm) {
    if (!this.editMode) {
      this.toggleForm(formData, 'enable');
      this.editMode = true;
    } else {
      this.toggleForm(formData, 'disable');
      this.editMode = false;
    }
    this.addMode = false;
  }

  newUser(formData: NgForm) {
    this.toggleForm(formData, 'enable', true);
    this.resetForm(formData);
    this.showDetailsMode = false;
  }

  toggleForm(formData: NgForm, state: 'enable' | 'disable', ifNew?) {
    Object.keys(formData.controls).forEach((controlName) => {
      if (ifNew) {
        formData.controls[controlName][state]();
      } else {
        if (controlName !== 'userID' || state !== 'enable') {
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
    console.log('close user');
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

  // ***********User FORM ***************//

  checkUserID(userID) {
    console.log(userID);
  }

  saveUser(formData: NgForm) {
    // if (formData.valid) {
      let formattedData = _.omit(this.userModel, 'createdAt', 'updatedAt');
      if (!this.editMode) {
        if (formattedData.passwordT === formattedData.password) {
            this.passwordMatch = true;
            this.userService.saveUser(formattedData)
            .subscribe(userDetails => {
                this.snackbarService.open(`User created successfully`, 'success');
                this.resetForm(formData);
                this.userService.callWhenUserAdded(userDetails);
            },
            err => {
                if (err.status === 404) {
                this.snackbarService.open('Unable to save user details');
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
            this.passwordMatch = false;
          }
        } else {
          formattedData = _.omit(formattedData, 'userID');
          const editinUSerEmail = _.findWhere(this.dataSource.data, {userID: this.userModel.userID}).userEmail;
          if (editinUSerEmail !== sessionStorage.getItem('userEmail')) {
            this.userService.modifyUser(formattedData, this.userModel.userID)
              .subscribe(userDetails => {
                  this.snackbarService.open(`User details updated successfully`, 'success');
                  this.toggleForm(formData, 'disable');
                  this.userService.callWhenUserModified(userDetails);
              },
              err => {
                  if (err.status === 404) {
                  this.snackbarService.open('Unable to update user details');
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
            this.snackbarService.open('You can not change email address for current account');
          }
        }
      // } else {
      //   this.displaycustomError('Please verify details.');
      // }

  }

  displaycustomError(error) {
    this.customError = {
      hasError: true,
      error
    };

    setTimeout(() => {
      this.customError = {
        hasError: false,
        error: ''
      };
    }, 3000);
  }







}

