import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'myfilter',
  pure: false
})
export class FilterPipeComponent implements PipeTransform {
  transform(items: any, filter: string): any {
    if (!filter) {
      return items;
    }
    let result = [];
    filter = filter.toLowerCase();
    items.forEach(function (item) {
      if (item.Name.toLowerCase().indexOf(filter) !== -1) {
        result.push(item);
      }
    });
    return result;
  }
}
