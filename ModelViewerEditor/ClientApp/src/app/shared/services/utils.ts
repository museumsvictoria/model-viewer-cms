export class Utils {
  static round(n: number, precision: number) {
    const factor = Math.pow(10, precision);
    const tempNumber = n * factor;
    const roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
  };

  static getDegrees(r: number, absolute: boolean): number {
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

