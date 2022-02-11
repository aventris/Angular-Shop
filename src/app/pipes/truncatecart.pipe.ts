import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncatecart',
})
export class TruncatecartPipe implements PipeTransform {
  transform(value: number): string {
    if (value > 99) return '+99';
    return value.toString();
  }
}
