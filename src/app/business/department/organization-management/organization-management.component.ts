import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReqService} from '../../../shared/req.service';
import {OrganizationList, PageBody} from '../../../shared/global.service';
import {mobileValidators} from '../../../validator/Validators';


@Component({
  selector: 'app-organization-management',
  templateUrl: './organization-management.component.html',
  styleUrls: ['./organization-management.component.css']
})
export class OrganizationManagementComponent implements OnInit {
  public organizations: Array<OrganizationList>;
  public modalRef: BsModalRef;
  public formModel: FormGroup;
  public formModel3: FormGroup;
  public boo = false;
  public status: Array<boolean>;
  public num: number;
  public Detail: OrganizationList;
  public pageBody: PageBody;
  public Fmodalid: any;
  public openstatus: boolean;
  public status1: number;
  public inputvalid: boolean;
  public mustone: boolean;
  public gtone: boolean;
  public resMessage: string;
  constructor(
    private req: ReqService,
    private modalService: BsModalService,
    private fb: FormBuilder
  ) {

    // 修改表单信息
    this.formModel = fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      code: ['', [Validators.required]],
      otype: ['', [Validators.required]],
      tel: ['', [Validators.required, mobileValidators]],
      fax: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      corpphone: ['', [Validators.required, mobileValidators]],
      corpname: ['', [Validators.required]],
      registerdate: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      pid: ['', [Validators.required]]
    });
    this.formModel3 = fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      code: ['', [Validators.required]],
      otype: ['', [Validators.required]],
      tel: ['', [Validators.required, mobileValidators]],
      fax: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      corpphone: ['', [Validators.required, mobileValidators]],
      corpname: ['', [Validators.required]],
      registerdate: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      pid: ['', [Validators.required]]
    });
  }
  ngOnInit() {
    this.status1 = 0;
    this.openstatus = true;
    this.inputvalid = false;
    this.mustone = false;
    this.gtone = false;
    this.pageBody = new PageBody(1, 10);
    // 调用查看函数
    this.Request();
    this.req.FindDepartOrgani().subscribe(value => {
      this.Fmodalid = value.values.organizations;
      this.formModel.patchValue({'pid': this.Fmodalid[0].id});
    });
  }
  public SelectAddModalId(value): void {
    this.formModel.patchValue({'pid': value});
  }
  public SelectModifyModalId(value): void {
    this.formModel3.patchValue({'pid': value});
  }
  // 模态框
  public openModal(template: TemplateRef<any>) {
    this.inputvalid = false;
    this.mustone = false;
    this.gtone = false;
    this.modalRef = this.modalService.show(template);
  }
  // 复选框全选
  All2() {
    this.boo = !this.boo;
    for (let i = 0; i < this.status.length; i++) {
      this.status[i] = this.boo;
    }
  }

  // 点击复选框获取需要删除的id
  public Obtain(i) {
    this.status[i] = !this.status[i];
    for (let i = 0; i < this.status.length; i++) {
      if (this.status[i] === false) {
        this.boo = false;
        break;
      }
    }
  }
// 监控翻页事件
  public getPageBody(event): void {
    this.pageBody = event;
    this.Request();
  }
  // 查看
  public Request(): void {
    this.gtone = false;
    this.mustone = false;
    this.req.findOrganization(this.parameterSerialization(this.pageBody))
      .subscribe((value) => {
        this.organizations = value.values.datas;
        this.num = Math.ceil(value.values.num / 10);
        setTimeout(() => {
          this.openstatus = true;
          this.status1 = 0;
        }, 2500);
        const s: Array<boolean> = [];
        const length = this.organizations.length;
        this.formModel.patchValue({'pid': value});
        for(let i = 0; i < length ; i++)
          s.push(false);
        this.status = s;
      });
    // 复选框状态数组与接收到的数组长度长度一致
  }
  // 模态框二
  public openModal2(template: TemplateRef<any>) {
    this.inputvalid = false;
    let i: number, j;
    let n = 0;
    for (i = 0; i < this.status.length; i++) {
      if (this.status[i] === true) {
        j = i;
        n++;
      }
    }
    if ( n === 1 && this.boo !== true) {
      this.mustone = false;
      this.formModel3.reset();
      this.Detail = this.organizations[j];
      this.formModel3.patchValue(this.Detail);
      this.modalRef = this.modalService.show(template);
    } else {
      this.mustone = true;
      this.gtone = false;
    }
  }
  // 增加
  public insert() {
    if (this.formModel.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.addOrganization(this.parameterSerialization(this.formModel.value)).subscribe((res) => {
        this.resMessage = res.message;
        this.status1 = Number(res.status);
        this.Request();
      });
    } else {
      this.inputvalid = true;
    }
  }
  // 删除
  public Delete() {
    this.openstatus = false;
    this.gtone = true;
    this.mustone = false;
    let i: number;
    // 判断是否被选中，若选中，则执行删除
    for (i = 0; i < this.status.length; i++) {
      if (this.status[i] === true ) {
        const body = 'id=' + this.organizations[i].id ;
        this.req.deleteOrganization(body).subscribe((res) => {
          this.resMessage = res.message;
          this.status1 = Number(res.status);
          this.Request();
        });
      }
    }
  }
  // 修改
  public Update() {
    console.log(this.formModel3.value);
    console.log(this.formModel3.valid);
    if (this.formModel3.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.updateOrganization(this.parameterSerialization(this.formModel3.value)).subscribe((res) => {
        this.resMessage = res.message;
        this.status1 = Number(res.status);
        this.Request();
      });
    } else {
      this.inputvalid = true;
    }
  }
  // 翻页参数序列化
  public parameterSerialization(obj: PageBody): string {
    let result: string;
    for (const prop in this.pageBody) {
      if (this.pageBody.hasOwnProperty(prop)) {
        if (result) {
          result = result + prop + '=' + this.pageBody[prop] + '&';
        } else {
          result = prop + '=' + this.pageBody[prop] + '&';
        }
      }
    }
    return result;
  }
  // 表单参数序列化
  public parameterSerializationForm(form: JSON): string {
    let result: string;
    for (const f in form) {
      if (result) {
        result = result + f + '=' + form[f] + '&';
      } else {
        result = f + '=' + form[f] + '&';
      }
    }
    return result;
  }
}
