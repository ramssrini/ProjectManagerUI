
import { Component, OnInit } from '@angular/core';
import {TASKS} from'../mockTasks'
import { TaskManagerService } from '../services/taskmanager.service';
import { TaskVO } from '../task';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {
  
  public parentTaskSearchText : string;
  public tasksearchText : string;
  tempTasks : Array<TaskVO>;
  // private router: Router;
  public taskList = TASKS;
  constructor(public service: TaskManagerService,  private route: ActivatedRoute, private router : Router){
    // this.service.getTasks().then(data => this.taskList = data);
    // console.log(this.taskList);
  }

  ngOnInit() {
    
  }

  sortByStartDate(projectSearch){
    
    this.search(projectSearch);
    this.taskList.sort((n1,n2) => { return (new Date(n1.startDate)).getTime() - (new Date(n2.startDate)).getTime()});
  }

  sortByEndDate(projectSearch){
    
    this.search(projectSearch);
    this.taskList.sort((n1,n2) => { return (new Date(n1.endDate)).getTime() - (new Date(n2.endDate)).getTime()});
    
  }

  sortByPriority(projectSearch){
    
    this.search(projectSearch);
    this.taskList.sort((n1,n2) => { return n1.priority - n2.priority});
  }

  sortByCompletedStatus(){
    // this.taskList = TASKS;
    // this.taskList.sort((n1,n2) =>
    // {
    //   if (n1. > n2) {
    //     return 1;
    // }

    // if (n1 < n2) {
    //     return -1;
    // }

    // return 0;
    // }
    // )
  }

  search(projectSearch)
  {
    
    this.taskList = TASKS;
    this.tempTasks = [];
    for(let taskItem of this.taskList) {
      if(taskItem.project.toLowerCase().includes(projectSearch.toLowerCase()))
      {
        this.tempTasks.push(taskItem);
        console.log(taskItem);
        let newDate = new Date(taskItem.endDate);
        console.log(newDate)
      }
    }
    this.taskList = this.tempTasks;
  }

  edit(taskvo: TaskVO)
  {
    console.log(taskvo);
    this.router.navigateByUrl("/updateTask/"+taskvo.taskId);
  }
  remove(id){
    this.service.delete(id);
    window.location.reload();
  }

}
