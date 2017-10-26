import {Routes, RouterModule} from '@angular/router';
import {RoomComponent} from './room/room.component';
import {UserComponent} from "./user/user.component";

const MAIN_MENU_ROUTES: Routes = [
  {path: '', redirectTo: '/user', pathMatch: 'full'},
  {path: 'user', component: UserComponent},
  {path: 'room', component: RoomComponent}
];
export const CONST_ROUTING = RouterModule.forRoot(MAIN_MENU_ROUTES);
