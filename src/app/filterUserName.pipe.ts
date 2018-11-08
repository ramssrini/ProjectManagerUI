import { Pipe, PipeTransform } from '@angular/core';
import { UserVO } from './user';
@Pipe({
  name: 'filterUserName'
})
export class FilterUserNamePipe implements PipeTransform {
  transform(items: UserVO[], userNameSearchText: string): any[] {
    if (!userNameSearchText){
        return items;
      }
      if (!Array.isArray(items)){
        return items;
      }
      return items.filter( it => {
        return (it.firstName.toLowerCase().includes(userNameSearchText.toLowerCase())
        || it.lastName.toLowerCase().includes(userNameSearchText.toLowerCase()));
      });
   }
}