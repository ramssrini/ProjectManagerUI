import { Pipe, PipeTransform } from '@angular/core';
import { TaskVO } from './task';
@Pipe({
  name: 'filterTaskByStartDate'
})
export class FilterTaskByStartDate implements PipeTransform {
  transform(items: TaskVO[], taskStartDate: string ): any[] {
    if (!taskStartDate){
        return items;
      }
      if (!Array.isArray(items)){
        return items;
      }
      let startDate = new Date(taskStartDate);
      return items.filter( it => {
        return (new Date(it.startDate)).getTime() >= startDate.getTime()  ;
      });
   }
}