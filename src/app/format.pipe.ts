import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'format'
})
export class FormatPipe implements PipeTransform {
  public thousand: number = 1000;
  public million: number = 1000000;

  transform(value: number, after_dot: number): string | undefined {
    let value_string: string | undefined;
    let isInteger: boolean = Number.isInteger(value / this.thousand);

    if (value >= this.million) {
      value_string = String(value / this.million) + 'M';
    } else if (value >= this.thousand) {
      if (isInteger) {
        value_string = String(value / this.thousand) + 'K';
      } else {
        value = value / this.thousand;
        if (after_dot === 0) {
          after_dot++;
        }
        value_string = value.toFixed(after_dot) + 'K';
      }
    }
    return value_string;
  }

}
