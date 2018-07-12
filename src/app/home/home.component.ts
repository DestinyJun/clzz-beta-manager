import {Component, DoCheck, EventEmitter, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {ReqService} from '../shared/req.service';
import {Router} from '@angular/router';
import {GlobalService} from '../shared/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy, DoCheck {
  @Output() InfoTg = new EventEmitter();
  constructor(
    private localSessionStorage: GlobalService,
    private req: ReqService,
    public router: Router
  ) {
  }
  ngDoCheck(): void {
  }
  infoTg() {
    this.InfoTg.emit(true);
  }
  ngOnInit() {
  }

  public ngOnDestroy(): void {
    this.req.Logout(JSON.stringify({sid: this.localSessionStorage.get('sid')}))
      .subscribe(res => {
        alert('登出成功！');
      });
  }

}
