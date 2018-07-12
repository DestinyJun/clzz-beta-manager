import {Component, OnInit, TemplateRef} from '@angular/core';
import {PageBody, UsersManager} from '../../shared/global.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReqService} from '../../shared/req.service';
import { mobileValidators} from '../../validator/Validators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public Users: Array<UsersManager>;
  public modalRef: BsModalRef;
  public pageBody: PageBody;
  public num: number;
  public userDetail: any;
  public userAddForm: FormGroup;
  public userModifyForm: FormGroup;
  public hasChecked: Array<number> = [];
  public checked: string;
  public Fmodalid: any;
  public openstatus: boolean;
  public status: number;
  public inputvalid: boolean;
  public mustone: boolean;
  public gtone: boolean;
  constructor(public modalService: BsModalService,
              public req: ReqService,
              public fb: FormBuilder) {
    //  增加模态框表单
    this.userAddForm = fb.group({
      userCode: ['', Validators.required],
      idCode: ['', [Validators.required, Validators.minLength(18), Validators.maxLength(18)]],
      realName: ['', Validators.required],
      userName: ['', Validators.required],
      homeAddress: ['', Validators.required],
      homeTelephone: ['', Validators.required],
      organizationId: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      phone: ['', [Validators.required, mobileValidators]],
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', Validators.required],
      gender: ['', Validators.required]
    });
    this.userModifyForm = fb.group({
      id: ['', Validators.required],
      userCode: ['', Validators.required],
      idCode: ['', [Validators.required, Validators.minLength(18), Validators.maxLength(18)]],
      realName: ['', Validators.required],
      userName: ['', Validators.required],
      homeAddress: ['', Validators.required],
      homeTelephone: ['', Validators.required],
      organizationId: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      phone: ['', [Validators.required, mobileValidators]],
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.status = 0;
    this.openstatus = true;
    this.inputvalid = false;
    this.mustone = false;
    this.gtone = false;
    // 对表格的初始化
    this.pageBody = new PageBody(1, 6);
    this.Update();
    this.req.FindDepartOrgani().subscribe(value => {
      this.Fmodalid = value.values;
      this.userAddForm.patchValue({'organizationId': this.Fmodalid.organizations[0].id});
    });
  }
  public SelectAddModalId(value): void {
    this.userAddForm.patchValue({'organizationId': value});
  }
  public SelectModifyModalId(value): void {
    this.userModifyForm.patchValue({'organizationId': value});
  }
  public getPageBody(event): void {
    this.pageBody = event;
    this.Update();
  }
  // 控制模态框
  public openuser(template: TemplateRef<any>): void {
    this.inputvalid = false;
    this.gtone = false;
    if (this.hasChecked.length > 1 || this.hasChecked.length === 0) {
      this.mustone = true;
    } else {
      this.mustone = false;
      this.userDetail['organizationId'] = Number(this.userDetail['organizationId']);
      this.userModifyForm.reset(this.userDetail);
      this.modalRef = this.modalService.show(template);
    }
  }
  // 控制模态框增加
  public openuserAdd(template: TemplateRef<any>): void {
    this.inputvalid = false;
    this.mustone = false;
    this.gtone = false;
    this.modalRef = this.modalService.show(template);
  }
  // 全选 或 全不选
  public getAllCheckBoxStatus(e): void {
    if (e.srcElement.checked === true) {
      this.hasChecked = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      this.hasChecked.splice(this.Users.length, 10);
      this.checked = 'checked';
    } else {
      this.hasChecked = [];
      this.checked = '';
    }
  }
  // 得到已选择的checkBox
  public getCheckBoxStatus(e, i): void {
    const haschecklen = this.hasChecked.length;
    if (e.srcElement.checked === true) {
      this.hasChecked.push(i);
    } else {
      for (let j = 0; j < haschecklen; j++) {
        if (this.hasChecked[j] === i) {
          this.hasChecked.splice(j, 1);
        }
      }
    }
    if (this.hasChecked.length === 1) {
      this.userDetail = this.Users[this.hasChecked[0]];
    } else {
      this.userDetail = null;
    }
  }
//  删除表格 并且 重新请求数据
  public deleteuser(): void {
    const haschecklen = this.hasChecked.length;
    if (haschecklen === 0) {
      this.mustone = false;
      this.gtone = true;
    } else {
      this.openstatus = false;
      for (let j = 0; j < haschecklen; j++) {
        this.req.UsersManagerDelete({id: this.Users[this.hasChecked[j]].id})
          .subscribe(status => {
            this.status = Number(status.status);
            if (j === haschecklen - 1) {
              this.Update();
            }
          });
      }
    }

  }
  // 生产线的添加 并且 重新请求数据，防止增加的是第十一条表格
  public userAdd(): void {
    if (this.userAddForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.UsersManagerAdd(this.userAddForm.value)
        .subscribe(status => {
          this.status = Number(status.status);
          this.Update();
        });
    } else {
      this.inputvalid = true;
    }
  }
//  修改表格内容
  public userModify(): void {
    if (this.userModifyForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.UsersManagerModify(this.userModifyForm.value)
        .subscribe(status => {
          this.status = Number(status.status);
          this.Update();
        });
    } else {
      this.inputvalid = true;
    }
  }
  // 在增加， 删除，修改后即时刷新
  public Update(): void {
    this.gtone = false;
    this.mustone = false;
    this.req.getUsersManager(this.pageBody)
      .subscribe(value => {
        this.Users = value.data;
        setTimeout(() => {
          this.openstatus = true;
          this.status = 0;
        }, 2500);
        this.hasChecked = [];
        this.checked = '';
      });
    this.req.getUsersManagerCount()
      .subscribe(num => {
        this.num = Math.ceil(num.data / 6);
      });
  }
}
