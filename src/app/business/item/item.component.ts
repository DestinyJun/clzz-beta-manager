import {Component, OnInit, TemplateRef} from '@angular/core';
import {CommonfunService} from '../../shared/commonfun.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReqService} from '../../shared/req.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {ItemField, ItemList, PageBody} from '../../shared/global.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  public items: Array<ItemList>;
  public fieldsAdd: Array<ItemField>;
  public fieldsModify: Array<ItemField>;
  public modalRef: BsModalRef;
  public pageBody: PageBody;
  public num: number;
  public itemAddForm: FormGroup;
  public itemModifyForm: FormGroup;
  public detail: ItemList;
  public hasChecked: Array<number> = [];
  public checked: string;
  public Fmodalid: any;
  public openstatus: boolean;
  public status: number;
  public inputvalid: boolean;
  public mustone: boolean;
  public gtone: boolean;
  public resMessage: string;
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
    // 对表格的初始化
    this.pageBody = new PageBody(1, 10);
    this.fieldsAdd = [
      new ItemField('项目名称',	'itemname'),
      new ItemField('项目位置',	'itemposition'),
      new ItemField('项目位置经度',	'longitude'),
      new ItemField('项目位置纬度',	'latitude'),
      new ItemField('项目明细',	'itemdetail'),
      new ItemField('单位编号',	'unitcode'),
      new ItemField('项目巡检成员',	'itemmembers'),
      new ItemField('巡检时间间隔（单位：小时）',	'timecell'),
      new ItemField('巡检起始时间',	'starttime'),
      new ItemField('插入时间',	'idt')
    ];
    this.fieldsModify = [
      new ItemField('项目编号',	'itemcode'),
      new ItemField('项目名称',	'itemname'),
      new ItemField('项目位置',	'itemposition'),
      new ItemField('经度',	'longitude'),
      new ItemField('纬度',	'latitude'),
      new ItemField('项目明细',	'itemdetail'),
      new ItemField('单位编号',	'unitcode'),
      new ItemField('项目巡检成员',	'itemmembers'),
      new ItemField('巡检时间间隔（单位：小时）',	'timecell'),
      new ItemField('巡检起始时间',	'starttime')
    ];
    //  增加表单
    this.itemAddForm = this.fb.group({
      itemname: ['', Validators.required],
      itemposition: ['', Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required],
      itemdetail: ['', Validators.required],
      unitcode: ['', Validators.required],
      itemmembers: ['', Validators.required],
      timecell: ['', Validators.required],
      starttime: ['', Validators.required],
      idt: ['', Validators.required]
    });
    this.itemModifyForm = this.fb.group({
      itemcode: ['', Validators.required],
      itemname: ['', Validators.required],
      itemposition: ['', Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required],
      itemdetail: ['', Validators.required],
      unitcode: ['', Validators.required],
      itemmembers: ['', Validators.required],
      timecell: ['', Validators.required],
      starttime: ['', Validators.required]
    });
    this.Update();
  }
  // 控制模态框
  public itemModal(template: TemplateRef<any>): void {
    this.inputvalid = false;
    this.gtone = false;
    if (this.hasChecked.length > 1 || this.hasChecked.length === 0) {
      this.mustone = true;
    } else {
      this.mustone = false;
      console.log(this.detail);
      this.itemModifyForm.reset(this.detail);
      // this.itemModifyForm.patchValue(this.detail);
      this.modalRef = this.modalService.show(template);
    }
  }
  // 控制模态框增加
  public itemAddModal(template: TemplateRef<any>): void {
    this.mustone = false;
    this.gtone = false;
    this.inputvalid = false;
    this.modalRef = this.modalService.show(template);
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
      this.hasChecked.splice(this.items.length, 10);
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
      this.detail = this.items[this.hasChecked[0]];
    } else {
      this.detail = null;
    }
  }
//  删除表格 并且 重新请求数据(不管删除多少条，只请求数据刷新一次)
  public deleteItem(): void {
    const haschecklen = this.hasChecked.length;
    if (haschecklen === 0) {
      this.mustone = false;
      this.gtone = true;
    } else {
      this.mustone = false;
      this.openstatus = false;
      for (let j = 0; j < haschecklen; j++) {
        this.req.ItemDelete('did=' +  this.items[this.hasChecked[j]].itemcode)
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
  // 生产线的添加 并且 重新请求数据，防止增加的是第十一条表格
  public itemAdd(): void {
    if (this.itemAddForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.ItemAdd(this.commonfun.parameterSerialization(this.itemAddForm.value))
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
  public itemModify(): void {
    if (this.itemModifyForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.ItemModify(this.commonfun.parameterSerialization(this.itemModifyForm.value))
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
    this.req.ItemFind(this.commonfun.parameterSerialization(this.pageBody)).subscribe(
      (value) => {
        this.hasChecked = [];
        this.checked = '';
        this.num = Math.ceil(value.values.num / 10);
        this.items = value.values.itemInfoDTOs;
        setTimeout(() => {
          this.openstatus = true;
          this.status = 0;
        }, 2500);
      });
  }
}
