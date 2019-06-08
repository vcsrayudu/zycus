import { Injectable } from '@angular/core';

@Injectable()
export class AppMessageQueuService {

    userList: Array<String>=[];
    groupLoginName: string;
    constructor() {

    }
    saveuserIds(userList:any){
        this.userList = userList;
    }
    retrieveUserIds(){
        return this.userList;
    }
    saveGLoginName(name:string)
    {
        this.groupLoginName=name;
    }
    retriveGLoginName()
    {
        return this.groupLoginName;
    }

}