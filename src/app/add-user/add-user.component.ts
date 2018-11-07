import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { USERS } from '../mockUsers';
import { UserVO } from '../user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  
  public userList = USERS;
  public validationError = false;
  tempUsers : Array<UserVO>;
  public addUserForm = new FormGroup({name : new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    employeeId: new FormControl(),
    userSearchName: new FormControl()
  });
  constructor( private route: ActivatedRoute,  private router : Router){
    this.createForm();
   }
  ngOnInit() {
  }
  createForm()
  {

    
  }

  onSubmit()
  {
    if(this.addUserForm.get("firstName").status == "INVALID"
      || this.addUserForm.get("lastName").status == "INVALID"
      || this.addUserForm.get("employeeId").status == "INVALID")
    {
      this.validationError = true;
    }
    else{
      this.validationError = false;
      // TODO : Add the service call here
    }
  }

  sortByFirstName(userSearch){
    console.log(userSearch);
    this.search(userSearch);
    this.userList.sort((n1,n2) => { return n1.firstName.localeCompare( n2.firstName)});
  }

  sortByLastName(userSearch){
    console.log(userSearch);
    
    this.search(userSearch);
    this.userList.sort((n1,n2) => { return n1.lastName.localeCompare( n2.lastName)});
  }

  sortById(userSearch){
    console.log(userSearch);
    
    this.search(userSearch);
    this.userList.sort((n1,n2) => { return n1.employeeId.localeCompare( n2.employeeId)});
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

  search(userSearch)
  {
    
    this.userList = USERS;
    this.tempUsers = [];
    for(let userItem of this.userList) {
      if(userItem.firstName.toLowerCase().includes(userSearch.toLowerCase())
      || userItem.lastName.toLowerCase().includes(userSearch.toLowerCase())
      || userItem.employeeId.toLowerCase().includes(userSearch.toLowerCase()))
      {
        this.tempUsers.push(userItem);        
      }
    }
    this.userList = this.tempUsers;
  }


}
