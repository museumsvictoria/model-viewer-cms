import {ObjectModel} from "./objectModel";

export class ProjectModel {
    id: string;
    name: string;
    addedBy: string;
    objects: ObjectModel[];
}
