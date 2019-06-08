import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { AppMessageQueuService } from 'src/app/core/appmsgque.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
    `.angular-logo {
        margin: 0 4px 3px 0;
        height: 35px;
        vertical-align: middle;
    }
    .fill-remaining-space {
      flex: 1 1 auto;
    }
    `
  ]
})
export class HeaderComponent implements OnInit {
loginUser: string ;
constructor(private router: Router, private apiService: ApiService,private appMsgService: AppMessageQueuService  ) {   }
ngOnInit() {
    //this.loginUser =  window.localStorage.getItem('loginUser');
    this.loginUser =this.appMsgService.retriveGLoginName();
}
  
  onLogout() {
       
        this.router.dispose();
        this.router.navigate(['login']);
  //  this.authService.logout();
  }
}