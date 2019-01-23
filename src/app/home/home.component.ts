import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public pisMenu: boolean;
  constructor(
  ) {
  }
  ngOnInit() {
  }
  public checkLoginStatus(): void {

  }

  public controlMenus(e): void {
    this.pisMenu = !this.pisMenu;
  }

}
