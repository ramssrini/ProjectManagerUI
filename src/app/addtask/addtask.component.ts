import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TaskVO } from '../task';
import { TaskManagerService } from '../services/taskmanager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PROJECTS } from '../mockProjects';
import { USERS } from '../mockUsers';
import { TASKS } from '../mockTasks';
import { DateFormatPipe } from '../dateFormat.pipe';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {
  addTaskForm : FormGroup;
  public validationError = false;
  public projectList = PROJECTS;
  public userList = USERS;
  public taskList = TASKS;
  public projectSearchText : string;
  // taskName = new FormControl('');
  constructor(public service: TaskManagerService,  private route: ActivatedRoute,  private router : Router, private _dateFormatPipe:DateFormatPipe){
      //  service.getTask();
      this.createForm();
  }
  ngOnInit() {

  }
  createForm()
  {
    this.addTaskForm = new FormGroup({
      taskName: new FormControl(),
      projectName: new FormControl(),
      parentTaskName: new FormControl(),
      priority:new FormControl,
      startDate: new FormControl(),
      endDate: new FormControl(),
      userName: new FormControl(),
      parentCheckBox : new FormControl()
    });

    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + parseInt("1"));
    this.addTaskForm.get("startDate").setValue(this._dateFormatPipe.transform(new Date()));
    this.addTaskForm.get("endDate").setValue(this._dateFormatPipe.transform(currentDate));
  }

  newTask = new TaskVO();
  onSubmit(){
    if(this.addTaskForm.get("taskName").status == "INVALID"
      || this.addTaskForm.get("projectName").status == "INVALID"
      || this.addTaskForm.get("startDate").status == "INVALID"
      || this.addTaskForm.get("endDate").status == "INVALID"
      || this.addTaskForm.get("userName").status == "INVALID")
    {
      this.validationError = true;
    }
    else{
      // this.newTask.task = this.addTaskForm.get("taskName").value
      // this.newTask.parentTask = this.addTaskForm.get("parentTaskName").value
      // this.newTask.priority = this.addTaskForm.get("priority").value
      // this.newTask.startDate = this.addTaskForm.get("startDate").value
      // this.newTask.endDate = this.addTaskForm.get("endDate").value
      // console.log(this.newTask);
      // this.service.addTaskInfo(this.newTask);
      
      // this.router.navigateByUrl("");
      this.validationError = false;
    }
  }
  populateProjectName(selectedProject){
    this.addTaskForm.get("projectName").setValue(selectedProject);

  }
  populateParentTask(selectedParentTask){
    this.addTaskForm.get("parentTaskName").setValue(selectedParentTask);

  }
  populateUserName(selectedUserName){
    this.addTaskForm.get("userName").setValue(selectedUserName);

  }
  reset()
  {
    this.createForm();
  }

  onclickParentCheckbox()
  {
    let element = <HTMLInputElement> document.getElementById("parentCheckBox");  

    let parentTaskSearchButtonElement = <HTMLInputElement>document.getElementById("parentTaskSearchButton");
    if(element.checked == true)
    {
      this.addTaskForm.get("priority").disable();
      this.addTaskForm.get("startDate").disable();
      this.addTaskForm.get("endDate").disable();
      parentTaskSearchButtonElement.disabled = true;
    }
      
    else {
      this.addTaskForm.get("priority").enable();
      this.addTaskForm.get("startDate").enable();
      this.addTaskForm.get("endDate").enable();
      parentTaskSearchButtonElement.disabled = false;
  }
  }

}
