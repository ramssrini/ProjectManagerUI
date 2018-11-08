import { Pipe, PipeTransform } from '@angular/core';
import { ProjectVO } from './project';
@Pipe({
  name: 'filterProject'
})
export class FilterProjectPipe implements PipeTransform {
  transform(items: ProjectVO[], projectSearchText: string): any[] {
    if (!projectSearchText){
        return items;
      }
      if (!Array.isArray(items)){
        return items;
      }
      return items.filter( it => {
        return it.project.toLowerCase().includes(projectSearchText.toLowerCase());
      });
   }
}