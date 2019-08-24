import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addressTransform'
})
export class AddressTransformPipe implements PipeTransform {

  transform(addressForm: any, ...args: any[]): any {
    return Object.keys(addressForm).map(key => addressForm[key]).join(', ');
  }

}
