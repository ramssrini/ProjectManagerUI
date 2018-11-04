import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { TaskManagerService } from '../services/taskmanager.service';
import { TaskVO } from '../task';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-updatetask',
  templateUrl: './updatetask.component.html',
  styleUrls: ['./updatetask.component.css']
})
export class UpdatetaskComponent implements OnInit {
  public task :TaskVO;
  selectedId: string;
  @Input() updateTaskForm = new FormGroup({
      taskName: new FormControl(),
      parentTaskName: new FormControl(),
      priority:new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl()
    });
  
  constructor(public service: TaskManagerService,  private route: ActivatedRoute,  private router : Router){
   
  }
 
  ngOnInit() {

    this.route.params.subscribe(params => {
      // this.sub = new  TaskVO();
      this.selectedId = params['id']; // (+) converts string 'id' to a number
   });

  }
  
  
  newTask = new TaskVO();
  onSubmit(){
    this.newTask.task = this.updateTaskForm.get("taskName").value
    this.newTask.taskId = parseInt(this.selectedId);
    this.newTask.parentTask = this.updateTaskForm.get("parentTaskName").value
    this.newTask.priority = this.updateTaskForm.get("priority").value
    this.newTask.startDate = this.updateTaskForm.get("startDate").value
    this.newTask.endDate = this.updateTaskForm.get("endDate").value
    console.log(this.newTask);
    this.service.updateTaskInfo(this.newTask);
    this.router.navigateByUrl("");
  }

  cancel(){
    this.router.navigateByUrl("");
  }
  ngAfterViewInit(): void {
    
//     this.updateTaskForm.get('parentTaskName').statusChanges.subscribe(data => this.usrNameStatus = data);

this.service.getTasksById(this.selectedId).subscribe(res => {
  this.task = JSON.parse(res._body);
  this.updateTaskForm.get("taskName").setValue(this.task.task);
  this.updateTaskForm.get("parentTaskName").setValue(this.task.parentTask);
  this.updateTaskForm.get("priority").setValue(this.task.priority);
  this.updateTaskForm.get("startDate").setValue(this.task.startDate);
  this.updateTaskForm.get("endDate").setValue(this.task.endDate);
});
} 
}
