import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class DataService {
    private _refreshRquired =new Subject<void>();
    get  $RefreshRquired(){
        return this._refreshRquired;
    }

    private _refreshContactRquired =new Subject<void>();
    get  $RefreshContactRquired(){
        return this._refreshContactRquired;
    }

}