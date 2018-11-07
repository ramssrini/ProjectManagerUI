import { Component, OnInit } from '@angular/core';
import { PROJECTS } from '../mockProjects';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ProjectVO } from '../project';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  public projectList = PROJECTS;
  addProjectForm : FormGroup;
  tempProjects : Array<ProjectVO>;
  constructor( private route: ActivatedRoute,  private router : Router){
    this.createForm();
   }

   createForm()
  {
    this.addProjectForm = new FormGroup({
      projectName: new FormControl(),
      startEndDateCheckBox: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      priority:new FormControl(),
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

}
