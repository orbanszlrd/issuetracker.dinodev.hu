import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  show: boolean = false;

  constructor() {}

  showSidebar(): void {
    this.show = !this.show;
  }

  ngOnInit(): void {}
}
