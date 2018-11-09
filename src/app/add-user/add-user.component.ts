import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserVO } from '../user';
import { UserManagerService } from '../services/usermanager.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  
  public userList :Array<UserVO> = [
   
  ];
  public validationError = false;
  tempUsers : Array<UserVO>;
  addUserForm : FormGroup;
  constructor(public service:UserManagerService, private route: ActivatedRoute,  private router : Router){
    this.createForm();
    this.getUsers();
   }
  ngOnInit() {
  }

  getUsers()
  {
    this.service.getUsers().then(data => this.userList = data);
  }
  createForm()
  {
    this.addUserForm = new FormGroup({name : new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      employeeId: new FormControl(),
      userSearchName: new FormControl()
    });
    
  }
  newUser = new UserVO();
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
       this.newUser.firstName = this.addUserForm.get("firstName").value
      this.newUser.lastName = this.addUserForm.get("lastName").value
      this.newUser.employeeId = this.addUserForm.get("employeeId").value
      console.log(this.newUser);
      this.service.addUserInfo(this.newUser);
      window.location.reload();
    }
  }

  sortByFirstName(userSearch){
    this.search(userSearch);
    console.log(this.userList);
    this.userList.sort((n1,n2) => { return n1.firstName.localeCompare( n2.firstName)});
  }

  sortByLastName(userSearch){
    
    this.search(userSearch);
    console.log(this.userList);
    this.userList.sort((n1,n2) => { return n1.lastName.localeCompare( n2.lastName)});
  }

  sortById(userSearch){
    
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
    
    this.getUsers();
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

  reset(){
    this.createForm();
  }

  delete(userId)
  {
    this.service.delete(userId);
    window.location.reload();
  }

}
