import {Injectable, OnInit, OnDestroy} from '@angular/core';
import {Http} from "@angular/http";
import {environment} from "../environments/environment";



@Injectable()
export class ChatService implements OnInit, OnDestroy {

  wsClient: any;

  constructor(private _http: Http) {
    console.log("constructor for chat service...");
  }

  ngOnInit() {
    console.log("init for chat service...");
  }

  ngOnDestroy() {
    console.log("destroy for chat service...");
  }
  connection() {
    return this.wsClient;
  }

}
