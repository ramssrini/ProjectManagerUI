import { Pipe, PipeTransform } from '@angular/core';
import { TaskVO } from './task';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: TaskVO[], taskSearchText: string): any[] {
    if (!taskSearchText){
        return items;
      }
      if (!Array.isArray(items)){
        return items;
      }
      return items.filter( it => {
        return it.task.toLowerCase().includes(taskSearchText.toLowerCase());
      });
   }
}