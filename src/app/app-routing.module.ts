import{NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { UpdatetaskComponent } from './updatetask/updatetask.component';

const routes: Routes = [
    { path: 'viewTask', component: ViewtaskComponent },
    { path: 'addTask', component: AddtaskComponent },
    { path: 'updateTask/:id', component: UpdatetaskComponent  },
    { path: '', component: ViewtaskComponent }
  ];

@NgModule({
    exports : [RouterModule],
    imports :[RouterModule.forRoot(routes)]
})

export class AppRoutingModule{
    

}