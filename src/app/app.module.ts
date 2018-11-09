import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { UpdatetaskComponent } from './updatetask/updatetask.component';
import { FilterPipe} from './filter.pipe';
import { FilterProjectPipe} from './filterProject.pipe';
import { FilterParentTaskPipe } from './filterParentTask.pipe.';
import { FilterPriorityTaskPipe } from './filterTaskByPriority.pipe';
import { RouterModule , Routes} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { TaskManagerService } from './services/taskmanager.service';
import { FilterPriorityTaskPipeTo } from './filterTaskByPriorityTo.pipe';
import { FilterTaskByStartDate } from './filterTaskByStartDate.pipe';
import { FilterTaskByEndDate } from './filterTaskByEndDate.pipe';
import { AddProjectComponent } from './add-project/add-project.component';
import { AddUserComponent } from './add-user/add-user.component';
import { FilterUserNamePipe } from './filterUserName.pipe';
import { DateFormatPipe } from './dateFormat.pipe';
import { UserManagerService } from './services/usermanager.service';
import { ProjectManagerService } from './services/projectmanager.service';

@NgModule({
  declarations: [
    AppComponent,
    ViewtaskComponent,
    AddtaskComponent,
    UpdatetaskComponent,
    FilterPipe, 
    FilterParentTaskPipe,
    FilterPriorityTaskPipe,
    FilterPriorityTaskPipeTo,
    FilterTaskByStartDate,
    FilterTaskByEndDate,
    FilterProjectPipe,
    FilterUserNamePipe,
    AddProjectComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [
    TaskManagerService, DateFormatPipe, UserManagerService, ProjectManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
