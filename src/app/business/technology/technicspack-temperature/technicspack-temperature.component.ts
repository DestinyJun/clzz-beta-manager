import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReqService} from '../../../shared/req.service';
import {PageBody, TechnologyParamsPackWord, TechnologyTemperatureQueryList} from '../../../shared/global.service';
import {CommonfunService} from '../../../shared/commonfun.service';

@Component({
  selector: 'app-technicspack-temperature',
  templateUrl: './technicspack-temperature.component.html',
  styleUrls: ['./technicspack-temperature.component.css']
})
export class TechnicspackTemperatureComponent implements OnInit {
  public technologyParamsPackWordList: Array<TechnologyParamsPackWord>;
  public datas: Array<TechnologyTemperatureQueryList>;
  public modalRef: BsModalRef;
  public pageBody: PageBody;
  public num: number;
  public detail: any;
  public paramAddForm: FormGroup;
  public paramModifyForm: FormGroup;
  public hasChecked: Array<number> = [];
  public checked: string;
  public openstatus: boolean;
  public status: number;
  public inputvalid: boolean;
  public mustone: boolean;
  public gtone: boolean;
  public resMessage: string;
  public listenDescModal: boolean;

  constructor(private modalService: BsModalService,
              private req: ReqService,
              private fb: FormBuilder,
              private commonfun: CommonfunService) {
  }

  ngOnInit() {
    this.status = 0;
    this.openstatus = true;
    this.inputvalid = false;
    this.mustone = false;
    this.gtone = false;
    this.listenDescModal = false;
    this.pageBody = new PageBody(1, 10);
    this.paramAddForm = this.fb.group({
      name: ['', Validators.required],
      al_thickness: ['', Validators.required],
      al_width: ['', Validators.required],
      temperature_1_1: ['', Validators.required],
      temperature_1_1_d: ['', Validators.required],
      temperature_1_2: ['', Validators.required],
      temperature_1_2_d: ['', Validators.required],
      temperature_1_3: ['', Validators.required],
      temperature_1_3_d: ['', Validators.required],
      temperature_1_4: ['', Validators.required],
      temperature_1_4_d: ['', Validators.required],
      temperature_1_5: ['', Validators.required],
      temperature_1_5_d: ['', Validators.required],
      temperature_2_1: ['', Validators.required],
      temperature_2_1_d: ['', Validators.required],
      temperature_2_2: ['', Validators.required],
      temperature_2_2_d: ['', Validators.required],
      temperature_2_3: ['', Validators.required],
      temperature_2_3_d: ['', Validators.required],
      temperature_2_4: ['', Validators.required],
      temperature_2_4_d: ['', Validators.required],
      temperature_2_5: ['', Validators.required],
      temperature_2_5_d: ['', Validators.required]
    });
    this.paramModifyForm = this.fb.group({
      name: ['', Validators.required],
      al_thickness: ['', Validators.required],
      al_width: ['', Validators.required],
      temperature_1_1: ['', Validators.required],
      temperature_1_1_d: ['', Validators.required],
      temperature_1_2: ['', Validators.required],
      temperature_1_2_d: ['', Validators.required],
      temperature_1_3: ['', Validators.required],
      temperature_1_3_d: ['', Validators.required],
      temperature_1_4: ['', Validators.required],
      temperature_1_4_d: ['', Validators.required],
      temperature_1_5: ['', Validators.required],
      temperature_1_5_d: ['', Validators.required],
      temperature_2_1: ['', Validators.required],
      temperature_2_1_d: ['', Validators.required],
      temperature_2_2: ['', Validators.required],
      temperature_2_2_d: ['', Validators.required],
      temperature_2_3: ['', Validators.required],
      temperature_2_3_d: ['', Validators.required],
      temperature_2_4: ['', Validators.required],
      temperature_2_4_d: ['', Validators.required],
      temperature_2_5: ['', Validators.required],
      temperature_2_5_d: ['', Validators.required]
    });
    this.technologyParamsPackWordList = [
      new TechnologyParamsPackWord('方 案 名 称', 'name', '', ''),
      new TechnologyParamsPackWord('铝板厚度', 'al_thickness', '毫米', '将（在）生产铝板厚度'),
      new TechnologyParamsPackWord('铝板宽度', 'al_width', '毫米', '将（在）生产铝板宽度'),
      new TechnologyParamsPackWord('一涂一区温度', 'temperature_1_1', '	摄氏度', '一涂一区温度设定'),
      new TechnologyParamsPackWord('一涂一区温度差值', 'temperature_1_1_d', '	摄氏度', '一涂一区温度安全值设定'),
      new TechnologyParamsPackWord('一涂二区温度', 'temperature_1_2', '	摄氏度', '一涂二区温度设定'),
      new TechnologyParamsPackWord('一涂二区温度差值', 'temperature_1_2_d', '	摄氏度', '一涂二区温度安全值设定'),
      new TechnologyParamsPackWord('一涂三区温度', 'temperature_1_3', '	摄氏度', '一涂三区温度设定'),
      new TechnologyParamsPackWord('一涂三区温度差值', 'temperature_1_3_d', '	摄氏度', '一涂三区温度安全值设定'),
      new TechnologyParamsPackWord('一涂四区温度', 'temperature_1_4', '	摄氏度', '一涂四区温度设定'),
      new TechnologyParamsPackWord('一涂四区温度差值', 'temperature_1_4_d', '	摄氏度', '一涂四区温度安全值设定'),
      new TechnologyParamsPackWord('一涂五区温度', 'temperature_1_5', '	摄氏度', '一涂五区温度设定'),
      new TechnologyParamsPackWord('一涂五区温度差值', 'temperature_1_5_d', '	摄氏度', '一涂五区温度安全值设定'),
      new TechnologyParamsPackWord('二涂一区温度', 'temperature_2_1', '	摄氏度', '二涂一区温度设定'),
      new TechnologyParamsPackWord('二涂一区温度差值', 'temperature_2_1_d', '	摄氏度', '二涂一区温度安全值设定'),
      new TechnologyParamsPackWord('二涂二区温度', 'temperature_2_2', '	摄氏度', '二涂二区温度设定'),
      new TechnologyParamsPackWord('二涂二区温度差值', 'temperature_2_2_d', '	摄氏度', '二涂二区温度安全值设定'),
      new TechnologyParamsPackWord('二涂三区温度', 'temperature_2_3', '	摄氏度', '二涂三区温度设定'),
      new TechnologyParamsPackWord('二涂三区温度差值', 'temperature_2_3_d', '	摄氏度', '二涂三区温度安全值设定'),
      new TechnologyParamsPackWord('二涂四区温度', 'temperature_2_4', '	摄氏度', '二涂四区温度设定'),
      new TechnologyParamsPackWord('二涂四区温度差值', 'temperature_2_4_d', '	摄氏度', '二涂四区温度安全值设定'),
      new TechnologyParamsPackWord('二涂五区温度', 'temperature_2_5', '	摄氏度', '二涂五区温度设定'),
      new TechnologyParamsPackWord('二涂五区温度差值', 'temperature_2_5_d', '	摄氏度', '二涂五区温度安全值设定'),
    ];
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
          // 把 detail 中的 name 和 finish_type 放到 detail 中的 amendata 对象中。
          this.detail.temperaturedata['name'] = this.detail.name;
          this.detail.temperaturedata['al_thickness'] = this.detail.althickness;
          this.detail.temperaturedata['al_width'] = this.detail.alwidth;
          this.paramModifyForm.reset(this.detail.temperaturedata);
          this.modalRef = this.modalService.show(template, this.commonfun.getOperateModalConfig());
          this.listenDescModal = false;
        } else {
          this.mustone = true;
        }
      } else {
        if (!this.listenDescModal) {
          this.detail = this.datas[this.hasChecked[0]];
        }
        this.mustone = false;
        // 把 detail 中的 name 和 finish_type 放到 detail 中的 amendata 对象中。
        this.detail.temperaturedata['name'] = this.detail.name;
        this.detail.temperaturedata['al_thickness'] = this.detail.althickness;
        this.detail.temperaturedata['al_width'] = this.detail.alwidth;
        this.paramModifyForm.reset(this.detail.temperaturedata);
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
    let haschecklen = this.hasChecked.length;
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

  // 删除表格 并且 重新请求数据(不管删除多少条，只请求数据刷新一次)
  public delete(): void {
    let haschecklen = this.hasChecked.length;
    if (haschecklen === 0) {
      this.mustone = false;
      this.gtone = true;
    } else {
      if (this.commonfun.deleteChecked(this.datas, this.hasChecked, 'name')) {
        this.openstatus = false;
        for (let j = 0; j < haschecklen; j++) {
          const body = 'al_thickness=' + this.datas[this.hasChecked[j]]['althickness'] + '&&al_width=' + this.datas[this.hasChecked[j]]['alwidth'];
          this.req.DeleteTechnicsPackTemperature(body)
            .subscribe(res => {
              if (j === haschecklen - 1) {
                this.resMessage = res['message'];
                this.status = Number(res.status);
                this.Update();
              }
            });
        }
      }
    }
  }

  // 生产线的添加 并且 重新请求数据，防止增加的是第十一条表格
  public paramsAdd(): void {
    if (this.paramAddForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.AddTechnicsPackTemperature(this.paramAddForm.value)
        .subscribe(res => {
          this.resMessage = res['message'];
          this.status = Number(res.status);
          this.Update();
        });
    } else {
      this.inputvalid = true;
    }
  }

//  修改表格内容
  public paramsModify(): void {
    if (this.paramModifyForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.UpdateTechnicsPackTemperature(this.paramModifyForm.value)
        .subscribe(res => {
          this.status = Number(res.status);
          this.resMessage = res['message'];
          this.Update();
        });
    } else {
      this.inputvalid = true;
    }
  }

  // 刷新
  public Update(): void {
    this.gtone = false;
    this.mustone = false;
    this.req.FindTechnicsPackTemperature(this.commonfun.parameterSerialization(this.pageBody)).subscribe(
      (value) => {
        this.num = Math.ceil(value.values.num / 10);
        this.datas = value.values.amenddata;
        for (let i = 0; i < this.datas.length; i++) {
          this.datas[i]['temperaturedata'] = JSON.parse(this.datas[i]['temperaturedata']);
        }
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

  public cleanScreen(): void {
    this.openstatus = true;
    this.status = 0;
  }
}
