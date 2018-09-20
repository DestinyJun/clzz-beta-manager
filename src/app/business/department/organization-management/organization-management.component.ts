import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReqService} from '../../../shared/req.service';
import {Field, OrganizationList, PageBody} from '../../../shared/global.service';
import {mobileValidators} from '../../../validator/Validators';
import {CommonfunService} from '../../../shared/commonfun.service';


@Component({
  selector: 'app-organization-management',
  templateUrl: './organization-management.component.html',
  styleUrls: ['./organization-management.component.css']
})
export class OrganizationManagementComponent implements OnInit {
  public datas: Array<OrganizationList>;
  public fieldsAdd: Array<Field>;
  public fieldsModify: Array<Field>;
  public modalRef: BsModalRef;
  public pageBody: PageBody;
  public num: number;
  public addForm: FormGroup;
  public modifyForm: FormGroup;
  public detail: OrganizationList;
  public hasChecked: Array<number> = [];
  public checked: string;
  public Fmodalid: any;
  public openstatus: boolean;
  public status: number;
  public inputvalid: boolean;
  public mustone: boolean;
  public gtone: boolean;
  public resMessage: string;
  public listenDescModal: boolean;
  constructor(
    private req: ReqService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private commonfun: CommonfunService
  ) {}
  ngOnInit() {
    this.status = 0;
    this.openstatus = true;
    this.inputvalid = false;
    this.mustone = false;
    this.gtone = false;
    this.listenDescModal = false;
    this.pageBody = new PageBody(1, 10);
    // 增加表单信息
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
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
      pid: ['-1', [Validators.required]]
    });
    // 修改表单信息
    this.modifyForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
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
    // 调用查看函数
    this.Update();
    this.req.FindDepartOrgani().subscribe(value => {
      this.Fmodalid = value.values.organizations;
      // this.addForm.patchValue({'pid': this.Fmodalid[0].id});
    });
  }
  // 控制模态框, 增，修，查
  public openModal(template: TemplateRef<any>, i): void {
    this.inputvalid = false;
    this.gtone = false;
    this.mustone = false;
    // this.controlSearchText = false;
    // 先判断要打开的是 哪个 模态框
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'lookdesc') {
      // console.log('这是详情查看');
      this.listenDescModal = true;
      this.detail = this.datas[i];
      this.modalRef = this.modalService.show(template, this.commonfun.getOperateModalConfig());
    }
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'modify') {
      // console.log('这是修改');
      if (this.hasChecked.length !== 1) {
        if (this.listenDescModal) {
          this.mustone = false;
          this.modifyForm.reset(this.detail);
          this.modalRef = this.modalService.show(template, this.commonfun.getOperateModalConfig());
          this.listenDescModal = false;
        }else {
          this.mustone = true;
        }
      } else {
        if (!this.listenDescModal) {
          this.detail = this.datas[this.hasChecked[0]];
        }
        this.mustone = false;
        this.modifyForm.reset(this.detail);
        this.modalRef = this.modalService.show(template, this.commonfun.getOperateModalConfig());
        this.listenDescModal = false;
      }

    }
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'add') {
      // console.log('增加');
      this.modalRef = this.modalService.show(template, this.commonfun.getOperateModalConfig());
    }
  }

  // 关闭模态框, 增，修，查
  public closeModal(): void {
    this.listenDescModal = false;
    this.modalRef.hide();
  }

  public SelectAddModalId(value): void {
    this.addForm.patchValue({'pid': value});
  }
  public SelectModifyModalId(value): void {
    this.modifyForm.patchValue({'pid': value});
  }
  // 监控翻页事件
  public getPageBody(event): void {
    this.pageBody = event;
    this.Update();
  }
  // 全选 或 全不选
  public getAllCheckBoxStatus(e): void {
    if (e.srcElement.checked === true) {
      this.hasChecked = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      this.hasChecked.splice(this.datas.length, 10);
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
      for (let j = 0; j < haschecklen; j++ ) {
        if (this.hasChecked[j] === i) {
          this.hasChecked.splice(j, 1);
        }
      }
    }
    if (this.hasChecked.length === 1) {
      this.detail = this.datas[this.hasChecked[0]];
    } else {
      this.detail = null;
    }
  }
//  删除表格 并且 重新请求数据(不管删除多少条，只请求数据刷新一次)
  public delete(): void {
    const haschecklen = this.hasChecked.length;
    if (haschecklen === 0) {
      this.mustone = false;
      this.gtone = true;
    } else {
      if (this.commonfun.deleteChecked(this.datas, this.hasChecked, 'name')) {
        this.openstatus = false;
        for (let j = 0; j < haschecklen; j++) {
          this.req.deleteOrganization('id=' +  this.datas[this.hasChecked[j]].id)
            .subscribe(res => {
              if (j === haschecklen - 1) {
                this.resMessage = res.message;
                this.status = Number(res.status);
                this.Update();
              }
            });
        }
      }
    }
  }
  // 生产线的添加 并且 重新请求数据，防止增加的是第十一条表格
  public con_add(): void {
    if (this.addForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.addOrganization(this.commonfun.parameterSerialization(this.addForm.value))
        .subscribe(res => {
          this.resMessage = res.message;
          this.status = Number(res.status);
          this.Update();
        });
    }else {
      this.inputvalid = true;
    }
  }
//  修改表格内容
  public con_modify(): void {
    if (this.modifyForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.updateOrganization(this.commonfun.parameterSerialization(this.modifyForm.value))
        .subscribe(res => {
          this.resMessage = res.message;
          this.status = Number(res.status);
          this.Update();
        });
    }else {
      this.inputvalid = true;
    }
  }
  // 刷新
  public Update(): void {
    this.gtone = false;
    this.mustone = false;
    this.req.findOrganization(this.commonfun.parameterSerialization(this.pageBody)).subscribe(
      (value) => {
        this.hasChecked = [];
        this.checked = '';
        this.num = Math.ceil(value.values.num / 10);
        this.datas = value.values.datas;
        // 阻止用户点击 复选框时，会弹出查看模态框
        const setinter = setInterval(() => {
          const trs = document.getElementsByTagName('tr');
          // trs 长度大于 1时， 取消setInterval
          if (trs.length > 1) {
            for (let i = 1; i < trs.length; ++i) {
              const check = trs[i].children[0];
              // 移除勾选框的title属性
              check.setAttribute('title', '');
              // check.removeAttribute('title');
              // 取消勾选框冒泡默认行为
              check.addEventListener('click', (e) => {
                e.stopImmediatePropagation();
              });
            }
            clearInterval(setinter);
          }
        });
      });
  }
  public cleanScreen(): void {
    this.openstatus = true;
    this.status = 0;
  }
}
