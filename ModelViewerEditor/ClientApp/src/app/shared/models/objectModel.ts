import { HotspotModel } from "./hotspotModel";

export class ObjectModel {
  id: string;
  name: string;
  originalFileName: string;
  length: number;
  hotspots: HotspotModel[] = [];
}
