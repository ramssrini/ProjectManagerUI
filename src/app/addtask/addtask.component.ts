import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TaskVO } from '../task';
import { TaskManagerService } from '../services/taskmanager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DateFormatPipe } from '../dateFormat.pipe';
import { UserVO } from '../user';
import { ProjectVO } from '../project';
import { UserManagerService } from '../services/usermanager.service';
import { ProjectManagerService } from '../services/projectmanager.service';
import { ParentTaskVO } from '../parentTask';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {
  addTaskForm : FormGroup;
  public validationError = false;
  public projectList  :Array<ProjectVO> = [
   
  ];
  public userList  :Array<UserVO> = [
   
  ];
  public parentTaskList  :Array<ParentTaskVO> = [
   
  ];
  public projectSearchText : string;
  // taskName = new FormControl('');
  constructor(public service : TaskManagerService, public userService : UserManagerService, 
    public projectService : ProjectManagerService, private route: ActivatedRoute,  
    private router : Router, private _dateFormatPipe:DateFormatPipe){
      this.service.getParentTasks().then(data => this.parentTaskList = data);
      this.projectService.getProjects().then(data => this.projectList = data);
      this.userService.getUsers().then(data => this.userList = data);
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
      parentTaskId: new FormControl(),
      priority:new FormControl(0),
      startDate: new FormControl(),
      endDate: new FormControl(),
      userName: new FormControl(),
      userLastName: new FormControl(),
      userFirstName: new FormControl(),
      userEmployeeId: new FormControl(),
      userprojectId: new FormControl(),
      userTaskId: new FormControl(),
      userId: new FormControl(),
      projectId: new FormControl(),
      parentCheckBox : new FormControl()
    });

    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + parseInt("1"));
    this.addTaskForm.get("startDate").setValue(this._dateFormatPipe.transform(new Date()));
    this.addTaskForm.get("endDate").setValue(this._dateFormatPipe.transform(currentDate));
  }

  newTask = new TaskVO();
  onSubmit(){
    let element = <HTMLInputElement> document.getElementById("parentCheckBox");  
    if(element.checked == true)
      {
        if(this.addTaskForm.get("taskName").status == "INVALID")
        {
          this.validationError = true;
        }
        else{
          this.newTask.parentTask = this.addTaskForm.get("taskName").value;
          this.service.addParentTaskInfo(this.newTask);
          window.location.reload();
        }
      }
    else{
      if(this.addTaskForm.get("taskName").status == "INVALID"
        || this.addTaskForm.get("projectName").status == "INVALID"
        || this.addTaskForm.get("startDate").status == "INVALID"
        || this.addTaskForm.get("endDate").status == "INVALID"
        || this.addTaskForm.get("userName").status == "INVALID")
      {
        this.validationError = true;
      }
      else{
        this.newTask.task = this.addTaskForm.get("taskName").value;
        this.newTask.project = this.addTaskForm.get("projectName").value;
        this.newTask.parentTask = this.addTaskForm.get("parentTaskName").value;
        this.newTask.parentId = this.addTaskForm.get("parentTaskId").value;
        this.newTask.priority = this.addTaskForm.get("priority").value;
        this.newTask.startDate = this.addTaskForm.get("startDate").value;
        this.newTask.endDate = this.addTaskForm.get("endDate").value;
        this.newTask.userId = this.addTaskForm.get("userId").value;
        this.newTask.userEmployeeId = this.addTaskForm.get("userEmployeeId").value;
        this.newTask.userFirstName = this.addTaskForm.get("userFirstName").value;
        this.newTask.userLastName = this.addTaskForm.get("userLastName").value;
        this.newTask.userTaskId = this.addTaskForm.get("userTaskId").value;
        this.newTask.userprojectId = this.addTaskForm.get("userprojectId").value;
        this.newTask.projectId = this.addTaskForm.get("projectId").value;
        this.service.addTaskInfo(this.newTask);
        this.reset();
        this.validationError = false;
      }
    }
  }
  populateProjectName(selectedProject, selectedProjectId){
    this.addTaskForm.get("projectName").setValue(selectedProject);
    this.addTaskForm.get("projectId").setValue(selectedProjectId);

  }
  populateParentTask(selectedParentTask, selectedParentTaskId){
    this.addTaskForm.get("parentTaskName").setValue(selectedParentTask);
    this.addTaskForm.get("parentTaskId").setValue(selectedParentTaskId);

  }
  populateUserName(lastName , firstName, _id, taskId, employeeId, projectId){
    console.log(lastName + "   -  " + firstName + "   -  " + _id + "   -  " + taskId + "   -  " + employeeId + "   -  " +projectId );
    this.addTaskForm.get("userName").setValue(lastName+ ' ' + firstName);
    this.addTaskForm.get("userLastName").setValue(lastName);
    this.addTaskForm.get("userFirstName").setValue(firstName);
    this.addTaskForm.get("userId").setValue(_id);
    this.addTaskForm.get("userTaskId").setValue(taskId);
    this.addTaskForm.get("userEmployeeId").setValue(employeeId);
    this.addTaskForm.get("userprojectId").setValue(projectId);
    

  }
  reset()
  {
    this.createForm();
  }

  onclickParentCheckbox()
  {
    let element = <HTMLInputElement> document.getElementById("parentCheckBox");  

    let parentTaskSearchButtonElement = <HTMLInputElement>document.getElementById("parentTaskSearchButton");
    let projectSearchButtonElement = <HTMLInputElement>document.getElementById("projectSearchButton");
    let userSearchButtonElement = <HTMLInputElement>document.getElementById("userSearchButton");

    if(element.checked == true)
    {
      this.addTaskForm.get("priority").disable();
      this.addTaskForm.get("startDate").disable();
      this.addTaskForm.get("endDate").disable();
      this.addTaskForm.get("userName").disable();
      this.addTaskForm.get("parentTaskName").disable();
      this.addTaskForm.get("projectName").disable();
      parentTaskSearchButtonElement.disabled = true;
      projectSearchButtonElement.disabled = true;
      userSearchButtonElement.disabled = true;
    }
      
    else {
      this.addTaskForm.get("priority").enable();
      this.addTaskForm.get("startDate").enable();
      this.addTaskForm.get("endDate").enable();
      parentTaskSearchButtonElement.disabled = false;
      projectSearchButtonElement.disabled = false;
      userSearchButtonElement.disabled = false;
  }
  }

}
