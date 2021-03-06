import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/app/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    /*{ path: '/app/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/app/table-list', title: 'Table List',  icon:'content_paste', class: '' },*/
    { path: '', title: 'Crud KPI',  icon:'library_books', class: '' },
    { path: '/app/kpi', title: 'Airside',  icon:'flight_takeoff', class: '' },
    { path: '/app/landing', title: 'Terminal',  icon:'settings_accessibility', class: '' },
    { path: '/app/landing2', title: 'Accessibility',  icon:'add_road', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  subMenu: boolean = false;
  notLeave: boolean = true;

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  closeMenu(){
    const menu = document.getElementById('sidebar-important-open');
    if(menu){
        //console.log("rimuovo la classe della sidebar")
      menu.removeAttribute('sidebar-important-open');
      menu.id = 'sidebar-important';

      //console.log("rimuovo la classe del main panel")
      const mainPanel = document.getElementById('main-panel-important-sidebar-open');
      mainPanel.removeAttribute('main-panel-important-sidebar-open');
      mainPanel.id = 'main-panel-important';
    }
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}