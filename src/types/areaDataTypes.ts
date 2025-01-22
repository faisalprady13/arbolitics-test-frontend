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

export enum Device {
  type1 = '25_225',
  type2 = '25_226',
}
