import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { Utils } from 'src/app/core/util.methods';
import { AppMessageQueuService } from 'src/app/core/appmsgque.service';

@Component({
  selector: 'app-settlement',
  templateUrl: './settlement.component.html',
  styleUrls: ['./settlement.component.css']
})
export class SettlementComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, private utils: Utils,private appMsgService: AppMessageQueuService ) {
    this.createForm = null;

}

createForm: FormGroup;
userList: Array<any>;

ngOnInit() {
   
     this.userList=this.appMsgService.retrieveUserIds();
   
    this.createForm = this.formBuilder.group({

       
        groupId: [this.appMsgService.retriveGLoginName(), Validators.required],
        
        userId: [this.userList[0], Validators.required],
        
        cause: ['Settlement'],
        date: [''],
        expence: ['']
        
    });



}

onSubmit() {
    
    
        this.apiService.createTrx(this.createForm.value)
            .subscribe(data => {
                this.router.dispose();
                this.router.navigate(['home/group']);
            },

                error => {
                   
                    this.router.dispose();
                    this.router.navigate(['login']);
                    return;
                }

            );

    
}
onCancel() {
    this.router.dispose();
    this.router.navigate(['home/group']);
}

}