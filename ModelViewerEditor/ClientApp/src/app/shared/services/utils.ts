export class Utils {
    static  round(n: number, precision: number) {
    const factor = Math.pow(10, precision);
    const tempNumber = n * factor;
    const roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
  };
}

