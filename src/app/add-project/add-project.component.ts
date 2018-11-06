import { Component, OnInit } from '@angular/core';
import { PROJECTS } from '../mockProjects';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  public projectList = PROJECTS;
  addProjectForm : FormGroup;
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

}
