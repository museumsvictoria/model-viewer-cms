import { SectionModel } from "./sectionModel";

export class ProjectModel {
  id: string;
  name: string;
  addedBy: string;
  sections: SectionModel[] = [];
}
