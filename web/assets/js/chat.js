/*
 * @Author: fzf404
 * @Date: 2021-11-16 23:18:11
 * @LastEditTime: 2021-11-27 20:47:51
 * @Description: 聊天室
 */

// 从浏览器中读取信息
const user_name = prompt("请设置用户名", "匿名");

let socket = io(`${base_url}`);

// 连接成功
socket.on("connect", () => {
  socket.send({ user_name: user_name, message: "已加入" });
});

socket.on("number", (number) => {
  $("#number").text(number);
});

// 接受数据处理
socket.on("message", (data) => {
  $("#message").append(`
      <span class="notice">${data.user_name.replace(/</g, "&lt;", />/g, "&gt;")}:</span>
      <span class="second">${data.message.replace(/</g, "&lt;", />/g, "&gt;")}</span>
      <br />
  `);
});

// 发送
function send() {
  socket.send({
    user_name: user_name,
    message: $('form [name="message"]').val(),
  });
  // 清空输入框
  $('form [name="message"]').val("");
}

// 监听触发请求
$("#submit").click(send);
$('form [name="message"]').keydown((e) => (e.keyCode == 13 ? send() : null));

$("#cancel").click(() => {
  socket.send({ user_name: user_name, message: "已登出" });
  window.location.href = "index.html";
});
