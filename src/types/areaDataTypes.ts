export interface AreaData {
  DID: Device;
  FMW: number;
  TMS: number;
  bvol: number;
  tem1: number;
  hum1: number;
  solr: number;
  prec: number;
  wind: number;
  wins: number;
  lwet: number;
}

export interface AreaDataWithDate extends AreaData {
  date: Date;
}

export interface AreaDataWithTimestamp extends AreaData {
  timestamp: string;
}

export enum Device {
  Type1 = '25_225',
  Type2 = '25_226',
}
