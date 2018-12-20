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
  public add = true;
  public update = false;
  tempUsers : Array<UserVO>;
  resetUsers :Array<UserVO> = [
   
  ];
  addUserForm : FormGroup;
  constructor(public service:UserManagerService, private route: ActivatedRoute,  private router : Router){
    this.createForm();
   }
  ngOnInit() {
    this.getUsers();
  }

  getUsers()
  {
    this.service.getUsers().then(data => this.userList = data);
    this.service.getUsers().then(data => this.resetUsers = data);
  }
  createForm()
  {
    this.addUserForm = new FormGroup({name : new FormControl(),
      userId : new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      employeeId: new FormControl(),
      userSearchName: new FormControl()
    });
    
  }
  newUser = new UserVO();
  updateUserVo = new UserVO();
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
      this.newUser.firstName = this.addUserForm.get("firstName").value;
      this.newUser.lastName = this.addUserForm.get("lastName").value;
      this.newUser.employeeId = this.addUserForm.get("employeeId").value;
      this.service.addUserInfo(this.newUser);
      window.location.reload();
    }
  }

  sortByFirstName(userSearch){
    this.search(userSearch);
    this.userList.sort((n1,n2) => { return n1.firstName.localeCompare( n2.firstName)});
  }

  sortByLastName(userSearch){
    
    this.search(userSearch);
    this.userList.sort((n1,n2) => { return n1.lastName.localeCompare( n2.lastName)});
  }

  sortById(userSearch){
    
    this.search(userSearch);
    this.userList.sort((n1,n2) => { return n1.employeeId.localeCompare( n2.employeeId)});
  }

  search(userSearch)
  {
    this.service.getUsers().then(data => this.resetUsers = data);
    this.tempUsers = [];
    for(let userItem of this.resetUsers) {
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
    this.add=true;
    this.update=false;
  }

  delete(userId)
  {
    this.service.delete(userId);
    window.location.reload();
  }

  edit(fname, lname, employeeId, userId)
  {
    this.addUserForm.get("firstName").setValue(fname);
    this.addUserForm.get("lastName").setValue(lname);
    this.addUserForm.get("employeeId").setValue(employeeId);
    this.addUserForm.get("userId").setValue(userId);
    this.add=false;
    this.update=true;
  }

  updateUser()
  {
    this.updateUserVo.firstName = this.addUserForm.get("firstName").value;
    this.updateUserVo.lastName = this.addUserForm.get("lastName").value;
    this.updateUserVo.employeeId = this.addUserForm.get("employeeId").value;
    this.updateUserVo._id = this.addUserForm.get("userId").value;
    
    console.log(this.updateUserVo);
    this.service.updateUserInfo(this.updateUserVo);
    window.location.reload();
  }
}
