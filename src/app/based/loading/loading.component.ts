import { Component, OnInit } from '@angular/core';
import {SlimLoadingBarService} from './../../../../node_modules/ng2-slim-loading-bar';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor(
    public slimLoadingBarService: SlimLoadingBarService
  ) { }

  ngOnInit() {
  }

}
