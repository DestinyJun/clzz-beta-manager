import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {CommonfunService} from '../../../../shared/commonfun.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ReqService} from '../../../../shared/req.service';
import 'rxjs/Rx';
import {CameraGroup, Field, PageBody, ValidMsg} from '../../../../shared/global.service';

@Component({
  selector: 'app-camera-group',
  templateUrl: './camera-group.component.html',
  styleUrls: ['./camera-group.component.css']
})
export class CameraGroupComponent implements OnInit {
  public datas: Array<CameraGroup>;
  public fieldsAdd: Array<Field>;
  public fieldsModify: Array<Field>;
  public listenDescModal: boolean;
  public modalRef: BsModalRef;
  public pageBody: PageBody;
  public num: number;
  public detail: CameraGroup;
  public addForm: FormGroup;
  public modifyForm: FormGroup;
  public hasChecked: Array<number> = [];
  public checked: string;
  public proLineids: any;
  public Fmodalid: any;
  public openstatus: boolean;
  public status: number;
  public inputvalid: boolean;
  public mustone: boolean;
  public gtone: boolean;
  public resMessage: string;
  public cameraGroupStatus: CameraGroupStatus[];
  // cameraGroupStatusPrompt 用来检测到 cameraGroupStatus 的 控件值不是为 0 ， 1，则提示用户。true 表示合法， false 则相反。
  public cameraGroupStatusPrompt = true;

  constructor(
    private modalService: BsModalService,
    private req: ReqService,
    private fb: FormBuilder,
    private commonfun: CommonfunService
  ) {
  }

  ngOnInit() {
    this.status = 0;
    this.openstatus = true;
    this.inputvalid = false;
    this.mustone = false;
    this.gtone = false;
    this.listenDescModal = false;
    this.pageBody = new PageBody(1, 10);
    // 显示页面增，修表单控件
    this.fieldsAdd = [];
    this.fieldsModify = [];
    // 增加模态框表单
    this.addForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      creator: ['', Validators.required],
      status: ['0', Validators.required],
      pId: ['', Validators.required],
      proSystem: ['']
    });
    this.modifyForm = this.fb.group({
      id: [''],
      UpdateId: ['', Validators.required],
      name: [''],
      creator: [''],
      status: [''],
      pId: [''],
      proSystem: ['']
    });
    this.fieldsAdd = [
      new Field('摄像机组编号', 'id', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('摄像机组名称', 'name', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('摄像机组创建人', 'creator', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('摄像机组状态', 'status', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('所属部门ID', 'pId', 'text', [new ValidMsg('required', '* 必填项')]),
    ];
    this.fieldsModify = [
      new Field('原摄像机编号', 'UpdateId', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('请输入修正的摄像机ID', 'id', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('摄像机组名称', 'name', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('摄像机组创建人', 'creator', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('摄像机组状态', 'status', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('所属部门ID', 'pId', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('操作', 'proSystem', 'text', [new ValidMsg('required', '* 必填项')]),
    ];
    // 得到所有的组织id
    this.req.FindDepartOrgani().subscribe(value => {
      // this.Fmodalid = value.values.departments;  // 这有问题，id 为undefined， 只有下面才不会出现问题
      this.Fmodalid = value.values || null;
      for (let i = 0; i < this.Fmodalid.departments.length; i++) {
        this.Fmodalid.departments[i].id = String(this.Fmodalid.departments[i].id);
      }
    });
    // 得到所有的生产线id
    this.req.FindsystemSysid().subscribe(value => {
      this.proLineids = value.values || null;
    });
    this.cameraGroupStatus = [
      {status: 1, msg: '开启'},
      {status: 0, msg: '停用'},
    ];
    this.Update();
  }

  // 选择状态
  public selectStatus(value, form): void {
      form.patchValue({status: value});
  }
  // 增，修。选择模块id
  public selectModalId(modalId, form): void {
    form.patchValue({pId: modalId});
  }
  // 增，修。选择生产线id
  public selectLineId(lineId, form): void {
    form.patchValue({proSystem: lineId});
  }

  // 控制模态框, 增，修，查
  public openModal(template: TemplateRef<any>, i): void {
    this.inputvalid = false;
    this.gtone = false;
    this.mustone = false;
    // 先判断要打开的是 哪个 模态框
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'lookdesc') {
      this.listenDescModal = true;
      this.detail = this.datas[i];
      this.modalRef = this.modalService.show(template);
    }
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'modify') {
      if (this.hasChecked.length !== 1) {
        if (this.listenDescModal) {
          this.mustone = false;
          this.modifyForm.reset(this.detail);
          this.modifyForm.patchValue({UpdateId: this.detail.id});
          this.modifyForm.patchValue({name: this.detail.value});
          this.modalRef = this.modalService.show(template);
          this.listenDescModal = false;
        } else {
          this.mustone = true;
        }
      } else {
        if (!this.listenDescModal) {
          this.detail = this.datas[this.hasChecked[0]];
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

  // 翻页
  public getPageBody(event): void {
    this.pageBody.page = event.page;
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
      for (let j = 0; j < haschecklen; j++) {
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

//  删除表格 并且 重新请求数据
  public delete(): void {
    const haschecklen = this.hasChecked.length;
    if (haschecklen === 0) {
      this.gtone = true;
      this.mustone = false;
    } else {
      if (this.commonfun.deleteChecked(this.datas, this.hasChecked, 'value')) {
        this.openstatus = false;
        for (let j = 0; j < haschecklen; j++) {
          const body = 'id=' + this.datas[this.hasChecked[j]].id + '&creator=' + this.datas[this.hasChecked[j]].creator;
          this.req.deleteVideomanager(body)
            .subscribe((res) => {
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
    if (this.addForm.value) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.addVideomanager(this.commonfun.parameterSerialization(this.addForm.value))
        .subscribe(res => {
          this.resMessage = res.message;
          this.status = Number(res.status);
          this.Update();
        });
    } else {
      this.inputvalid = true;
    }
  }

//  修改表格内容
  public con_modify(): void {
    if (this.modifyForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.updateVideomanager(this.commonfun.parameterSerialization(this.modifyForm.value))
        .subscribe(res => {
          this.resMessage = res.message;
          this.status = Number(res.status);
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
    this.req.findVideomanager(this.commonfun.parameterSerialization(this.pageBody))
      .subscribe(value => {
        this.num = value.values.totalPage;
        this.datas = value.values.contents;
        // 阻止用户点击 复选框时，会弹出查看模态框
        const setInter = setInterval(() => {
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
            clearInterval(setInter);
          }
        });
        this.hasChecked = [];
        this.checked = '';
      });
  }

  // 清除屏幕
  public cleanScreen(): void {
    this.openstatus = true;
    this.status = 0;
  }
}


interface CameraGroupStatus {
  status: number;
  msg: string;
}
