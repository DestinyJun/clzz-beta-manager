import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ReqService} from '../../shared/req.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GlobalService, PersonInfo} from '../../shared/global.service';
import {SelectLineIdsStatus} from '../../business/users/users.component';
import 'rxjs/Rx';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public infoToggle: boolean;
  public modalRef: BsModalRef;
  public personInfo: PersonInfo;
  public personInfoModifyForm: FormGroup;
  public genderm: string;
  public genderw: string;
  @Output()
  public cisMenuChange = new EventEmitter();
  @Input()
  public cisMenu: boolean;
  public userLineIds: Array<SelectLineIdsStatus>;
  public userName: string;
  public openstatus: boolean;
  public status: number;
  public organization: any;

  constructor(
    private route: Router,
    private http: HttpClient,
    private modalService: BsModalService,
    private req: ReqService,
    private fb: FormBuilder,
    public localSessionStorage: GlobalService
  ) {
  }

  ngOnInit() {
    this.openstatus = true;
    this.userName = this.localSessionStorage.get('realName');
    this.userLineIds = [];
    this.cisMenu = false;
    this.infoToggle = true;
    // this.bool = false;
    this.personInfoModifyForm = this.fb.group({
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
      sysids: ['', Validators.required],
      idt: [{value: '', disabled: true}, Validators.required],
      udt: [{value: '', disabled: true}, Validators.required]
    });
    // 查找机构
    this.req.FindDepartOrgani().subscribe(value => {
      this.organization = value.values.organizations;
    });
    // 查找系统所有id
    this.req.FindsystemSysid().subscribe(value => {
      if (value.values) {
        // 再初始化 userLineIds 并向里面增加所有生产线，sys_status 为 0 时，没有该权限，反之为1时，有权限。
        for (let i = 0; i < value.values.length; ++i) {
          this.userLineIds.push(new SelectLineIdsStatus(value.values[i].sid, value.values[i].name, 0));
        }
      }
    });
  }

  // 选择生产线 ID 并保存在 userLineIds 数组里面，增，修，查 共用
  public selectProLineId(id, e): void {
    // 不需要考虑到 index = -1 的情况
    const index = this.userLineIds.indexOf(id);
    if (e.srcElement.checked) {
      this.userLineIds[index].sys_status = 1;
    } else {
      this.userLineIds[index].sys_status = 0;
    }
    // this.updateLineShow('modify');
  }

  // 控制模态框
  public openModal(template: TemplateRef<any>): void {
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'lookdesc') {
      this.req.getUserInfo({'sid': this.localSessionStorage.get('sid')}).subscribe(value => {
        this.personInfo = value.data;
        // modifyIds 用来保存用户的生产线权限id
        let sysids = this.personInfo['sysids'];
        // 如果用户存在有sysids
        if (sysids) {
          // 用来去掉最后一个中括号
          const firstf = /\]$/;
          // 用来去掉第一个中括号
          const lastf = /^\[/;
          sysids = sysids.replace(lastf, '');
          sysids = sysids.replace(firstf, '');
          let ids = sysids.split(',');
          // 如果存在某个 生产线权限，则相应的 sys_status 变成 1
          // 第一个 for 用来 遍历modifyids
          // 第二个for 用来 找查 modifyids 中的每一个 生产线id。如果存在，则相应的sysb
          for (let i = 0; i < ids.length; ++i) {
            for (let j = 0; j < this.userLineIds.length; ++j) {
              if (this.userLineIds[j].sys_id === ids[i]) {
                this.userLineIds[j].sys_status = 1;
              }
            }
          }
        }
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
        // this.updateLineShow('addLineId');
      });
    }
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'modify') {
      // 这里是增加生产线在模态框的显示
      //   this.updateLineShow('modifyLineId');
      this.modalRef = this.modalService.show(template);
    }

  }

  // 修改性别
  public selectGender(gender: string): void {
    this.personInfoModifyForm.patchValue({gender: gender});
  }

  // 个人信息修改
  public personInfoModify() {
    this.openstatus = false;
    // 在增加之前把 生产线 id 转换成字符串放到增加表单的 sysids 中
    const sysIdsStr = [];
    for (let i = 0; i < this.userLineIds.length; ++i) {
      if (this.userLineIds[i].sys_status === 1) {
        sysIdsStr.push(this.userLineIds[i].sys_id);
      }
    }
    this.personInfoModifyForm.patchValue({sysids: sysIdsStr.toString()});
    this.req.UserInfoModify(this.personInfoModifyForm.value)
      .subscribe(res => {
        this.status = Number(res.status);
        setTimeout(() => {
          this.openstatus = true;
        }, 2000);
      });
  }

  // 控制左边导航栏
  public controlMenu(): void {
    this.cisMenuChange.emit(this.cisMenu);
    this.cisMenu = !this.cisMenu;
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

  public onToggleInfo(infoToggleValue): void {
    this.infoToggle = infoToggleValue;
  }

  // 选择组织
  public selectOrganizationId(value): void {
    console.log(value);
    this.personInfoModifyForm.patchValue({'organizationId': value});
  }
}

