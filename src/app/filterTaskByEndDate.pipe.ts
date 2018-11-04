import { Pipe, PipeTransform } from '@angular/core';
import { TaskVO } from './task';
@Pipe({
  name: 'filterTaskByEndDate'
})
export class FilterTaskByEndDate implements PipeTransform {
  transform(items: TaskVO[], taskEndDate: string ): any[] {
    if (!taskEndDate){
        return items;
      }
      if (!Array.isArray(items)){
        return items;
      }
      let endDate = new Date(taskEndDate);
      return items.filter( it => {
        return (new Date(it.endDate)).getTime() <= endDate.getTime()   ;
      });
   }
}