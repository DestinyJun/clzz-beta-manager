import {DMLOperationImpl} from './DMLOperationImpl';
import {IDMLOperation} from './IDMLOperation';
import {CheckOperation} from './CheckOperation';
import {FormGroup} from '@angular/forms';
import {Injectable, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';



@Injectable()
export class CommonOperation<T> implements IDMLOperation, CheckOperation {
  private operator: any;
  private data: Array<T>;
  private checkList = [];
  public modalRef: BsModalRef;
  private baseVar: BaseVar = new BaseVar();
  public listenDescModal: boolean;
  constructor(
    private dMLOperationImpl: DMLOperationImpl,
    private modalService: BsModalService
  ) {}

  // 控制模态框, 增，修，查
  public openModal(template: TemplateRef<any>, i): void {
    this.baseVar.invalidInput = false;
    this.baseVar.gtOne = false;
    this.baseVar.mustOne = false;
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'lookdesc') {
      this.listenDescModal = true;
      this.operator.detail = this.data[i];
      this.modalRef = this.modalService.show(template);
    }else if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'modify') {
      if (this.checkList.length !== 1) {
        if (this.listenDescModal) {
          this.baseVar.mustOne = false;
          this.operator.modifyForm.reset();
          this.fillInTheForm(this.operator.modifyForm, this.operator.detail);
          this.modalRef = this.modalService.show(template);
          this.listenDescModal = false;
        }else {
          this.baseVar.mustOne = true;
        }
      } else {
        if (!this.listenDescModal) {
          this.operator.detail = this.data[this.data.indexOf(this.checkList[0])];
        }
        this.baseVar.mustOne = false;
        this.operator.modifyForm.reset();
        this.fillInTheForm(this.operator.modifyForm, this.operator.detail);
        this.modalRef = this.modalService.show(template);
        this.listenDescModal = false;
      }
    }else {
      this.modalRef = this.modalService.show(template);
    }
  }

  checkAll(e: any): void {
    const checks = document.querySelectorAll('input[type=\'checkbox\']');
    for (let i = 1; i < checks.length; i++) {
      checks[i]['checked'] = e.srcElement['checked'];
    }
    if (e.srcElement['checked']) {
      this.data.forEach((value) => {
        this.checkList.push(value);
      });
    }else {
      this.checkList = [];
    }
  }

  checkOne(e: any, data: any): void {
    if (e.srcElement['checked'] === true) {
      this.checkList.push(data);
    }else {
      document.querySelector('input[type=\'checkbox\']')['checked'] = false;
      this.checkList.splice(this.checkList.indexOf(data), 1);
    }
    console.log(this.checkList);
  }

  delete(form: FormGroup, url: string, headers?: boolean): any {
    const deleteNum = this.checkList.length;
    if (deleteNum === 0) {
      this.baseVar.mustOne = false;
      this.baseVar.gtOne = true;
    } else {
      if (confirm('你确定删除已勾选项吗?')) {
        this.baseVar.openStatus = false;
        for (let j = 0; j < deleteNum; j++) {
          form.patchValue(this.operator.detail);
          this.dMLOperationImpl.delete(form, url, headers)
            .subscribe(res => {
              if (j === deleteNum - 1) {
                this.baseVar.resMsg = res.message;
                this.baseVar.state = Number(res.status);
                this.operator.foundByPage();
              }
            });
        }
      }
    }
  }

  foundByPage(form: FormGroup, url: string, headers?: boolean): any {
    this.baseVar.gtOne = false;
    this.baseVar.mustOne = false;
    this.dMLOperationImpl.foundByPage(form, url, headers).subscribe(
      (value) => {
        let valueObject;
        if (value.values) {
          valueObject = Object.keys(value.values);
          valueObject.forEach(value1 => {
            if (typeof value.values[value1] === 'object') {
              this.data =  value.values[value1];
            }else {
              this.baseVar.totalPage = Math.ceil(value.values[value1] / 10);
            }
          });
        }else {
          valueObject = Object.keys(value);
          valueObject.forEach(value1 => {
            if (typeof value[value1] === 'object') {
              this.data =  value[value1];
            }
          });
        }
        this.checkList = [];
        this.operator.setBaseVar(this.baseVar);
        this.operator.setData(this.data);
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
      });
  }

  save(form: FormGroup, url: string, headers?: boolean): any {
    if (form.valid) {
      this.baseVar.openStatus = false;
      this.baseVar.invalidInput = false;
      this.closeModal();
      this.dMLOperationImpl.save(form, url, headers)
        .subscribe(res => {
          this.baseVar.resMsg = res.message;
          this.baseVar.state = Number(res.status);
          this.operator.foundByPage();
        });
    }else {
      this.baseVar.invalidInput = true;
    }
  }

  update(form: FormGroup, url: string, headers?: boolean): any {
    if (form.valid) {
      this.baseVar.openStatus = false;
      this.baseVar.invalidInput = false;
      this.closeModal();
      this.dMLOperationImpl.update(form, url, headers)
        .subscribe(res => {
          this.baseVar.resMsg = res.message;
          this.baseVar.state = Number(res.status);
          this.operator.foundByPage();
        });
    }else {
      this.baseVar.invalidInput = true;
    }
  }

  public closeModal(): void {
    if (this.modalRef) {this.modalRef.hide(); }
  }

  public setOperator(operator: any): void {
    this.operator = operator;
  }

  public setData(data: Array<T>): void {
    this.data = data;
  }

  public setBaseVar(baseVar: BaseVar): void {
    this.baseVar = baseVar;
  }

  public fillInTheForm(form: FormGroup, data: Object): void {
    if (data) {
      const properties = Object.keys(data);
      for (let i = 0; i < properties.length; i++) {
        form.patchValue(data);
        if (typeof data[properties[i]] === 'object') {
          this.fillInTheForm(form, data[properties[i]]);
        }
      }
    }
  }

  public initBaseVar(): void {
    this.baseVar.state = 0;
    this.baseVar.openStatus = true;
    this.baseVar.invalidInput = false;
    this.baseVar.mustOne = false;
    this.baseVar.gtOne = false;
  }
}



export class BaseVar {
  mustOne: boolean;
  gtOne: boolean;
  openStatus: boolean;
  resMsg: string;
  state: any;
  invalidInput: boolean;
  totalPage: number;
  constructor() {}
}



