import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  loggedin = false;
  userID: string;
  userFullName: string;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.loggedin = this.userService.checkLoggedIn();
    this.userFullName = sessionStorage.getItem('userFullName');
    this.userService.validateUserSubscription().subscribe(resp => {
      this.loggedin = resp;
      this.userID = sessionStorage.getItem('userID');
      this.userFullName = sessionStorage.getItem('userFullName');
    });

  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

}
