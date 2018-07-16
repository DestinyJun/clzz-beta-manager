import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
  public sessionStorage: any;
  constructor() {
    if (!sessionStorage) {
      throw new Error('Current browser does not support Local Storage');
    }
    this.sessionStorage = sessionStorage;
  }
  public set(key: string, value: string): void {
    this.sessionStorage[key] = value;
  }

  public get(key: string): string {
    return this.sessionStorage[key] || false;
  }

  public setObject(key: string, value: any): void {
    this.sessionStorage[key] = JSON.stringify(value);
  }

  public getObject(key: string): any {
    return JSON.parse(this.sessionStorage[key] || '{}');
  }

  public remove(key: string): any {
    this.sessionStorage.removeItem(key);
  }

}
export class NavList {
  constructor(
    public title: string,
    public routers: string,
    public icon: string,
    public clsstate: boolean,
    public children: NavListChild[],
    public open: boolean
  ) {}
}
export class NavListChild {
  constructor(
    public title: string,
    public setState: boolean,
    public routers: string
  ) {}
}


export class PageBody {
  constructor(
    public page: number,
    public row: number
  ) {}
}
// 部门
export class DeparmentList {
  constructor(
    public id: number,
    public name: string,
    public dcode: string,
    public tel: string,
    public oid: number,
    public pid: number,
    public idt: string,
    public udt: string
  ) {}
}

// 组织管理
export class OrganizationList {
  constructor(
    public id: number,
    public name: string,
    public code: string,
    public otype: string,
    public tel: string,
    public fax: string,
    public address: string,
    public email: string,
    public corpphone: string,
    public corpname: string,
    public registerdate: string,
    public zipcode: string,
    public pid: string,
    public idt: string,
    public udt: string
) {}
}
// 登录用户个人信息查看
export class PersonInfo {
  constructor(
  public  id: string,
  public userCode:	string,
  public idCode: string,
  public realName: string,
  public userName: string,
  public homeAddress: 	string,
  public homeTelephone:	string,
  public organizationId:	string,
  public password: string,
  public phone:	string,
  public email:	string,
  public birthday: Date,
  public gender: string,
  public idt:	string,
  public udt:	string
) {}
}

// 生产线查询
export class DeviceProductionLineList {
  constructor(
    public sid: string,
    public name: string,
    public did: number,
    public idt: string,
    public udt: string
  ) {}
}

// 设备数据查询
export class DeviceProductionDataList {
  constructor(
    public did: string,
    public name: string,
    public fnum: string,
    public dvender: string,
    public dmodule: string,
    public dprodate: string,
    public dinstalldate: string,
    public power: number,
    public current: number,
    public voltage: number,
    public usestatus: number,
    public dtype: number,
    public dstatus: number,
    public mid: string,
    public idt: string,
    public udt: string
) {}
}

// 模块数据查询
export class DeviceProductionIcmList {
  constructor(
    public mid: string,
    public name: string,
    public sid: string,
    public idt: string,
    public udt: string
) {}
}

// 传感器查询
export class DeviceProductionSensorList {
  constructor(
    public sid: string,
    public sname: string,
    public stype: number,
    public sdatatype: string,
    public saddress: string,
    public sstatus: number,
    public smax: number,
    public smin: number,
    public srecomm: number,
    public did: string,
    public idt: string,
    public udt: string
  ) {}
}
// 模块管理
export class JurisdictionModalList {
  constructor(
    public id: number,
    public name: string,
    public pid: number,
    public description: string,
    public mcode: string,
    public oid: number,
    public idt: string,
    public udt: string,
    public num: number,
) {}
}
// 按钮管理查询
export class JurisdictionBtnManager {
  constructor(
    public id: number,
    public name: string,
    public decription: string,
    public mid: number,
    public idt: string,
    public udt: string
) {}
}

// 接口管理查询
export class JurisdictionInterface {
  constructor(
    public id: number,
    public iname: string,
    public path: string,
    public pcode: string,
    public mid: number
  ) {}
}
// 用户权限管理
export class UserPowerInfo {
  constructor(
    public id: number,
    public userid: number,
    public moduleid: number,
    public modulename: string,
    public realname: string,
  ) {}
}

// 用户管理
export class UsersManager {
  constructor(
    public id:	String,
    public userCode:	String,
    public idCode:	String,
    public realName:	String,
    public userName:	String
) {}
}

// app管理
export class AppManager {
  constructor(
    public id: string,
    public version: number,
    public versionName: string,
    public description: string,
    public path: string,
    public url: string,
    public utime: string
  ) {}
}


// 摄像机组管理
export class CameraGroup {
  constructor(
    public value: string,
    public id: string,
    public creator: string,
    public status: string,
    public p_id: string
  ) {}
}
// 摄像机管理
export class Cameras {
  constructor(
    public creator: string,
    public g_id: string,
    public id: string,
    public inner_url: string,
    public value: string,
    public outer_url: string
) {}
}

// 工艺增加和修改表字段的构造器
export class TechnologyParamsPackWord {
  constructor(
    public chinese_variable_name: string,
    public word_variable_name: string,
    public unit: string,
    public notes: string
  ) {}
}
// 默认工艺
export class TechnologyAmendQueryList {
  constructor(
    public name: number,
    public finishtype: number,
    public data_pack_tim: number,
    public plate_thickne: number,
    public plate_width: number,
    public plate_length: number,
    public bottom_dry_thickness: number,
    public bottom_dry_thickness_d: number,
    public bottom_dry_thickness_d_l: number,
    public bottom_dry_thickness_d_r: number,
    public bottom_wet_thickness: number,
    public bottom_wet_thickness_d: number,
    public bottom_wet_thickness_d_l: number,
    public bottom_wet_thickness_d_r: number,
    public back_dry_thickness: number,
    public back_dry_thickness_d: number,
    public back_dry_thickness_d_l: number,
    public back_dry_thickness_d_r: number,
    public back_wet_thickness: number,
    public back_wet_thickness_d: number,
    public back_wet_thickness_d_l: number,
    public back_wet_thickness_d_r: number,
    public surface_dry_thickness: number,
    public surface_dry_thickness_d: number,
    public surface_dry_thickness_d_l: number,
    public surface_dry_thickness_d_r: number,
    public surface_wet_thickness: number,
    public surface_wet_thickness_d: number,
    public surface_wet_thickness_d_l: number,
    public surface_wet_thickness_d_r: number,
    public temperature_1_1: number,
    public temperature_1_1_d: number,
    public temperature_1_2: number,
    public temperature_1_2_d: number,
    public temperature_1_3: number,
    public temperature_1_3_d: number,
    public temperature_1_4: number,
    public temperature_1_4_d: number,
    public temperature_1_5: number,
    public temperature_1_5_d: number,
    public temperature_2_1: number,
    public temperature_2_1_d: number,
    public temperature_2_2: number,
    public temperature_2_2_d: number,
    public temperature_2_3: number,
    public temperature_2_3_d: number,
    public temperature_2_4: number,
    public temperature_2_4_d: number,
    public temperature_2_5: number,
    public temperature_2_5_d: number,
    public exhaust_air_volume_1: number,
    public exhaust_air_volume_1_d: number,
    public exhaust_air_volume_2: number,
    public exhaust_air_volume_2_d: number
) {}
}
// 温度
export class TechnologyTemperatureQueryList {
  constructor(
    public name: number,
    public finishtype: number,
    public althickness: number,
    public alwidth: number,
    public bottom_dry_thickness: number,
    public bottom_dry_thickness_d: number,
    public bottom_dry_thickness_d_l: number,
    public bottom_dry_thickness_d_r: number,
    public bottom_wet_thickness: number,
    public bottom_wet_thickness_d: number,
    public bottom_wet_thickness_d_l: number,
    public bottom_wet_thickness_d_r: number,
    public back_dry_thickness: number,
    public back_dry_thickness_d: number,
    public back_dry_thickness_d_l: number,
    public back_dry_thickness_d_r: number,
    public back_wet_thickness: number,
    public back_wet_thickness_d: number,
    public back_wet_thickness_d_l: number,
    public back_wet_thickness_d_r: number,
    public surface_dry_thickness: number,
    public surface_dry_thickness_d: number,
    public surface_dry_thickness_d_l: number,
    public surface_dry_thickness_d_r: number,
    public surface_wet_thickness: number,
    public surface_wet_thickness_d: number,
    public surface_wet_thickness_d_l: number,
    public surface_wet_thickness_d_r: number,
    public temperature_1_1: number,
    public temperature_1_1_d: number,
    public temperature_1_2: number,
    public temperature_1_2_d: number,
    public temperature_1_3: number,
    public temperature_1_3_d: number,
    public temperature_1_4: number,
    public temperature_1_4_d: number,
    public temperature_1_5: number,
    public temperature_1_5_d: number,
    public temperature_2_1: number,
    public temperature_2_1_d: number,
    public temperature_2_2: number,
    public temperature_2_2_d: number,
    public temperature_2_3: number,
    public temperature_2_3_d: number,
    public temperature_2_4: number,
    public temperature_2_4_d: number,
    public temperature_2_5: number,
    public temperature_2_5_d: number,
    public exhaust_air_volume_1: number,
    public exhaust_air_volume_1_d: number,
    public exhaust_air_volume_2: number,
    public exhaust_air_volume_2_d: number
) {}
}


// 项目数据增加和修改 字段构造器
export class ItemField {
  constructor(
    public name: string,
    public field: string
  ) {}
}
// 项目
export class ItemList {
  constructor(
  public itemcode: string,
  public itemname:	string,
  public itemposition:	string,
  public longitude:	number,
  public latitude:	number,
  public itemdetail:	string,
  public unitcode:	number,
  public itemmembers:	string,
  public timecell:	number,
  public starttime:	number,
  public endtime: number,
  public status: number,
  public idt:	Date,
  public udt:	Date

) {}
}
