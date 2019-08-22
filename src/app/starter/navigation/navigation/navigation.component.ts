import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import $ from 'jquery';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less'],
})
export class NavigationComponent implements OnInit {

  sidebarFlag = false;
  isBillRoute = false;
  constructor(router: Router) {
    router.events.subscribe(val => {
      if (location.pathname.search('bill/list') !== -1 || location.pathname.search('bill/add') !== -1) {
        this.isBillRoute = true;
      } else {
        this.isBillRoute = false;
      }
    });
  }

  ngOnInit() {
  }

  toggleSideBar() {
    this.sidebarFlag = !this.sidebarFlag;
    console.log($('div'));
  }

  showSubMenu() {

  }

}
