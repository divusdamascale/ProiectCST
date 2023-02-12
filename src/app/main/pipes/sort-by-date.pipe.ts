import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByDate',
})
export class SortByDatePipe implements PipeTransform {
  transform(items: any[], realdate: string): any[] {
    return items.sort((a, b) => {
      const dateA = a[realdate];
      const dateB = b[realdate];
      return dateA > dateB ? 1 : -1;
    });
  }
}
