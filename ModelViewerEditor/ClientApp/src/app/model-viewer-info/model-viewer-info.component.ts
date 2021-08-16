import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Utils} from "../shared/services/utils";


@Component({
  selector: 'app-model-viewer-info',
  templateUrl: './model-viewer-info.component.html',
  styleUrls: ['./model-viewer-info.component.scss']
})
export class ModelViewerInfoComponent implements AfterViewInit {

  @Input() viewer: any;

  constructor() { }

  ngAfterViewInit(): void {
    this.viewer.addEventListener('camera-change', x => {
      this.updateCameraInfo();
    });

  }

  thetaAbsolute: string;
  thetaRelative: string;
  phiAbsolute: string;
  phiRelative: string;
  distance: string;
  fov: string;
  orbit: any;

  updateCameraInfo() {

    this.orbit = this.viewer.getCameraOrbit();
    this.thetaAbsolute= `${Utils.round(ModelViewerInfoComponent.getDegrees( this.orbit.theta, true), 3)}`;
    this.thetaRelative = `${Utils.round(ModelViewerInfoComponent.getDegrees( this.orbit.theta, false) % 360, 3)}`;
    this.phiAbsolute = `${Utils.round(ModelViewerInfoComponent.getDegrees( this.orbit.phi, true), 3)}`;
    this.phiRelative = `${Utils.round(ModelViewerInfoComponent.getDegrees( this.orbit.phi, false) % 360, 3)}`;
    this.distance =`${Utils.round( this.orbit.radius, 3)}`;
    this.fov = `${Utils.round(this.viewer.getFieldOfView(), 3)}`;

  }



  private static getDegrees(r: number, absolute: boolean): number {
    let degrees = r * 180 / Math.PI;

    if (absolute)
      return degrees;



    if (degrees == 360 || degrees == -360)
      degrees = 0;

    if (degrees > 360 || degrees < -360)
      degrees = degrees % 360;

    if (degrees < 0)
      degrees = 360 + degrees;

    return degrees;
  }






}
