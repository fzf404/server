/*
 * @Author: fzf404
 * @Date: 2021-11-16 23:18:11
 * @LastEditTime: 2021-11-27 20:47:51
 * @Description: 体温自动填报
 */

// 从浏览器中读取信息
let data = window.localStorage.getItem("info");

if (data != null) {
  // 解析为object
  data = JSON.parse(data);
  // 设置储存的输入信息
  $('form [name="message"]').val(data.user_name);
}

const ws = new WebSocket("ws://127.0.0.1:8080/chat/connect");

ws.onmessage = (msg) => {
  $("#message").append(`<span>${msg.data}</span><br/>`);
};

$("#submit").click(function () {
  ws.send($('form [name="message"]').val());
  $('form [name="message"]').val("")
});
