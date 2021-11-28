/*
 * @Author: fzf404
 * @Date: 2021-11-16 23:18:11
 * @LastEditTime: 2021-11-28 15:58:09
 * @Description: 体温自动填报
 */

// 从浏览器中读取信息
let data = window.localStorage.getItem("info");

if (data != null) {
  // 解析为object
  data = JSON.parse(data);
  // 设置储存的输入信息
  $('form [name="student_id"]').val(data.student_id);
}

function submit() {
  $("#intro").text("查询中...");

  data = {
    student_id: $('form [name="student_id"]').val(),
  };

  $.get(`${base_url}/exam-info/search`, data, (json) => {
    // 代码处理
    if (handle_code(json)) {
      // 成功处理
      $("#intro").text("考试查询🔍");
      // 增加信息
      json.data.map((item) => {
        $("table").append(`
        <tr class="${item[4] == 0 ? "" : "notice"}">
          <td>${item[3]}</td>
          <td>${item[2]}</td>
          <td>${item[1]}</td>
        </tr>
      `);
      });
    }
  }).fail(() => handle_fail());
}

$("#submit").click(submit);
$('form [name="student_id"]').keydown((e) =>
  e.keyCode == 13 ? submit() : null
);
