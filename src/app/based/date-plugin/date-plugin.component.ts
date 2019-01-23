import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-date-plugin',
  templateUrl: './date-plugin.component.html',
  styleUrls: ['./date-plugin.component.css']
})
export class DatePluginComponent implements OnInit {
  public dateForm: FormGroup;
  @Input()
  private timeStamp: string;
  @Output()
  private datePluginChange: EventEmitter<Date> = new EventEmitter<Date>();
  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.dateForm = this.fb.group({
      year: [{value: '0000', disabled: true}],
      mouth: [{value: '1', disabled: true}],
      day: [{value: '1', disabled: true}],
      hour: [{value: '00', disabled: true}],
      minutes: [{value: '00', disabled: true}],
      second: [{value: '00', disabled: true}],
    });
    const date = new Date(this.timeStamp);
    this.dateForm.patchValue({
      year: date.getFullYear(),
      mouth: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      minutes: date.getMinutes(),
      second: date.getSeconds(),
    });
  }

  public selectDate(e, control: string, min, max): void {
    e.stopPropagation();
    this.showDate(e, control, min, max);
  }

  public selectDay(e, control): void {
    e.stopPropagation();
    const year = Number(this.dateForm.get('year').value);
    const mouth = Number(this.dateForm.get('mouth').value);
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400) === 0) {
      if (mouth === 2) {
        this.showDate(e, control, 1, 29);
      }
    }else {
      if (mouth === 2) {
        this.showDate(e, control, 1, 28);
      }
    }
    if (mouth === 1 || mouth === 3 || mouth === 5 || mouth === 7 || mouth === 8 || mouth === 10 || mouth === 12 ) {
      this.showDate(e, control, 1, 31);
    }else if (mouth !== 2) {
      this.showDate(e, control, 1, 30);
    }
  }

  public showDate(parentEle: any, control: string, min: number, max: number): void {
    const ele = document.createElement('div');
    ele.style.position = 'absolute';
    ele.style.top = '20px';
    ele.style.left = '0';
    ele.style.width = '60px';
    ele.style.height = '80px';
    ele.style.overflowX = 'hidden';
    ele.style.overflowY = 'scroll';
    ele.style.border = '1px #646464 solid';
    ele.style.backgroundColor = '#999999';
    if (parentEle.srcElement.id.indexOf('self_defined_') === -1) {
      parentEle = parentEle.srcElement.parentNode;
      parentEle.appendChild(ele);
    }else {
      parentEle.srcElement.appendChild(ele);
    }
    for (let i = min; i <= max; i++) {
      const options = document.createElement('div');
      options.style.width = '100%';
      options.style.height = '15px';
      options.style.marginTop = '3px';
      const datePluginComponent = this;
      options.addEventListener('click', (e) => {
        let value = {};
        value[control] = e.srcElement['innerText'];
        datePluginComponent.dateForm.patchValue(value);
        datePluginComponent.datePluginChange.emit(datePluginComponent.formToDate(datePluginComponent.dateForm));
        value = null;
        ele.parentNode.removeChild(ele);
      });
      options.innerText = (i !== 0 ? (i / 10 < 1 ? '0' + i : String(i) ) : '00');
      ele.appendChild(options);
    }
  }

  public getLocalTime(): void {
    const date = new Date();
    this.dateForm.patchValue({
      year: date.getFullYear(),
      mouth: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      minutes: date.getMinutes(),
      second: date.getSeconds(),
    });
    this.datePluginChange.emit(date);
  }

  public formToDate(form: FormGroup): Date {
    const dateData = new Date();
    dateData.setFullYear(
      form.get('year').value,
      Number(form.get('mouth').value) - 1,
      form.get('day').value
    );
    dateData.setHours(
      form.get('hour').value,
      form.get('minutes').value,
      form.get('second').value
    );
    return dateData;
  }
}
