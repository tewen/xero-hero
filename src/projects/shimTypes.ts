/* eslint-disable @typescript-eslint/explicit-member-accessibility */
export declare class TimeEntry {
  /**
   * Identifier of the time entry.
   */
  'timeEntryId'?: string;
  /**
   * The xero user identifier of the person who logged time.
   */
  'userId'?: string;
  /**
   * Identifier of the project, that the task (which the time entry is logged against) belongs to.
   */
  'projectId'?: string;
  /**
   * Identifier of the task that time entry is logged against.
   */
  'taskId'?: string;
  /**
   * The date time that time entry is logged on. UTC Date Time in ISO-8601 format.
   */
  'dateUtc'?: Date;
  /**
   * The date time that time entry is created. UTC Date Time in ISO-8601 format. By default it is set to server time.
   */
  'dateEnteredUtc'?: Date;
  /**
   * The duration of logged minutes.
   */
  'duration'?: number;
  /**
   * A description of the time entry.
   */
  'description'?: string;
  /**
   * Status of the time entry. By default a time entry is created with status of `ACTIVE`. A `LOCKED` state indicates that the time entry is currently changing state (for example being invoiced). Updates are not allowed when in this state. It will have a status of INVOICED once it is invoiced.
   */
  'status'?: TimeEntry.StatusEnum;
  static discriminator: string | undefined;
  static attributeTypeMap: Array<{
    baseName: string;
    name: string;
    type: string;
  }>;

  static getAttributeTypeMap(): {
    baseName: string;
    name: string;
    type: string;
  }[];
}
/* eslint-disable @typescript-eslint/no-namespace, no-redeclare */
export declare namespace TimeEntry {
  enum StatusEnum {
    ACTIVE,
    LOCKED,
    INVOICED,
  }
}
/* eslint-enable @typescript-eslint/no-namespace, no-redeclare */
/**
 * 3 letter alpha code for the ISO-4217 currency code, e.g. USD, AUD.
 */
export enum CurrencyCode {
  AED,
  AFN,
  ALL,
  AMD,
  ANG,
  AOA,
  ARS,
  AUD,
  AWG,
  AZN,
  BAM,
  BBD,
  BDT,
  BGN,
  BHD,
  BIF,
  BMD,
  BND,
  BOB,
  BRL,
  BSD,
  BTN,
  BWP,
  BYN,
  BZD,
  CAD,
  CDF,
  CHF,
  CLP,
  CNY,
  COP,
  CRC,
  CUC,
  CUP,
  CVE,
  CZK,
  DJF,
  DKK,
  DOP,
  DZD,
  EGP,
  ERN,
  ETB,
  EUR,
  FJD,
  FKP,
  GBP,
  GEL,
  GGP,
  GHS,
  GIP,
  GMD,
  GNF,
  GTQ,
  GYD,
  HKD,
  HNL,
  HRK,
  HTG,
  HUF,
  IDR,
  ILS,
  IMP,
  INR,
  IQD,
  IRR,
  ISK,
  JEP,
  JMD,
  JOD,
  JPY,
  KES,
  KGS,
  KHR,
  KMF,
  KPW,
  KRW,
  KWD,
  KYD,
  KZT,
  LAK,
  LBP,
  LKR,
  LRD,
  LSL,
  LYD,
  MAD,
  MDL,
  MGA,
  MKD,
  MMK,
  MNT,
  MOP,
  MRU,
  MUR,
  MVR,
  MWK,
  MXN,
  MYR,
  MZN,
  NAD,
  NGN,
  NIO,
  NOK,
  NPR,
  NZD,
  OMR,
  PAB,
  PEN,
  PGK,
  PHP,
  PKR,
  PLN,
  PYG,
  QAR,
  RON,
  RSD,
  RUB,
  RWF,
  SAR,
  SBD,
  SCR,
  SDG,
  SEK,
  SGD,
  SHP,
  SLL,
  SOS,
  SPL,
  SRD,
  STN,
  SVC,
  SYP,
  SZL,
  THB,
  TJS,
  TMT,
  TND,
  TOP,
  TRY,
  TTD,
  TVD,
  TWD,
  TZS,
  UAH,
  UGX,
  USD,
  UYU,
  UZS,
  VEF,
  VND,
  VUV,
  WST,
  XAF,
  XCD,
  XDR,
  XOF,
  XPF,
  YER,
  ZAR,
  ZMW,
  ZMK,
  ZWD,
  Empty,
}

export declare class Amount {
  'currency'?: CurrencyCode;
  'value'?: number;
  static discriminator: string | undefined;
  static attributeTypeMap: Array<{
    baseName: string;
    name: string;
    type: string;
  }>;

  static getAttributeTypeMap(): {
    baseName: string;
    name: string;
    type: string;
  }[];
}
/* eslint-enable @typescript-eslint/explicit-member-accessibility */
