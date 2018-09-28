import {digitAndLetterValidator} from '../../../../validator/Validators';
import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {CommonfunService} from '../../../../shared/commonfun.service';
import {ReqService} from '../../../../shared/req.service';
import {Camera, Field, PageBody, ValidMsg} from '../../../../shared/global.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})

export class CameraComponent implements OnInit {
  public datas: Array<Camera>;
  public fieldsAdd: Array<Field>;
  public fieldsModify: Array<Field>;
  public listenDescModal: boolean;
  public modalRef: BsModalRef;
  public pageBody: PageBody;
  public num: number;
  public detail: any;
  public addForm: FormGroup;
  public modifyForm: FormGroup;
  public hasChecked: Array<number> = [];
  public checked: string;
  public Fmodalid: any;
  public userid: any;
  public openstatus: boolean;
  public status: number;
  public inputvalid: boolean;
  public mustone: boolean;
  public gtone: boolean;
  public resMessage: string;
  // gid 用来保存要查询的摄像机组的id
  public gid: string;
  constructor(
    private modalService: BsModalService,
    private req: ReqService,
    private fb: FormBuilder,
    private commonfun: CommonfunService,
    private routerInfo: ActivatedRoute
  ) {}
  ngOnInit() {
    this.status = 0;
    this.openstatus = true;
    this.inputvalid = false;
    this.mustone = false;
    this.gtone = false;
    this.listenDescModal = false;
    // 对表格的初始化
    this.pageBody = new PageBody(1, 10);
    // 显示页面增，修表单控件
    this.fieldsAdd = [];
    this.fieldsModify = [];
    this.addForm = this.fb.group({
      id: ['', [Validators.required, digitAndLetterValidator]],
      name: ['', [Validators.required]],
      creator: ['', [Validators.required]],
      innerUrl: [''],
      outerUrl: ['', [Validators.required]],
      gId: ['', [Validators.required]]
    });
    this.modifyForm = this.fb.group({
      id: ['', [Validators.required, digitAndLetterValidator]],
      Update_id: ['', [Validators.required]],
      name: [''],
      creator: [''],
      innerUrl: [''],
      outerUrl: [''],
      gId: ['']
    });
    this.fieldsAdd = [
      new Field('摄像机编号', 'id', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('digitAndLetter', '编号只能为数字和字母')]),
      new Field('摄像机名称', 'name', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('摄像机创建人', 'creator', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('摄像机内网地址', 'innerUrl', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('摄像机外网地址', 'outerUrl', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('所属摄像机组编号', 'gId', 'text', [new ValidMsg('required', '* 必填项')]),
    ];
    this.fieldsModify = [
      new Field('摄像机编号', 'id', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('digitAndLetter', '编号只能为数字和字母')]),
      new Field('摄像机名称', 'name', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('摄像机创建人', 'creator', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('摄像机内网地址', 'innerUrl', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('摄像机外网地址', 'outerUrl', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('所属摄像机组编号', 'gId', 'text', [new ValidMsg('required', '* 必填项')]),
    ];
    // 拿到从摄像机组传过来的摄像组的id 值，用来查询该组下面的摄像机
    this.routerInfo.params.subscribe((value) => {
      this.gid = value.id;
      this.addForm.patchValue({gId: this.gid});
    });
    this.Update();
  }
  // 控制模态框, 增，修，查
  public openModal(template: TemplateRef<any>, i): void {
    this.inputvalid = false;
    this.gtone = false;
    this.mustone = false;
    // this.controlSearchText = false;
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
          this.modifyForm.patchValue({Update_id: this.detail.id, id: '', name: this.detail.value});
          this.modalRef = this.modalService.show(template);
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
        this.modifyForm.patchValue({Update_id: this.detail.id, id: '', name: this.detail.value});
        this.modalRef = this.modalService.show(template);
        this.listenDescModal = false;
      }

    }
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'add') {
      // console.log('增加');
      this.modalRef = this.modalService.show(template);
    }
  }

  // 关闭模态框, 增，修，查
  public closeModal(): void {
    this.listenDescModal = false;
    this.modalRef.hide();
  }
  public SelectAddModalId(value): void {
    this.addForm.patchValue({'p_id': value});
  }

  public SelectModifyModalId(value): void {
    this.modifyForm.patchValue({'p_id': value});
  }
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
      this.mustone = false;
      this.gtone = true;
    } else {
      if (this.commonfun.deleteChecked(this.datas, this.hasChecked, 'value')) {
        this.openstatus = false;
        for (let j = 0; j < haschecklen; j++) {
          const body = 'id=' + this.datas[this.hasChecked[j]].id + '&creator=' + this.datas[this.hasChecked[j]].creator;
          this.req.deleteVideo(body)
            .subscribe(res => {
              this.resMessage = res.message;
              this.status = Number(res.status);
              if (j === haschecklen - 1) {
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
      this.req.addVideo(this.commonfun.parameterSerialization(this.addForm.value))
        .subscribe(res => {
          console.log(res);
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
    console.log(this.modifyForm.value);
    if (this.modifyForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.updateVideo(this.commonfun.parameterSerialization(this.modifyForm.value))
        .subscribe(res => {
          console.log(res);
          this.resMessage = res.message;
          this.status = Number(res.status);
          this.Update();
        });
    } else {
      this.inputvalid = false;
    }
  }
  // 在增加， 删除，修改后即时刷新
  public Update(): void {
    this.gtone = false;
    this.mustone = false;
    this.req.findVideos('gId=' + this.gid + '&page=' + this.pageBody.page + '&row=' + this.pageBody.row)
      .subscribe(value => {
        console.log(value);
        this.num = value.values.totalPage;
        this.datas = value.values.contents;
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
