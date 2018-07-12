import { Component, OnInit, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ReqService} from '../../shared/req.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GlobalService, PersonInfo} from '../../shared/global.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public infoToggle: boolean;
  public scrollToggle: boolean;
  public navListToggle: boolean;
  public userReminds: UserRemind[];
  public userRemindsChange: any;
  public bigBoxHeight: number;
  public contentBoxHeight: number;
  public barBoxHeight: string;
  public modalRef: BsModalRef;
  public personInfo: PersonInfo;
  public personInfoModifyForm: FormGroup;
  public genderm: string;
  public genderw: string;
  constructor(
    private route: Router,
    private http: HttpClient,
    private modalService: BsModalService,
    private req: ReqService,
    private fb: FormBuilder,
    public localSessionStorage: GlobalService
    ) {
    this.personInfoModifyForm = fb.group({
      id: ['', Validators.required],
      userCode: ['', Validators.required],
      idCode: ['', Validators.required],
      realName: ['', Validators.required],
      userName: ['', Validators.required],
      homeAddress: ['', Validators.required],
      homeTelephone: ['', Validators.required],
      organizationId: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      idt: [{value: '', disabled: true}, Validators.required],
      udt: [{value: '', disabled: true}, Validators.required]
    });
  /*  this.userRemindsChange = this.userReminds.map((n, index, obj) => {
      n.userTime = this.getDateDiff(new Date(), n.userTime);
      return obj;
    });*/
  }
  ngOnInit() {
    this.infoToggle = true;
    this.scrollToggle = true;
    this.navListToggle = true;
    this.userReminds = [
      new UserRemind('danger', '../../../assets/images/Nasta.png', '故障！一号仓库电机组出现故障', new Date('2018/03/11 22:03:11')),
      new UserRemind('success', '../../../assets/images/Nasta.png', '操作：生产订单添加成功', new Date('2018/03/11 20:03:11')),
      new UserRemind('warning', '../../../assets/images/Nasta.png', '警告！油漆数量不足', new Date('2018/03/11 20:11:35'))
    ];
  }
  // 控制模态框,查看个人信息
  public openPersonInfo(template: TemplateRef<any>): void {
    this.req.getUserInfo({'sid' : this.localSessionStorage.get('sid')}).subscribe(value => {
      this.personInfo = value.data;
      // console.log(value);
      this.personInfoModifyForm.reset(this.personInfo);
      if (this.personInfo !== undefined) {
          if (this.personInfo.gender === '男' || this.personInfo.gender === 'm') {
              this.genderm = 'checked';
              this.genderw = '';
          }
          if (this.personInfo.gender === '女' || this.personInfo.gender === 'w') {
              this.genderm = '';
              this.genderw = 'checked';
          }
        this.modalRef = this.modalService.show(template);
      }
    });
  }
  // 修改性别
  public SelectGender(gender: string): void {
      this.personInfoModifyForm.patchValue({gender : gender});
  }
  // 个人信息修改
  public PersonInfoModify() {
    // console.log('id=' + this.personInfoModifyForm.get('id').value);
    // console.log('id=' + JSON.stringify(this.personInfoModifyForm.value));
        this.req.UserInfoModify(this.personInfoModifyForm.value)
          .subscribe(status => {
            // console.log(status);
          });
  }
  // 退出请求
  public loginOut(): void {
    this.req.Logout({sid: sessionStorage.getItem('sid')})
                  .subscribe(res => {
                      if (Number(res.status) === 10) {
                        alert('退出登录成功!');
                      }
                  });
    this.route.navigate(['/login']);
  }
  public onToggleInfo(event): void {
    this.infoToggle = !this.infoToggle;
  }
}
export class UserRemind {
  constructor(
    public classFlag: string,
    public userPhoto: string,
    public userMessage: string,
    public userTime: Date
  ) {}
}

