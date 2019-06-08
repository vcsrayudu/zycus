import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../core/api.service';
import { Utils } from '../core/util.methods';
import { AppMessageQueuService } from '../core/appmsgque.service';
import { Group } from '../model/group.model';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService,private utils: Utils,private appMsgService: AppMessageQueuService) {
    

}
public loading = false;
 
  userForm:FormGroup;
  userListForm:FormGroup;
  userList = [];
   group: Group;
   
  ngOnInit() {
    let groupId=this.appMsgService.retriveGLoginName();
    const validateLogin: boolean = this.utils.validateToken(this.router);
    if (validateLogin) {
      this.loading = true;
      this.apiService.getGroupByLoginName(groupId).subscribe(data => {
          
          this.group = data;
          this.loading = false;
          this.userList=this.group.userList;
         
          this.editForm = this.formBuilder.group({
         
            groupId: [this.group.groupId, Validators.required],
            groupName: [this.group.groupName, Validators.required],
            groupLoginName: [this.group.groupLoginName, Validators.required],
            password: [this.group.password, Validators.required],
          
            userList: [this.group.userList],
            groupDescription: [this.group.groupDescription],
            expectedExpence: [this.group.expectedExpence]
           
        });
    
        this.userForm = this.formBuilder.group({
          userName:[''],
          userList:['']
         
      });
      this.userListForm = this.formBuilder.group({
        userName:[''],
        userList:['']
       
    });
    
      },
      (err: any) => {
        this.loading = false;
        this.router.navigate(['home/group']);
    }

      );
    
  
      
      
}
  
  }
  onAddUser(){
    
    this.userList.push(this.userForm.value.userName);
    this.userForm.value.userName='';
  }
  onDeleteUser(user:string){
    
    this.userList = this.userList.filter(item => item !== user);
    
  }
  onSubmit() {
    this.editForm.value.userList=this.userList;
          this.apiService.updateGroup(this.editForm.value, this.group.groupId)
              .subscribe(data => {
                debugger;
                  alert("Successfully updated group");
                  this.router.dispose();
                  this.router.navigate(['home/group']);
              },
  
                  error => {
                    alert("Un Successfully Updated group");
                      this.router.dispose();
                      this.router.navigate(['home/group']);
                      return;
                  }
  
              );
  
    
  }
  onCancel() {
      this.router.dispose();
      this.router.navigate(['home/group']);
  }
  
  }
  