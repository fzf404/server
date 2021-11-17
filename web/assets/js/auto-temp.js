/*
 * @Author: fzf404
 * @Date: 2021-11-16 23:18:11
 * @LastEditTime: 2021-11-17 11:06:33
 * @Description: 体温自动填报
 */

// 从浏览器中读取信息
let data = window.localStorage.getItem('info');

if (data != null) {
  // 解析为object
  data = JSON.parse(data)
  // 设置储存的输入信息
  $('form [name="student_id"]').val(data.student_id)
  $('form [name="password"]').val(data.password)
  $('form [name="user_name"]').val(data.user_name)
  $('form [name="email"]').val(data.email)
}

$("#submit").click(function () {

  $('#intro').text('提交中...')

  // 转换为 object
  data = {
    student_id: $('form [name="student_id"]').val(),
    password: $('form [name="password"]').val(),
    user_name: $('form [name="user_name"]').val(),
    email: $('form [name="email"]').val(),
  }

  // 存储 object
  window.localStorage.setItem('info', JSON.stringify(data));

  $.post(`${base_url}/auto-temp/new`, data,

    function (json) {

      // 代码处理
      handle_code(json)

      $('#intro').text('提交完毕...')

    }).fail(
      () => handle_fail()
    )
});