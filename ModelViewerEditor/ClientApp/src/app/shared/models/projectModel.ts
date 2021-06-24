import { ObjectModel } from "./objectModel";

export class ProjectModel {
  id: string;
  name: string;
  addedBy: string;
  sections: SectionModel[];
}

export class SectionModel {
  id: string;
  name: string;
  models: ObjectModel[];
}
