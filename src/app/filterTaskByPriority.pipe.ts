import { Pipe, PipeTransform } from '@angular/core';
import { TaskVO } from './task';
@Pipe({
  name: 'filterTaskByPriorityFrom'
})
export class FilterPriorityTaskPipe implements PipeTransform {
  transform(items: TaskVO[], priorityTaskSearchTextFrom: number ): any[] {
    if (!priorityTaskSearchTextFrom){
        return items;
      }
      if (!Array.isArray(items)){
        return items;
      }
      return items.filter( it => {
        return it.priority >= priorityTaskSearchTextFrom;
      });
   }
}