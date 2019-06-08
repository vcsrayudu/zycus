import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../core/api.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { AppMessageQueuService } from '../core/appmsgque.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
    public loading = false;
    public primaryColour = '#dd0031';
    public secondaryColour = '#006ddd';
    public config = { animationType: ngxLoadingAnimationTypes.none, primaryColour: this.primaryColour, secondaryColour: this.secondaryColour, tertiaryColour: this.primaryColour, backdropBorderRadius: '3px' };
    loginForm: FormGroup;
   
    invalidLogin = false;
    constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService,private appMsgService: AppMessageQueuService) { }

    onSubmit() {
        if (this.loginForm.invalid) {
            return;
        }
        const loginPayload = {
            grant_type: 'password',
           
            username: this.loginForm.controls.username.value,
            password: this.loginForm.controls.password.value
        };
        this.loading = true;
       
        this.apiService.login(loginPayload).subscribe(data => {
           
            if (data.access_token) {
                this.loading = false;
                
                window.localStorage.setItem('token', data.access_token);
                window.localStorage.setItem('expires_in', '' + data.expires_in);
                window.localStorage.setItem('date', '' + Date.now());
               // window.localStorage.setItem('loginUser', this.apiService.loginUser);
                this.appMsgService.saveGLoginName(this.apiService.loginUser);
                this.router.navigate(['home/group']);
            } else {
                this.invalidLogin = true;
                this.loading = false;
                alert(data);
            }
        },
            error => {
                this.loading = false;
                this.invalidLogin = true;

            }
        );
    }

    ngOnInit() {
       
        this.loading = false;
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('expires_in');
        window.localStorage.removeItem('date');
        window.localStorage.removeItem('loginUser');
        
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.compose([Validators.required])],
            password: ['', Validators.required]
           
        });
    }



}
