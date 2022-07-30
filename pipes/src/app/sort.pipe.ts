import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: false
})
export class SortPipe implements PipeTransform {

  transform(value: any, propname: string): any {   

    value.sort((a, b) => {
      if (a[propname] > b[propname]) {
        return 1;
      } else if (a[propname] < b[propname]) {
        return -1;
      } else
        return 0;
    })
    
    return value;
  }

}
