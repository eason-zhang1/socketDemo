import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {ChatService} from "../../services/chat.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css', './../../libs/loading.css']
})
export class RoomComponent implements OnInit, OnDestroy {

  params = {};
  responseList = [];
  wsClient: any;
  isConnected = false;
  user_msg = "";
  currentUser ;

  constructor(private _router: Router, private _chatService: ChatService) {
    console.log("room constructor...");
    const curUrl = this._router.url;
    this.params = this._router.parseUrl(curUrl).queryParams;
    if (!this.params["name"]) {
      console.log("no param");
      this._router.navigate(['/user']);
      return;
    }

    if (!this.params["photo"]) {
      // this.params["photo"] = "http://imgsrc.baidu.com/imgad/pic/item/0b7b02087bf40ad14ea61c105d2c11dfa8ecce87.jpg";
    }
    this.currentUser = this.params["name"];

    this.initSocket();
  }

  initSocket() {
    // 创建SockJS对象并且制定节点
    const socket = new SockJS("http://localhost:23456/endpointChat");
    // STOMP协议的WebSocket客户端
    this.wsClient = Stomp.over(socket);
    const $this = this;
    $this.wsClient.connect({}, function (frame) { // 连接WebSocket服务端
      console.log('Connected：' + frame);
      $this.isConnected = true;
      // 发送进入房间消息
      $this.sendMsg($this.params["name"] + "进入房间,欢迎~", true);
      // 订阅“/group/getResponse”目标发送的消息，和WsController类里say方法上的@SendTo注解对应
      $this.wsClient.subscribe("/group/response/broadcast", function (response) {
        $this.responseList.push(JSON.parse(response.body));
      });
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log("destroy...");
    if (this.wsClient != null) {
      this.wsClient.disconnect();
    }
  }

  sendMsg(msg, type) {
    console.log("message: " + msg);
    if (!this.isConnected) {
      alert("连接正在建立ing... 请稍后重试");
      return;
    }
    if (!msg || !msg.trim()) {
      console.log("empty message...");
      return;
    }
    if (msg.length > 50) {
      alert("消息过长，请分段发送");
      return;
    }
    this.user_msg = "";

    this.wsClient.send("/chat", {}, JSON.stringify({
      name: this.params["name"],
      photo: this.params["photo"],
      message: msg,
      type: type ? 0 : 1
    }));
  }

}
