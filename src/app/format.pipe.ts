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
    value_string = this.convert(value, after_dot);
    return value_string;
  }

  public convert(value: number, after_dot: number): string | undefined {
    let value_string: string | undefined;
    let isInteger: boolean;
    let symbol: string = '';
    let number: number = 1;

    if (value >= this.trillion) {
      symbol = 'T';
      number = this.trillion;
    } else if (value >= this.billion) {
      symbol = 'B';
      number = this.billion;
    } else if (value >= this.million) {
      symbol = 'M';
      number = this.million;
    } else if (value >= this.thousand) {
      symbol = 'K';
      number = this.thousand;
    }

    isInteger = Number.isInteger(value / number)

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
