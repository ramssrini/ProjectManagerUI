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
  // private router: Router;
  public taskList :Array<TaskVO> = [
   
  ];
  constructor(public service: TaskManagerService,  private route: ActivatedRoute, private router : Router){
    this.service.getTasks().then(data => this.taskList = data);
    console.log(this.taskList);
  }

  ngOnInit() {
  
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
