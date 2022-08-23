import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'format'
})
export class FormatPipe implements PipeTransform {
  public thousand: number = 1000;
  public million: number = 1000000;
  public billion: number = 1000000000;
  public trillion: number = 1000000000000;

  transform(value: number, after_dot: number): string | undefined {
    let value_string: string | undefined;

    if (value >= this.trillion) {
      value_string = this.convert(value, after_dot, this.trillion, 'T');
    } else if (value >= this.billion) {
      value_string = this.convert(value, after_dot, this.billion, 'B');
    } else if (value >= this.million) {
      value_string = this.convert(value, after_dot, this.million, 'M');
    } else if (value >= this.thousand) {
      value_string = this.convert(value, after_dot, this.thousand, 'K');
    }
    return value_string;
  }

  public convert(value: number, after_dot: number, number: number, symbol:string): string | undefined {
    let value_string: string | undefined;
    let isInteger: boolean = Number.isInteger(value / number);

    if (isInteger) {
      value_string = String(value / number) + symbol;
    } else {
      value = value / number;
      if (after_dot === 0) {
        after_dot++;
      }
      value_string = value.toFixed(after_dot) + symbol;
    }
    return value_string;
  }
}
