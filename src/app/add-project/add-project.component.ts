import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ProjectVO } from '../project';
import { DateFormatPipe } from '../dateFormat.pipe';
import { ProjectManagerService } from '../services/projectmanager.service';
import { UserVO } from '../user';
import { UserManagerService } from '../services/usermanager.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  public projectList :Array<ProjectVO> = [
   
  ];
  public resetProjectList :Array<ProjectVO> = [
   
  ];
  public userList :Array<UserVO> = [
   
  ];
  public validationError = false;
  addProjectForm : FormGroup;
  tempProjects : Array<ProjectVO>;
  constructor(public service: ProjectManagerService, public userService: UserManagerService, private route: ActivatedRoute,  private router : Router, private _dateFormatPipe:DateFormatPipe){
    this.createForm();
    this.getProjects();
    this.getUsers();
   }
   getProjects()
   {
     this.service.getProjects().then(data => this.projectList = data);
     this.service.getProjects().then(data => this.resetProjectList = data);
   }
   getUsers()
   {
     this.userService.getUsers().then(data => this.userList = data);
   }
   createForm()
  {
    this.addProjectForm = new FormGroup({
      projectName: new FormControl(),
      startEndDateCheckBox: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      priority:new FormControl(0),
      managerName:new FormControl(),
      projectSearchName:new FormControl()
    });
  }

  newProject = new ProjectVO();
  onSubmit()
  {
    if(this.addProjectForm.get("projectName").status == "INVALID"
      || this.addProjectForm.get("startDate").status == "INVALID"
      || this.addProjectForm.get("endDate").status == "INVALID"
      || this.addProjectForm.get("priority").status == "INVALID")
    {
      this.validationError = true;
    }
    else{
      this.validationError = false;
       this.newProject.project = this.addProjectForm.get("projectName").value;
      this.newProject.startDate = this.addProjectForm.get("startDate").value;
      this.newProject.endDate = this.addProjectForm.get("endDate").value;
      this.newProject.priority = this.addProjectForm.get("priority").value;
      console.log(this.newProject);
      this.service.addProjectInfo(this.newProject);
      window.location.reload();
    }
  }

  ngOnInit() {
  }

  sortByStartDate(projectSearch){
    
    this.search(projectSearch);
    this.projectList.sort((n1,n2) => { return (new Date(n1.startDate)).getTime() - (new Date(n2.startDate)).getTime()});
  }

  sortByEndDate(projectSearch){
    
    this.search(projectSearch);
    this.projectList.sort((n1,n2) => { return (new Date(n1.endDate)).getTime() - (new Date(n2.endDate)).getTime()});
    
  }

  sortByPriority(projectSearch){
    
    this.search(projectSearch);
    this.projectList.sort((n1,n2) => { return n1.priority - n2.priority});
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
    this.service.getProjects().then(data => this.resetProjectList = data);
    this.tempProjects = [];
    for(let projectItem of this.resetProjectList) {
      if(projectItem.project.toLowerCase().includes(projectSearch.toLowerCase()))
      {
        this.tempProjects.push(projectItem);
        console.log(projectItem);
        let newDate = new Date(projectItem.endDate);
        console.log(newDate)
      }
    }
    this.projectList = this.tempProjects;
  }
  populateUserName(selectedUserName){
    this.addProjectForm.get("managerName").setValue(selectedUserName);

  }


  defaultDates()
  {
    let element = <HTMLInputElement> document.getElementById("startEndDateCheckBox");  
    if(element.checked == true)
    {
      this.addProjectForm.get("startDate").enable();
      this.addProjectForm.get("endDate").enable();
      let currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + parseInt("1"));
      this.addProjectForm.get("startDate").setValue(this._dateFormatPipe.transform(new Date()));
      this.addProjectForm.get("endDate").setValue(this._dateFormatPipe.transform(currentDate));
    }
    else {
      this.addProjectForm.get("startDate").disable();
      this.addProjectForm.get("endDate").disable();
      this.addProjectForm.get("startDate").setValue("");
      this.addProjectForm.get("endDate").setValue("");
    }
  }

  reset(){
    this.createForm();
  }

  suspend(projectid)
  {
    this.service.deleteProject(projectid);
    window.location.reload();
  }
}
