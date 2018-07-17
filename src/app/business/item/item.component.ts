import {Component, OnInit, TemplateRef} from '@angular/core';
import {CommonfunService} from '../../shared/commonfun.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReqService} from '../../shared/req.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {ItemField, ItemList, PageBody} from '../../shared/global.service';
import {getFullYear} from 'ngx-bootstrap/chronos/utils/date-getters';

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
  public validTimeFormat: boolean;
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
    this.validTimeFormat = false;
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
      // new ItemField('巡检起始时间',	'starttime')
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
      // new ItemField('巡检起始时间',	'starttime')
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
      starttime: ['', Validators.required]
      // starttime1: ['', Validators.required]
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
      // starttime: ['', Validators.required]
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
      // 拿到时间戳
      const dateEle = document.getElementsByTagName('input');
      this.mustone = false;
      this.itemModifyForm.reset(this.detail);
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
    this.getTime();
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

  // 时间格式验证 和 得到时间戳
  public getTime(): boolean {
    let isCorrectYear = true;
    let isCorrectMouth = true;
    let isCorrectDay = true;
    let isCorrectHour = true;
    let isCorrectMinutes = true;
    const date = new Date();
    const year = document.getElementsByClassName('year')[0].textContent;
    const mouth = document.getElementsByClassName('mouth')[0].textContent;
    const day = document.getElementsByClassName('day')[0].textContent;
    const hour = document.getElementsByClassName('hour')[0].textContent;
    const minutes = document.getElementsByClassName('minutes')[0].textContent;
    // 判断年是否成立
    for (let i = 0; i < year.length; ++i) {
      if (year.charCodeAt(i) < 48 || year.charCodeAt(i) > 57) {
        isCorrectYear = false;
        break;
      }
    }
    if (isCorrectYear && (Number(year) >= 0 && year !== '')) {
      date.setFullYear(Number(year));
      isCorrectYear = true;
    }else {
      isCorrectYear = false;
    }
    // 判断月
    for (let i = 0; i < mouth.length; ++i) {
      if (mouth.charCodeAt(i) < 48 || mouth.charCodeAt(i) > 57) {
        isCorrectMouth = false;
        break;
      }
    }
    if (isCorrectMouth && (Number(mouth) >= 0 && Number(mouth) <= 12 && mouth !== '')) {
      date.setMonth(Number(mouth));
      isCorrectMouth = true;
    }else {
      isCorrectMouth = false;
    }
    // 判断日
    for (let i = 0; i < day.length; ++i) {
      if (day.charCodeAt(i) < 48 || day.charCodeAt(i) > 57) {
        isCorrectDay = false;
        break;
      }
    }
    if (isCorrectYear && isCorrectMouth && isCorrectDay) {
      if (Number(mouth) === 2) {
        if ((Number(year) % 4 === 0 && Number(year) % 100 !== 0) || Number(year) % 400 !== 0) {
          if (Number(day) >= 0 && Number(day) <= 29) {
            date.setDate(Number(day));
            isCorrectDay = true;
          }else {
            isCorrectDay = false;
          }
        }else {
          if (Number(day) >= 0 && Number(day) <= 28) {
            date.setDate(Number(day));
            isCorrectDay = true;
          }else {
            isCorrectDay = false;
          }
        }
      }else if (Number(isCorrectMouth) === 1 && Number(isCorrectMouth)  === 3 && Number(isCorrectMouth)  === 5 && Number(isCorrectMouth)  === 7 && Number(isCorrectMouth)  === 8 && Number(isCorrectMouth)  === 10 && Number(isCorrectMouth)  === 12) {
          if (Number(day) >= 0 && Number(day) <= 31) {
            date.setDate(Number(day));
            isCorrectDay = true;
          }else {
            isCorrectDay = false;
          }
      }else {
        if (Number(day) >= 0 && Number(day) <= 30) {
          date.setDate(Number(day));
          isCorrectDay = true;
        }else {
          isCorrectDay = false;
        }
      }
    }else {
      isCorrectDay = false;
    }
    // 判断小时 24 小时制
    for (let i = 0; i < hour.length; ++i) {
      if (hour.charCodeAt(i) < 48 || hour.charCodeAt(i) > 57) {
        isCorrectHour = false;
        break;
      }
    }
    if (isCorrectHour && (Number(hour) >= 0 && Number(hour) <= 23 && hour !== '')) {
      date.setHours(Number(hour));
      isCorrectHour = true;
    }else {
      isCorrectHour = false;
    }
    // 判断分钟
    for (let i = 0; i < minutes.length; ++i) {
      if (minutes.charCodeAt(i) < 48 || minutes.charCodeAt(i) > 57) {
        isCorrectMinutes = false;
        break;
      }
    }
    if (isCorrectMinutes && (Number(minutes) >= 0 && Number(minutes) <= 59) && minutes !== '') {
      date.setMinutes(Number(minutes));
      isCorrectMinutes = true;
    }else {
      isCorrectMinutes = false;
    }

    if (isCorrectYear && isCorrectMouth && isCorrectDay && isCorrectMinutes && isCorrectHour) {
      this.validTimeFormat = false;
      this.itemAddForm.patchValue({starttime: date.getTime()});
    }else {
      this.validTimeFormat = true;
      this.itemAddForm.patchValue({starttime: ''});
    }
    return true;
  }
}
