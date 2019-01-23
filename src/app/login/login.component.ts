import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReqService} from '../shared/req.service';
import {Router} from '@angular/router';
import {GlobalService} from '../shared/global.service';
import {HttpClient} from '@angular/common/http';
import {Url} from '../user-defined-service/Url';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public userLoginInfoForm: FormGroup;
  public status: number;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private localSessionStorage: GlobalService,
    private http: HttpClient
  ) {
    this.userLoginInfoForm = fb.group({
      uname: ['', Validators.required],
      upwd: ['', Validators.required],
      module: ['WEBS', Validators.required]
    });
  }

  ngOnInit() {
    this.status = 0;
  }
  public OnSubmitInfo(): void {
      if (this.userLoginInfoForm.valid) {
        this.http.post(Url.Data.login, this.userLoginInfoForm.value)
          .subscribe(res => {
            this.status = Number(res['status']);
            if (Number(res['status']) === 10) {
              this.localSessionStorage.set('realName', res['realName']);
              this.localSessionStorage.set('sid', res['sid']);
              this.localSessionStorage.set('uname', this.userLoginInfoForm.get('uname').value);
              this.localSessionStorage.set('upwd', this.userLoginInfoForm.get('upwd').value);
              this.localSessionStorage.set('module', this.userLoginInfoForm.get('module').value);
              this.localSessionStorage.set('logstatus', '10');
              this.router.navigate(['/home']);
            }
          });
      } else {
        alert('账号或密码不能为空!');
      }
  }

  public cleanScreen(): void {
    this.status = 0;
  }
}
