import { Pipe, PipeTransform } from '@angular/core';
import { TaskVO } from './task';
@Pipe({
  name: 'filterTaskByPriorityTo'
})
export class FilterPriorityTaskPipeTo implements PipeTransform {
  transform(items: TaskVO[], priorityTaskSearchTextTo: number ): any[] {
    if (!priorityTaskSearchTextTo){
        return items;
      }
      if (!Array.isArray(items)){
        return items;
      }
      return items.filter( it => {
        return it.priority <= priorityTaskSearchTextTo;
      });
   }
}