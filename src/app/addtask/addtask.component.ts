import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TaskVO } from '../task';
import { TaskManagerService } from '../services/taskmanager.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {
  addTaskForm : FormGroup;
  // taskName = new FormControl('');
  constructor(public service: TaskManagerService,  private route: ActivatedRoute,  private router : Router){
      //  service.getTask();
      this.createForm();
  }
  ngOnInit() {

  }
  createForm()
  {
    this.addTaskForm = new FormGroup({
      taskName: new FormControl(),
      parentTaskName: new FormControl(),
      priority:new FormControl,
      startDate: new FormControl(),
      endDate: new FormControl()
    });
  }

  newTask = new TaskVO();
  onSubmit(){
    this.newTask.task = this.addTaskForm.get("taskName").value
    this.newTask.parentTask = this.addTaskForm.get("parentTaskName").value
    this.newTask.priority = this.addTaskForm.get("priority").value
    this.newTask.startDate = this.addTaskForm.get("startDate").value
    this.newTask.endDate = this.addTaskForm.get("endDate").value
    console.log(this.newTask);
    this.service.addTaskInfo(this.newTask);
    
    this.router.navigateByUrl("");
  }

  reset()
  {
    this.createForm();
  }

}
