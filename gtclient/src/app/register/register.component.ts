import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../core/api.service';
import { Utils } from '../core/util.methods';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService,private utils: Utils) {
    this.createForm = null;

}

createForm: FormGroup;
userForm:FormGroup;
userListForm:FormGroup;
userList = [];
 
 
ngOnInit() {
   


    
    this.createForm = this.formBuilder.group({
        task :[''],
        groupId: [''],
        groupName: ['', Validators.required],
        groupLoginName: ['', Validators.required],
        password: ['', Validators.required],
      
        userList: [],
        groupDescription: [''],
        expectedExpence: ['']
       
    });

    this.userForm = this.formBuilder.group({
      userName:[''],
      userList:['']
     
  });
  this.userListForm = this.formBuilder.group({
    userName:['']
   
});



}
onAddUser(){
  
  this.userList.push(this.userForm.value.userName);
  this.userForm.value.userName='';
}
onDeleteUser(user:string){
  //this.userList.splice(this.userList.indexOf(this.userListForm.value.userName), 1);
  this.userList = this.userList.filter(item => item !== user);
  
}
onSubmit() {
  this.createForm.value.userList=this.userList;
        this.apiService.createGroup(this.createForm.value)
            .subscribe(data => {
              
                alert("Successfully created group");
                this.router.dispose();
                this.router.navigate(['login']);
            },

                error => {
                  alert("Un Successfully created group");
                    this.router.dispose();
                    this.router.navigate(['login']);
                    return;
                }

            );

  
}
onCancel() {
    this.router.dispose();
    this.router.navigate(['login']);
}

}
