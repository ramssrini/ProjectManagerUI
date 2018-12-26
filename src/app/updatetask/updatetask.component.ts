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
  selector: 'app-updatetask',
  templateUrl: './updatetask.component.html',
  styleUrls: ['./updatetask.component.css']
})
export class UpdatetaskComponent implements OnInit {
  updateTaskForm : FormGroup;
  public validationError = false;
  selectedId: string;
  taskVO : TaskVO;
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
      
      this.createForm();
	 this.route.params.subscribe(params => {
      // this.sub = new  TaskVO();
      this.selectedId = params['id']; // (+) converts string 'id' to a number
   });
   this.service.getTasksById(this.selectedId).subscribe(res => {
    this.taskVO = JSON.parse(res._body);
    this.updateTaskForm.get("taskName").setValue(this.taskVO.task);
    this.updateTaskForm.get("priority").setValue(this.taskVO.taskId);
    this.updateTaskForm.get("startDate").setValue(this.taskVO.parentId);
    this.updateTaskForm.get("parentTaskName").setValue(this.taskVO.parentTask);
    this.updateTaskForm.get("priority").setValue(this.taskVO.priority);
    this.updateTaskForm.get("startDate").setValue(this.taskVO.startDate);
    this.updateTaskForm.get("endDate").setValue(this.taskVO.endDate);
    this.updateTaskForm.get("projectId").setValue(this.taskVO.projectId);
    this.updateTaskForm.get("userEmployeeId").setValue(this.taskVO.userEmployeeId);
    this.updateTaskForm.get("userFirstName").setValue(this.taskVO.userFirstName);
    this.updateTaskForm.get("userId").setValue(this.taskVO.userId);
    this.updateTaskForm.get("userLastName").setValue(this.taskVO.userLastName);
    this.updateTaskForm.get("userprojectId").setValue(this.taskVO.userprojectId);
    this.populateProjectName(this.taskVO.project, this.taskVO.projectId);
    this.populateUserName(this.taskVO.userLastName, this.taskVO.userFirstName, this.taskVO.userId, this.taskVO.userTaskId, this.taskVO.userEmployeeId, this.taskVO.userprojectId);
    this.populateParentTask(this.taskVO.parentTask, this.taskVO.parentId);
  });
   
 

  console.log(this.updateTaskForm);
      this.service.getParentTasks().then(data => this.parentTaskList = data);
      this.projectService.getProjects().then(data => this.projectList = data);
      this.userService.getUsers().then(data => this.userList = data);

  }
  ngOnInit() {

  }
  createForm()
  {
    this.updateTaskForm = new FormGroup({
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
    this.updateTaskForm.get("startDate").setValue(this._dateFormatPipe.transform(new Date()));
    this.updateTaskForm.get("endDate").setValue(this._dateFormatPipe.transform(currentDate));
  }

  newTask = new TaskVO();
  onSubmit(){
    if(this.updateTaskForm.get("taskName").status == "INVALID"
      || this.updateTaskForm.get("projectName").status == "INVALID"
      || this.updateTaskForm.get("startDate").status == "INVALID"
      || this.updateTaskForm.get("endDate").status == "INVALID"
      || this.updateTaskForm.get("userName").status == "INVALID")
    {
      this.validationError = true;
    }
    else{
      this.newTask.task = this.updateTaskForm.get("taskName").value;
      this.newTask.project = this.updateTaskForm.get("projectName").value;
      this.newTask.parentTask = this.updateTaskForm.get("parentTaskName").value;
      this.newTask.parentId = this.updateTaskForm.get("parentTaskId").value;
      this.newTask.priority = this.updateTaskForm.get("priority").value;
      this.newTask.startDate = this.updateTaskForm.get("startDate").value;
      this.newTask.endDate = this.updateTaskForm.get("endDate").value;
      this.newTask.userId = this.updateTaskForm.get("userId").value;
      this.newTask.userEmployeeId = this.updateTaskForm.get("userEmployeeId").value;
      this.newTask.userFirstName = this.updateTaskForm.get("userFirstName").value;
      this.newTask.userLastName = this.updateTaskForm.get("userLastName").value;
      this.newTask.userTaskId = this.updateTaskForm.get("userTaskId").value;
      this.newTask.userprojectId = this.updateTaskForm.get("userprojectId").value;
      this.newTask.projectId = this.updateTaskForm.get("projectId").value;
      this.newTask.taskId = this.selectedId;
      console.log(this.newTask);
      this.service.updateTaskInfo(this.newTask);
      this.router.navigateByUrl("/");
    }
  }
  populateProjectName(selectedProject, selectedProjectId){
    this.updateTaskForm.get("projectName").setValue(selectedProject);
    this.updateTaskForm.get("projectId").setValue(selectedProjectId);

  }
  populateParentTask(selectedParentTask, selectedParentTaskId){
    this.updateTaskForm.get("parentTaskName").setValue(selectedParentTask);
    this.updateTaskForm.get("parentTaskId").setValue(selectedParentTaskId);

  }
  populateUserName(lastName , firstName, _id, taskId, employeeId, projectId){
    console.log(lastName + "   -  " + firstName + "   -  " + _id + "   -  " + taskId + "   -  " + employeeId + "   -  " +projectId );
    this.updateTaskForm.get("userName").setValue(lastName+ ' ' + firstName);
    this.updateTaskForm.get("userLastName").setValue(lastName);
    this.updateTaskForm.get("userFirstName").setValue(firstName);
    this.updateTaskForm.get("userId").setValue(_id);
    this.updateTaskForm.get("userTaskId").setValue(taskId);
    this.updateTaskForm.get("userEmployeeId").setValue(employeeId);
    this.updateTaskForm.get("userprojectId").setValue(projectId);
    

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
      this.updateTaskForm.get("priority").disable();
      this.updateTaskForm.get("startDate").disable();
      this.updateTaskForm.get("endDate").disable();
      parentTaskSearchButtonElement.disabled = true;
    }
      
    else {
      this.updateTaskForm.get("priority").enable();
      this.updateTaskForm.get("startDate").enable();
      this.updateTaskForm.get("endDate").enable();
      parentTaskSearchButtonElement.disabled = false;
  }
  }

}
