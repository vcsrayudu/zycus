import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Group } from '../model/group.model';

import { Observable } from 'rxjs/index';
import { LoginResponse } from '../model/login.response';

import { Transaction } from '../model/transaction.model';

@Injectable()
export class ApiService {
    constructor(private http: HttpClient) { }
    baseUrl = 'http://localhost:9081';
    trxUrl = 'http://localhost:9082';
    loginUser = '';
    tenantName = '';
    refreshToken(token): Observable<LoginResponse> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');



        return this.http.post<LoginResponse>(this.baseUrl + '/oauth/token?grant_type=refresh_token&refresh_token=' + token , { headers });
    }
    getLoginUserName() {
        return this.loginUser;
    }
    login(loginPayload): Observable<LoginResponse> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        this.loginUser = loginPayload.username;
        
        return this.http.post<LoginResponse>(this.baseUrl + '/oauth/token?grant_type=password&username=' + loginPayload.username + '&password=' + loginPayload.password,{headers} );
    }

    getGroup(): Observable<Group> {
        return this.http.get<Group>(this.baseUrl + '/group');
    }

    getGroupByLoginName(userId: string): Observable<Group> {
        return this.http.get<Group>(this.baseUrl + '/group/' + userId);
    }

    createGroup(group: Group): Observable<Group> {
        return this.http.post<Group>(this.baseUrl + '/group/register', group);
    }

    updateGroup(group: Group,groupId: string): Observable<Group> {
        return this.http.put<Group>(this.baseUrl + '/group/' + groupId, group);
    }

    deleteUser(groupid: string): Observable<Group> {
        return this.http.delete<Group>(this.baseUrl + '/group/' + groupid);
    }


    createTrx(trx: Transaction): Observable<Transaction> {
        return this.http.post<Transaction>(this.trxUrl + '/transaction', trx);
    }
    deleteTrx(trxId: string): Observable<Group> {
        return this.http.delete<Group>(this.trxUrl + '/transaction/' + trxId);
    }
  

}
