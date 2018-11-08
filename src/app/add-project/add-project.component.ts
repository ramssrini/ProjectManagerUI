import { Component, OnInit } from '@angular/core';
import { PROJECTS } from '../mockProjects';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ProjectVO } from '../project';
import { USERS } from '../mockUsers';
import { DateFormatPipe } from '../dateFormat.pipe';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  public projectList = PROJECTS;
  public userList = USERS;
  addProjectForm : FormGroup;
  tempProjects : Array<ProjectVO>;
  constructor( private route: ActivatedRoute,  private router : Router, private _dateFormatPipe:DateFormatPipe){
    this.createForm();
   }

   createForm()
  {
    this.addProjectForm = new FormGroup({
      projectName: new FormControl(),
      startEndDateCheckBox: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      priority:new FormControl({value:0}),
      managerName:new FormControl(),
      projectSearchName:new FormControl()
    });
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
    
    this.projectList = PROJECTS;
    this.tempProjects = [];
    for(let projectItem of this.projectList) {
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
}
