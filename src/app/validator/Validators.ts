import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';

// 自定义校验器之校验手机号码是否合法
export function mobileValidators (control: FormControl): any {
  const myReg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
  const valid = myReg.test(control.value);
  return valid ? null : {mobile: true};
}

// 异步校验器
export function mobileAsyncValidators (control: FormControl): any {
  // 定义正则表达式起到筛选字段的作用
  const myReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
  const valid = myReg.test(control.value);
  return Observable.of (valid ? null : {mobile: true}).delay(5000);
}

// 自定义校验器之校验两次密码是否一致
export function equalValidators (group: FormGroup): any {
  const password: FormControl = group.get('password') as FormControl;
  const pconfirm: FormControl = group.get('pconfirm') as FormControl;
  const valid: boolean = (password.value === pconfirm.value);
  return valid ? null : {equal : {errmsg: '两次输入的密码不一致'}};
}

// 身份证号
export function idCardValidators(control: FormControl): any {
  const Reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  const valid = Reg.test(control.value);
  return valid ? null : {idCard: true};
}
// 邮箱验证
export function emailValidator(control: FormControl) {
  const Reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
  const valid = Reg.test(control.value);
  return valid ? null : {email: true};
}

// 传真号码
export function faxValidator(control: FormControl) {
  const Reg = /^(\d{3,4}-)?\d{7,8}$/;
  const valid = Reg.test(control.value);
  return valid ? null : {fax: true};
}


// 不能包括中文
export function chineseValidator(control: FormControl) {
  const Reg = /[0-9][a-z][A-Z]/g;
  const valid = Reg.test(control.value);
  return valid ? null : {chinese: true};
}

// 只能包含小数
export function decimalValidator(control: FormControl) {
  const Reg = /^([0-9]{1,}[.][0-9]*)$/;
  const valid = Reg.test(control.value);
  return valid ? null : {decimal: true};
}
// 只能包含整数
export function integerValidator(control: FormControl) {
  const Reg = /^([0-9]{1,})$/;
  const valid = Reg.test(control.value);
  return valid ? null : {integer: true};
}

// 既可以是整数也可以是小数
export function digitValidator(control: FormControl) {
  const Reg = /(^([0-9]{1,})$)|(^([0-9]{1,}[.][0-9]*)$)/;
  const valid = Reg.test(control.value);
  return valid ? null : {digit: true};
}
// 只能输入数字和字母(不分大小写)
export function digitAndLetterValidator(control: FormControl) {
  const Reg = /^[A-Za-z0-9]+$/;
  const valid = Reg.test(control.value);
  return valid ? null : {digitAndLetter: true};
}

// 只能输入邮箱
export function postCodeValidator(control: FormControl) {
  const Reg = /[1-9]\d{5}(?!\d)/;
  const valid = Reg.test(control.value);
  return valid ? null : {postCode: true};
}
// 验证密码，不能有中文的6-17位字符
export function passwordValidator(control: FormControl) {
  const Reg = /^[\w_-]{6,18}$/;
  const valid = Reg.test(control.value);
  return valid ? null : {password: true};
}
