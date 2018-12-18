
import { Component, OnInit } from '@angular/core';
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
  public taskList : Array<TaskVO>;
  public resetTaskList :Array<TaskVO> = [
   
  ];
  constructor(public service: TaskManagerService,  private route: ActivatedRoute, private router : Router){
    this.service.getTasks().then(data => this.taskList = data);
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
    console.log(this.taskList);
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
    this.service.getTasks().then(data => this.resetTaskList = data);
    this.tempTasks = [];
    for(let taskItem of this.resetTaskList) {
      if(taskItem.project.toLowerCase().includes(projectSearch.toLowerCase()))
      {
        this.tempTasks.push(taskItem);
        let newDate = new Date(taskItem.endDate);
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
