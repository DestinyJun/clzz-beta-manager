import {Component, OnInit, TemplateRef} from '@angular/core';
import {CommonfunService} from '../../shared/commonfun.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReqService} from '../../shared/req.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {Field, ItemList, PageBody} from '../../shared/global.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  public datas: Array<ItemList>;
  public fieldsAdd: Array<Field>;
  public fieldsModify: Array<Field>;
  public modalRef: BsModalRef;
  public pageBody: PageBody;
  public num: number;
  public addForm: FormGroup;
  public modifyForm: FormGroup;
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
  public controlSearchText: boolean;
  // 用来监听模态框 是否 是从查看详情 跳转到 修改模态框
  public listenDescModal: boolean;
  public QRcodeValue: string;
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
    this.controlSearchText = false;
    this.listenDescModal = false;
    // 对表格的初始化
    this.pageBody = new PageBody(1, 10);
    this.fieldsAdd = [
      new Field('项目名称',	'itemname'),
      new Field('项目位置',	'itemposition'),
      // new Field('项目位置经度',	'longitude'),
      // new Field('项目位置纬度',	'latitude'),
      new Field('项目明细',	'itemdetail'),
      // new Field('生产线编号',	'unitcode'),
      new Field('项目巡检成员',	'itemmembers'),
      new Field('巡检时间间隔（单位：小时）',	'timecell')
    ];
    this.fieldsModify = [
      new Field('项目编号',	'itemcode'),
      new Field('项目名称',	'itemname'),
      new Field('项目位置',	'itemposition'),
      new Field('经度',	'longitude'),
      new Field('纬度',	'latitude'),
      new Field('项目明细',	'itemdetail'),
      // new Field('生产线编号',	'unitcode'),
      new Field('项目巡检成员',	'itemmembers'),
      new Field('巡检时间间隔（单位：小时）',	'timecell')
    ];
    //  增加表单
    this.addForm = this.fb.group({
      itemname: ['', Validators.required],
      itemposition: ['', Validators.required],
      // longitude: ['', Validators.required],
      // latitude: ['', Validators.required],
      itemdetail: ['', Validators.required],
      unitcode: ['', Validators.required],
      itemmembers: ['', Validators.required],
      timecell: ['', Validators.required],
      starttime: ['', Validators.required]
      // starttime1: ['', Validators.required]
    });
    this.modifyForm = this.fb.group({
      itemcode: ['', Validators.required],
      itemname: ['', Validators.required],
      itemposition: ['', Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required],
      itemdetail: ['', Validators.required],
      unitcode: ['', Validators.required],
      itemmembers: ['', Validators.required],
      starttime: ['', Validators.required],
      timecell: ['', Validators.required]
    });
    // 得到系统id
    this.req.FindsystemSysid().subscribe(value => {
      this.Fmodalid = value.values;
    });
    this.Update();
  }
  public SelectAddModalId(value, form): void {
    form.patchValue({'unitcode': value});
  }
// 控制模态框, 增，修，查，二维码
  public openModal(template: TemplateRef<any>, i): void {
    this.inputvalid = false;
    this.gtone = false;
    this.mustone = false;
    // 先判断要打开的是 哪个 模态框
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'lookdesc') {
      // console.log('这是详情查看');
      this.listenDescModal = true;
      this.detail = this.datas[i];
      this.detail.starttime = this.commonfun.defineTimeFormat(this.detail.starttime);
      this.detail.endtime = this.commonfun.defineTimeFormat(this.detail.endtime);
      this.modalRef = this.modalService.show(template, this.commonfun.getOperateModalConfig());
    }
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'modify') {
      // console.log('这是修改');
      if (this.hasChecked.length !== 1) {
        if (this.listenDescModal) {
          this.mustone = false;
          const date = new Date(this.detail.starttime);
          this.modifyForm.reset(this.detail);
          this.modalRef = this.modalService.show(template, this.commonfun.getOperateModalConfig());
          // 只能放在打开模态框的后面，因为模态框的作用跟ngIf一样的处理元素规则
          document.getElementById('modifyYear').innerHTML = String(date.getFullYear());
          document.getElementById('modifyMonth').innerHTML = String(date.getMonth() + 1);
          document.getElementById('modifyDay').innerHTML = String(date.getDate());
          document.getElementById('modifyHour').innerHTML = String(date.getHours());
          document.getElementById('modifyMinutes').innerHTML = String(date.getMinutes());
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
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'openQRcode') {
      // 打印二维码
      this.QRcodeValue = this.datas[i].itemcode;
      this.modalRef = this.modalService.show(template, this.commonfun.getOperateModalConfig());
    }
  }
  // 关闭模态框, 增，修，查
  public closeModal(): void {
    this.listenDescModal = false;
    this.modalRef.hide();
  }

  // 监控翻页事件
  public getPageBody(event: PageBody): void {
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
  // 按编号查找
  public numSearch(searchContext, template: TemplateRef<any>, e): void {
    e.stopPropagation();
    if (this.controlSearchText) {
      this.req.ItemFindInNumber(this.commonfun.parameterSerialization({itemcode: searchContext})).subscribe((res) => {
        if (String(res.values) !== 'null') {
          this.detail = res.values;
          this.modalRef = this.modalService.show(template);
          this.controlSearchText = false;
        }else {
          this.status = 13;
          this.resMessage = '项目编号不存在';
        }
      });
    }else {
      this.controlSearchText = true;
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
  public deleteItem(): void {
    this.controlSearchText = false;
    const haschecklen = this.hasChecked.length;
    if (haschecklen === 0) {
      this.mustone = false;
      this.gtone = true;
    } else {
        if (this.commonfun.deleteChecked(this.datas, this.hasChecked, 'itemcode')) {
          this.mustone = false;
          this.openstatus = false;
          for (let j = 0; j < haschecklen; j++) {
            this.req.ItemDelete('itemcode=' +  this.datas[this.hasChecked[j]].itemcode)
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
  public itemAdd(): void {
    this.getTime(this.addForm, 'add');
    if (this.addForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.ItemAdd(this.commonfun.parameterSerialization(this.addForm.value))
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
    this.getTime(this.modifyForm, 'modify');
    if (this.modifyForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.ItemModify(this.commonfun.parameterSerialization(this.modifyForm.value))
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
        this.datas = value.values.itemInfoDTOs;
        // event.stopPropagation();    阻止冒泡,即该方法不仅仅可以阻止冒泡，还可以阻止捕获和处于目标阶段。
        //     stopImmediatePropagation() 和 stopPropagation()的区别在哪儿呢？
        // 　　后者只会阻止冒泡或者是捕获。 但是前者除此之外还会阻止该元素的其他事件发生，但是后者就不会阻止其他事件的发生。
        // 阻止用户点击 复选框时，会弹出查看模态框
        const setinter = setInterval(() => {
          const trs = document.getElementsByTagName('tr');
          if (trs.length > 1) {
            for (let i = 1; i < trs.length; ++i) {
              const check = trs[i].children[0];
              const QR = trs[i].children[6];
              // 移除勾选框的title属性
              check.setAttribute('title', '');
              // check.removeAttribute('title');
              // 移除打印二维码的title属性
              QR.setAttribute('title', '');
              // 取消勾选框冒泡默认行为
              check.addEventListener('click', (e) => {
                e.stopImmediatePropagation();
              });
              // 取消打印二维码按钮的默认行为
              QR.addEventListener('click', (e) => {
                e.stopImmediatePropagation();
              });
            }
            // trs 长度大于 1时， 取消setInterval
            clearInterval(setinter);
          }
        });
        setTimeout(() => {
          this.openstatus = true;
          this.status = 0;
        }, 2500);
      });
  }

  // 时间格式验证 和 得到时间戳
  public getTime(form: FormGroup, type: string): void {
    let isCorrectYear = true;
    let isCorrectMouth = true;
    let isCorrectDay = true;
    let isCorrectHour = true;
    let isCorrectMinutes = true;
    const date = new Date();
    const year = document.getElementById(type + 'Year').innerHTML;
    const mouth = document.getElementById(type + 'Month').innerHTML;
    const day = document.getElementById(type + 'Day').innerHTML;
    const hour = document.getElementById(type + 'Hour').innerHTML;
    const minutes = document.getElementById(type + 'Minutes').innerHTML;
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
      date.setMonth(Number(mouth) - 1);
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
      }else if (Number(isCorrectMouth) === 0 && Number(isCorrectMouth)  === 2 && Number(isCorrectMouth)  === 4 && Number(isCorrectMouth)  === 6 && Number(isCorrectMouth)  === 7 && Number(isCorrectMouth)  === 9 && Number(isCorrectMouth)  === 11) {
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
      form.patchValue({starttime: date.getTime()});
    }else {
      this.validTimeFormat = false;
      form.patchValue({starttime: ''});
    }
  }

  // 获取本地当前时间
  public getLocalTime(type: string): void {
    // 获取一个时间
    const date = new Date();
    if (type === 'add') {
      document.getElementById('addYear').innerHTML = String(date.getFullYear());
      document.getElementById('addMonth').innerHTML = String(date.getMonth() + 1);
      document.getElementById('addDay').innerHTML = String(date.getDate());
      document.getElementById('addHour').innerHTML = String(date.getHours());
      document.getElementById('addMinutes').innerHTML = String(date.getMinutes());
    }else {
      document.getElementById('modifyYear').innerText = String(date.getFullYear());
      document.getElementById('modifyMonth').innerText = String(date.getMonth() + 1);
      document.getElementById('modifyDay').innerText = String(date.getDate());
      document.getElementById('modifyHour').innerHTML = String(date.getHours());
      document.getElementById('modifyMinutes').innerHTML = String(date.getMinutes());
    }
  }

}
