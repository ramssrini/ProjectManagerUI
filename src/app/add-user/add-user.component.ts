import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { USERS } from '../mockUsers';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  
  public userList = USERS;
  addUserForm : FormGroup;
  constructor( private route: ActivatedRoute,  private router : Router){
    this.createForm();
   }
  ngOnInit() {
  }
  createForm()
  {
    this.addUserForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      employeeId: new FormControl(),
      userSearchName: new FormControl()
    });
  }
}
