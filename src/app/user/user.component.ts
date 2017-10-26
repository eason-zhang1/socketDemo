import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user = {name: "", photo: ""};
  active = true;

  constructor(private _router: Router) {
  }

  ngOnInit() {
  }

  joinRoom() {
    console.log("user name:" + this.user.name);
    if (!this.active) {
      return;
    }
    if (!this.user.name) {
      alert("请输入用户名");
      return;
    }

    this.active = false;
    console.log("进入房间...");
    this._router.navigate(['/room'], {queryParams: this.user});
  }

}
