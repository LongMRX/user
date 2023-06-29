export interface Register {
  phone:number;
  password: any;
}
export interface User {
  id: number;
  phone:any;
  role_id: number
  token:any;
}
export interface InforCccd {
  name: any,
  cccd_cmnd: any;
  before_cccd_cmnd: any;
  after_cccd_cmnd: any;
  face_cccd_cmnd: any;
  day_of_birthday: any;
  permanent_address: any
}
export interface Loan {
  total_loan: any,
  time: any;
  recurring_payment: any;
}
export interface Message {
  message: any,
  to_user: any,
  photo?: any
}
export enum Enum {
  SUCCESS = 'success',
  IS_ADMIN = 1,
  DEFAULT_VALUE = 1,
  WATTING = 3,
  PENDDING = 0,
  APPROVAL = 2,
  REJECT = 1,
}
