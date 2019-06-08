import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../core/api.service';
import { Group } from '../model/group.model';
import { AppMessageQueuService } from '../core/appmsgque.service';

@Component({
    selector: 'app-home-layout',
    templateUrl: './home-layout.component.html',
    styles: []
})
export class HomeLayoutComponent implements OnInit {
  group: Group;
  public loading = false;
 // providers : [AppMessageQueuService]
  constructor(private router: Router, private apiService: ApiService, private appMsgService: AppMessageQueuService ) {   }
    ngOnInit() {
    }

 }