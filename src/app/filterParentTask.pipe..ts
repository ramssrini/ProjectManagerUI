import { Pipe, PipeTransform } from '@angular/core';
import { TaskVO } from './task';
@Pipe({
  name: 'filterParentTask'
})
export class FilterParentTaskPipe implements PipeTransform {
  transform(items: TaskVO[], parentTaskSearchText: string): any[] {
    if (!parentTaskSearchText){
        return items;
      }
      if (!Array.isArray(items)){
        return items;
      }
      return items.filter( it => {
        return it.parentTask.toLowerCase().includes(parentTaskSearchText.toLowerCase());
      });
   }
}