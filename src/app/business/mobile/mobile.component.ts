import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {AppManager} from '../../shared/global.service';
import {ReqService} from '../../shared/req.service';
import {CommonFunService} from '../../shared/common-fun.service';
import {FileUploader} from 'ng2-file-upload';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit, OnDestroy {
  public apps: Array<AppManager>;
  public modalRef: BsModalRef;
  public formData: FormData;
  public infoForm: FormGroup;
  public options: Array<Options>;
  public file: any;
  public status: number;
  public openstatus: boolean;
  public QRcodeValue: string;
  public uploadHint = false;
  public submitMsg = '上传';
  public loaded: number;

  constructor(
    public http: HttpClient,
    public fb: FormBuilder,
    public modalService: BsModalService,
    public req: ReqService,
    public commonFun: CommonFunService
  ) {
    this.infoForm = fb.group({
      appType: ['APP01', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loaded = 0;
    this.formData = new FormData();
    this.openstatus = true;
    this.status = 0;
    this.options = [
      new Options('APP01', '原材料出库'),
      new Options('APP02', '成品入库'),
      new Options('APP03', '成品出库'),
      new Options('APP04', '工艺干预'),
      new Options('APP05', '生产监视'),
      new Options('APP06', '设备巡检')

    ];
    this.req.getAppInfo().subscribe(value => {
      this.apps = value.data;
    });
  }

  // 打开模态框
  public openModal(template: TemplateRef<any>, i): void {
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'openQRcode') {
      this.QRcodeValue = this.apps[i].url;
    }
    this.modalRef = this.modalService.show(template);
  }

  // 选择文件
  public getFile(e): void {
    const myReg = /[.apk]$/i;
    this.file = e.target.files[0];
    this.formData.append('file', e.target.files[0]);
    if (!myReg.test(this.file.name)) {
      this.uploadHint = true;
      document.getElementById('reset').click();
    }else {
      this.uploadHint = false;
    }
  }

  // 选择文件类型
  public typeSelect(appType: any): void {
    this.infoForm.patchValue({appType: appType});
  }

  // 上传文件
  public uploadFile(): void {
    if (this.infoForm.valid && (this.file !== undefined || this.file.length >= 1)) {
      this.openstatus = false;
      this.submitMsg = '正在上传.....';
      this.formData.append('infomation', JSON.stringify(this.infoForm.value));
      this.loaded = 0;
      const xml = new XMLHttpRequest();
      xml.open('POST', 'http://119.23.219.22:80/element-admin/version/an-upload', true);
      xml.upload.onprogress = (e => {
        if (e.lengthComputable) {
          this.loaded = Math.ceil(100 * (e.loaded / e.total));
          document.getElementsByClassName('progress-bar')[0].setAttribute('aria-valuenow', String(this.loaded));
          console.log(this.loaded);
          if (this.loaded === 100) {
            this.submitMsg = '上传';
          }
        }
      });
      this.send(xml);
    } else {
      alert('请填写完整的信息!');
    }
  }

public send(xml: XMLHttpRequest): void {
    this.status = 14;
    xml.send(this.formData);
}

  // 下载文件
  public downloadFile(downloadUrl): void {
    window.open(downloadUrl);
  }


  ngOnDestroy(): void {
    if (this.modalRef !== undefined) {
      this.modalRef.hide();
    }
  }
}


export class Options {
  constructor(
    public value: string,
    public content: string
  ) {
  }
}
