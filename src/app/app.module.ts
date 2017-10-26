import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {CONST_ROUTING} from './app.routing';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RoomComponent } from './room/room.component';
import {ChatService} from './../services/chat.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RoomComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CONST_ROUTING
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
