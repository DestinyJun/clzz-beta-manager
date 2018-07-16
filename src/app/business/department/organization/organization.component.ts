import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReqService} from '../../../shared/req.service';
import {DeparmentList, PageBody} from '../../../shared/global.service';
import {CommonfunService} from '../../../shared/commonfun.service';


@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  public Departments: Array<DeparmentList>;
  public modalRef: BsModalRef;
  public formModel: FormGroup;
  public formModel3: FormGroup;
  public boo = false;
  public status: Array<boolean>;
  public num: number;
  public pageBody: PageBody;
  public Detail: DeparmentList;
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
    private fb: FormBuilder,
    private commonfun: CommonfunService
  ) {
    // 增加表单信息
    this.formModel = fb.group({
      name: ['', [Validators.required]],
      dcode: ['', [Validators.required]],
      tel: ['', [Validators.required]],
      oid: ['-1', [Validators.required]],
      pid: ['-1', [Validators.required]]
    });
    // 修改表单信息
    this.formModel3 = fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      dcode: ['', [Validators.required]],
      tel: ['', [Validators.required]],
      oid: ['', [Validators.required]],
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
      this.Fmodalid = value.values;
      // this.formModel.patchValue({'oid': this.Fmodalid.organizations[0].id});
      // this.formModel.patchValue({'pid': this.Fmodalid.departments[0].id});
    });
  }
  public SelectAddModalOrgaId(value): void {
    this.formModel.patchValue({'oid': value});
  }
  public SelectAddModalDeparId(value): void {
    this.formModel.patchValue({'pid': value});
  }
  public SelectModifyModalOrgaId(value): void {
    this.formModel3.patchValue({'oid': value});
  }
  public SelectModifyModalDeparId(value): void {
    this.formModel3.patchValue({'pid': value});
  }
  // 模态框
  public openModal(template: TemplateRef<any>) {
    this.inputvalid = false;
    this.mustone = false;
    this.gtone = false;
    this.modalRef = this.modalService.show(template);
  }
  // 模态框二
  public openModal2(template: TemplateRef<any>) {
    this.inputvalid = false;
    this.gtone = false;
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
      this.Detail = this.Departments[j];
      this.formModel3.reset();
      this.formModel3.patchValue(this.Detail);
      this.modalRef = this.modalService.show(template);
    }else {
      this.mustone = true;
    }
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
    this.req.findDepartment(this.commonfun.parameterSerialization(this.pageBody))
      .subscribe((value) => {
        this.Departments = value.values.datas;
        this.num = Math.ceil(value.values.num / 10);
        setTimeout(() => {
          this.openstatus = true;
          this.status1 = 0;
        }, 2500);
        const s: Array<boolean> = [];
        const length = this.Departments.length;
        this.formModel.patchValue({'pid': this.Departments[0].id});
        for (let i = 0; i < length ; i++)
          s.push(false);
        this.status = s;
      });
    // 复选框状态数组与接收到的数组长度长度一致
  }
  // 增加
  public insert() {
    if (this.formModel.valid) {
      console.log(this.formModel.value);
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.addDepartment(this.commonfun.parameterSerialization(this.formModel.value)).subscribe((res) => {
        console.log(res);
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
        const body = 'id=' + this.Departments[i].id ;
        this.req.deleteDepartment(body).subscribe((res) => {
          this.resMessage = res.message;
          this.status1 = Number(res.status);
          this.Request();
        });
      }
    }
  }
  // 修改
  public Update() {
    if (this.formModel3.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.updateDepartment(this.commonfun.parameterSerialization(this.formModel3.value))
        .subscribe((res) => {
          this.resMessage = res.message;
          this.status1 = Number(res.status);
          this.Request();
        });
    } else {
      this.inputvalid = true;
    }
  }

}
