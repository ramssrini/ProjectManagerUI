import{NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { UpdatetaskComponent } from './updatetask/updatetask.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
    { path: 'viewTask', component: ViewtaskComponent },
    { path: 'addTask', component: AddtaskComponent },
    { path: 'addProject', component: AddProjectComponent },
    { path: 'addUser', component: AddUserComponent },
    { path: 'updateTask/:id', component: UpdatetaskComponent  },
    { path: '', component: ViewtaskComponent }
  ];

@NgModule({
    exports : [RouterModule],
    imports :[RouterModule.forRoot(routes)]
})

export class AppRoutingModule{
    

}