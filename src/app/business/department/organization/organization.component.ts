import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReqService} from '../../../shared/req.service';
import {DeparmentList, Field, PageBody, ValidMsg} from '../../../shared/global.service';
import {digitAndLetterValidator, mobileValidators} from '../../../validator/Validators';
import {CommonFunService} from '../../../shared/common-fun.service';


@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit, OnDestroy {
  public datas: Array<DeparmentList>;
  public fieldsAdd: Array<Field>;
  public fieldsModify: Array<Field>;
  public modalRef: BsModalRef;
  public pageBody: PageBody;
  public num: number;
  public addForm: FormGroup;
  public modifyForm: FormGroup;
  public detail: DeparmentList;
  public hasChecked: Array<DeparmentList> = [];
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
    private commonFun: CommonFunService
  ) {}
  ngOnInit() {
    this.commonFun.setCurrentComponentName('OrganizationComponent');
    this.status = 0;
    this.openstatus = true;
    this.inputvalid = false;
    this.mustone = false;
    this.gtone = false;
    this.listenDescModal = false;
    this.hasChecked = [];
    // 增加表单信息
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      dcode: ['', [Validators.required, digitAndLetterValidator]],
      tel: ['', [Validators.required, mobileValidators]],
      oid: ['', [Validators.required]],
      pid: ['-1', [Validators.required]]
    });
    // 修改表单信息
    this.modifyForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      dcode: ['', [Validators.required, digitAndLetterValidator]],
      tel: ['', [Validators.required, mobileValidators]],
      oid: ['', [Validators.required]],
      pid: ['', [Validators.required]]
    });
    this.fieldsAdd = [
      new Field('部门编号', 'dcode', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('digitAndLetter', '编号只能为数字和字母')]),
      new Field('部门名称', 'name', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('部门电话', 'tel', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('mobile', '请输入正确的手机号码')]),
    ];
    this.fieldsModify = [
      new Field('部门ID', 'id', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('部门名称', 'name', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('部门编号', 'dcode', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('部门电话', 'tel', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('mobile', '请输入正确的手机号码')]),
    ];
    this.req.FindDepartOrgani().subscribe(value => {
      this.Fmodalid = value.values;
    });
  }
  // 控制模态框, 增，修，查
  public openModal(template: TemplateRef<any>, data): void {
    this.inputvalid = false;
    this.gtone = false;
    this.mustone = false;
    // 先判断要打开的是 哪个 模态框
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'lookdesc') {
      // console.log('这是详情查看');
      this.listenDescModal = true;
      this.detail = data;
      this.modalRef = this.modalService.show(template);
    }
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'modify') {
      // console.log('这是修改');
      if (this.hasChecked.length !== 1) {
        if (this.listenDescModal) {
          this.mustone = false;
          this.modifyForm.reset(this.detail);
          this.modalRef = this.modalService.show(template);
          this.listenDescModal = false;
        }else {
          this.mustone = true;
        }
      } else {
        if (!this.listenDescModal) {
          this.detail = this.datas[this.datas.indexOf(this.hasChecked[0])];
        }
        this.mustone = false;
        this.modifyForm.reset(this.detail);
        this.modalRef = this.modalService.show(template);
        this.listenDescModal = false;
      }
    }
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'add') {
      this.modalRef = this.modalService.show(template);
    }
  }
  // 关闭模态框, 增，修，查
  public closeModal(): void {
    this.listenDescModal = false;
    this.modalRef.hide();
  }
  public selectAddModalOrgaId(value): void {
    this.addForm.patchValue({'oid': value});
  }
  public selectAddModalDeparId(value): void {
    this.addForm.patchValue({'pid': value});
  }
  public selectModifyModalOrgaId(value): void {
    this.modifyForm.patchValue({'oid': value});
  }
  public selectModifyModalDeparId(value): void {
    this.modifyForm.patchValue({'pid': value});
  }
  // 监控翻页事件
  public getPageBody(event): void {
    this.pageBody = event;
    this.Update();
  }
  // 全选 或 全不选
  public checkAll(): void {
    const checks = document.querySelectorAll('input[type=\'checkbox\']');
    for (let i = 1; i < checks.length; i++) {
      if (checks[0]['checked'] === true) {
        checks[i]['checked'] = true;
        // this.hasChecked = this.datas; 不能怎样赋值，因为datas是一个对象地址的引用，如果把datas赋给hasChecked, 那么操作hasCheck就等于操作datas
        this.datas.forEach(value => {
          this.hasChecked.push(value);
        });
      }else {
        checks[i]['checked'] = false;
        this.hasChecked = [];
      }
    }
  }
  // 得到已选择的checkBox
  public check(data, e): void {
    if (e.srcElement['checked'] === true) {
      this.hasChecked.push(data);
    }else {
      document.querySelector('input[type=\'checkbox\']')['checked'] = false;
      this.hasChecked.splice(this.datas.indexOf(data), 1);
    }
  }
//  删除表格 并且 重新请求数据(不管删除多少条，只请求数据刷新一次)
  public delete(): void {
    const haschecklen = this.hasChecked.length;
    if (haschecklen === 0) {
      this.mustone = false;
      this.gtone = true;
    } else {
      const bb = [];
      this.hasChecked.forEach(value => {
        bb.push(value.id);
      });
      if (confirm('你确定删除已勾选项吗?')) {
        this.openstatus = false;
        for (let j = 0; j < haschecklen; j++) {
          this.req.deleteDepartment('id=' +  this.hasChecked[j].id)
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
      this.req.addDepartment(this.commonFun.parameterSerialization(this.addForm.value))
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
      this.req.updateDepartment(this.commonFun.parameterSerialization(this.modifyForm.value))
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
    this.addForm.reset({pid: '-1'});
    this.req.findDepartment(this.commonFun.parameterSerialization(this.pageBody)).subscribe(
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

  ngOnDestroy(): void {
    this.commonFun.rememberMark('OrganizationComponent', this.pageBody);
    if (this.modalRef !== undefined) {this.modalRef.hide(); }
  }
}
