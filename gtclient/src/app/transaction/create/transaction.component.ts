import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { Utils } from '../../core/util.methods';
import { AppMessageQueuService } from '../../core/appmsgque.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})

export class TransactionComponent implements OnInit {
 // providers : [AppMessageQueuService]
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
        
        cause: [''],
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
