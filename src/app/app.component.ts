import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './starter/Services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'studio9';
  loggedin = false;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.loggedin = this.userService.checkLoggedIn();
    if (this.loggedin) {
      // this.router.navigate(['/report/list']);
    }
    this.userService.validateUserSubscription().subscribe(resp => {
      this.loggedin = resp;
    });
  }

  getUrl() {

    return this.loggedin ? null : `url('../assets/images/login_image.jpg')`;
  }

}
