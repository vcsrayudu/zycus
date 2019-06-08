import { Component, OnInit } from '@angular/core';
import { Group } from '../model/group.model';
import { Router } from '@angular/router';
import { ApiService } from '../core/api.service';
import { AppMessageQueuService } from '../core/appmsgque.service';
import { Transaction } from '../model/transaction.model';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  group: Group;
 
  public loading = false;
  headExpence: number;
  userExpence = new Map<string, number>(); 
  constructor(private router: Router, private apiService: ApiService, private appMsgService: AppMessageQueuService ) {   }
    ngOnInit() {
      
      this.loading = true;
      //let user=window.localStorage.getItem('loginUser');
      let user=this.appMsgService.retriveGLoginName();
      this.apiService.getGroupByLoginName(user).subscribe(data => {
        
          this.group = data;
          
          this.appMsgService.saveuserIds(this.group.userList);
          this.calculateActualExpence();
         
         // window.localStorage.setItem('userList', this.group.userList);
          this.loading = false;
       },
          (err: any) => {
              this.loading = false;
              this.router.navigate(['login']);
          }
      );
     }
     createTransaction(): void {
   
      this.router.navigate(['home/transaction']);
  }
  settlementTrx():void{
    this.router.navigate(['home/settlement']);
  }
  editTrx():void{
    this.router.navigate(['home/edit-trx']);
  }
  deleteTrx(trx: Transaction): void {
    
   this.apiService.deleteTrx(trx.transId)
       .subscribe(data => {
        this.group.transactions = this.group.transactions.filter(u => u !== trx);
        this.calculateActualExpence();
       });
      
      
}
 
editGroup(): void {
    
  this.router.navigate(['home/edit-group']);
     
     
}
  calculateActualExpence(): any
  {
    let trxList=this.group.transactions;
    let actualExpence=0;
    for(let i in trxList)
    {
       let trx: Transaction=trxList[i]
       if(!(trx.cause=="settlement" || trx.cause=="Settlement" || trx.cause=="SETTLEMENT"))
    actualExpence =actualExpence+trx.expence;

    }
    this.group.actualExpence=actualExpence;
    this.headExpence=actualExpence/this.group.userList.length;

    for(let j in this.group.userList)
    {
      let user=this.group.userList[j];
      let expence=0;
       for(let i in trxList)
       {
        let trx: Transaction=trxList[i]
        
         if(user==trx.userId)
         expence=expence+trx.expence;
       }
       this.userExpence.set(user,expence);
      
    

    }

  }

}
