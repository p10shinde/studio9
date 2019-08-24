import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    // this.userService.validateUserSubscription().subscribe(resp => {
    //   if (resp) {
    //     this.router.navigate(['/report/list']);
    //   }
    // });
  }

  validate(formData: NgForm) {
    const resp = this.userService.validateUser({userEmail: formData.value.userEmail, password: formData.value.password,
                                  passwordT: formData.value.password,
                                  userFullName: null, type: null, userID: null, userContact: null});

    resp.subscribe(user => {
      this.userService.userValidated(true, user);
      // this.router.navigate(['/report/list']);
      this.router.navigate(['/bill/add']);
    });

  }



}
