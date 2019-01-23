export class Url {
  private static urlPrefix = 'http://119.23.219.22:80/';
  public static Data = {
    login: Url.urlPrefix  + '/element-admin/user/login',
    loginOut: Url.urlPrefix  + '/element-admin/user/logout',
    loginOutForce: Url.urlPrefix  + '/element-admin/user/logout-forced',
    sidUpdate: Url.urlPrefix  + '/element-admin/user/sid-update',
    onlineUser: {
      query: Url.urlPrefix  + '/element-admin/user/query-self',
      update: Url.urlPrefix  + '/element-admin/user/update-self'
    },
    organization: {
      delete: Url.urlPrefix + '/element-admin/department/delete',
      update: Url.urlPrefix + '/element-admin/department/update',
      save: Url.urlPrefix + '/element-admin/department/add',
      foundByPage: Url.urlPrefix + '/element-admin/department/find',
      notes: '部门管理'
    },
    organizationManager: {
      delete: Url.urlPrefix + '/element-admin/organization/delete',
      update: Url.urlPrefix + '/element-admin/organization/update',
      save: Url.urlPrefix + '/element-admin/organization/add',
      foundByPage: Url.urlPrefix + '/element-admin/organization/find',
      notes: '组织管理'
    },
    usersManagement: {
      delete: Url.urlPrefix + '/element-admin/user/delete',
      update: Url.urlPrefix + '/element-admin/user/update',
      save: Url.urlPrefix + '/element-admin/user/add',
      foundByPage: Url.urlPrefix + '/element-admin/user/query',
      queryCount: Url.urlPrefix + '/element-admin/user/query-count',
      notes: '用户管理'
    },
    deviceProductionLine: {
      delete: Url.urlPrefix + '/element/production-system/delete',
      update: Url.urlPrefix + '/element/production-system/update',
      save: Url.urlPrefix + '/element/production-system/add',
      foundByPage: Url.urlPrefix + '/element/production-system/find',
      notes: '生产线管理'
    },
    deviceProductionData: {
      delete: Url.urlPrefix + '/element/production-device/delete',
      update: Url.urlPrefix + '/element/production-device/update',
      save: Url.urlPrefix + '/element/production-device/add',
      foundByPage: Url.urlPrefix + '/element/production-device/find',
      notes: '生产设备数据管理'
    },
    deviceProductionModular: {
      delete: Url.urlPrefix + '/element/production-modular/delete',
      update: Url.urlPrefix + '/element/production-modular/update',
      save: Url.urlPrefix + '/element/production-modular/add',
      foundByPage: Url.urlPrefix + '/element/production-modular/find',
      notes: '生产设备模块管理'
    },
    deviceProductionSensor: {
      delete: Url.urlPrefix + '/element/production-sensor/delete',
      update: Url.urlPrefix + '/element/production-sensor/update',
      save: Url.urlPrefix + '/element/production-sensor/add',
      foundByPage: Url.urlPrefix + '/element/production-sensor/find',
      notes: '生产设备传感器管理'
    },
    modalJurisdictionManager: {
      delete: Url.urlPrefix + '/element-admin/module/delete',
      update: Url.urlPrefix + '/element-admin/module/update',
      save: Url.urlPrefix + '/element-admin/module/add',
      foundByPage: Url.urlPrefix + '/element-admin/module/find',
      notes: '模块权限管理'
    },
    btnJurisdictionManager: {
      delete: Url.urlPrefix + '/element-admin/button/delete',
      update: Url.urlPrefix + '/element-admin/button/update',
      save: Url.urlPrefix + '/element-admin/button/add',
      foundByPage: Url.urlPrefix + '/element-admin/button/find',
      notes: '按钮权限管理'
    },
    interfaceJurisdictionManager: {
      delete: Url.urlPrefix + '/element-admin/interfaces/delete',
      update: Url.urlPrefix + '/element-admin/interfaces/update',
      save: Url.urlPrefix + '/element-admin/interfaces/add',
      foundByPage: Url.urlPrefix + '/element-admin/interfaces/find',
      notes: '接口权限管理'
    },
    userPower: {
      delete: Url.urlPrefix + '/element-admin/power/delete',
      update: Url.urlPrefix + '/element-admin/power/update',
      save: Url.urlPrefix + '/element-admin/power/add',
      foundByPage: Url.urlPrefix + '/element-admin/power/find',
      notes: '用户权限管理'
    },
    videosManager: {
      delete: Url.urlPrefix + '/element/DeleteCameraGroup',
      update: Url.urlPrefix + '/element/UpdateCameraGroup',
      save: Url.urlPrefix + '/element/AddCameraGroup',
      foundByPage: Url.urlPrefix + '/element/SelectCameraGroup',
      notes: '视频组管理'
    },
    videoManager: {
      delete: Url.urlPrefix + '/element/DeleteCamera',
      update: Url.urlPrefix + '/element/UpdateCamera',
      save: Url.urlPrefix + '/element/AddCamera',
      foundByPage: Url.urlPrefix + '/element/QueryCamera',
      notes: '视频管理'
    },
    defaultTechnologyPackage: {
      delete: Url.urlPrefix + '/element-admin/delete-technics-pack-amend',
      update: Url.urlPrefix + '/element-admin/update-technics-pack-amend',
      save: Url.urlPrefix + '/element-admin/add-technics-pack-amend',
      foundByPage: Url.urlPrefix + '/element-admin/find-technics-pack-amend',
      notes: '默认工艺包'
    },
    defaultTemperatureTechnologyPackage: {
      delete: Url.urlPrefix + '/element-admin/delete-technics-pack-temperature',
      update: Url.urlPrefix + '/element-admin/update-technics-pack-temperature',
      save: Url.urlPrefix + '/element-admin/add-technics-pack-temperature',
      foundByPage: Url.urlPrefix + '/element-admin/find-technics-pack-temperature',
      notes: '默认温度工艺包'
    },
    deviceInspection: {
      delete: Url.urlPrefix + '/element-admin/item-info/delete',
      update: Url.urlPrefix + '/element-admin/item-info/update',
      save: Url.urlPrefix + '/element-admin/item-info/add',
      foundByPage: Url.urlPrefix + '/element-admin/item-info/find-all',
      notes: '设备巡检'
    },
    AppManager: {
      upload: Url.urlPrefix + '/element-admin/version/an-upload',
      query: Url.urlPrefix + '/element-admin/version/an-query',
      notes: 'App管理'
    },
    departmentBaseInfo: {
      find: Url.urlPrefix + '/element-admin/department/tree',
      notes: '部门和组织基本信息'
    },
    userBaseInfo: {
      find: Url.urlPrefix + '/element-admin/user/find-user-id-name',
      notes: '用户基本信息'
    },
    moduleBaseInfo: {
      find: Url.urlPrefix + '/element-admin/module/find-module-id-name',
      notes: '模块基本信息'
    },
    productionLineBaseInfo: {
      find: Url.urlPrefix + '/element/find-system-sysid',
      notes: '生产线基本信息'
    },
    productionModularBaseInfo: {
      find: Url.urlPrefix + '/element/find-modular-mid',
      notes: '生产线模块基本信息'
    },
    productionDeviceBaseInfo: {
      find: Url.urlPrefix + '/element/find-device-deviceid',
      notes: '生产线设备基本信息'
    },

  };
  private constructor() {}
}
