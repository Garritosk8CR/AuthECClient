import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstKey'
})
export class FirstKeyPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
