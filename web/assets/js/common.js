/*
 * @Author: fzf404
 * @Date: 2021-11-16 23:19:30
 * @LastEditTime: 2021-11-25 16:50:58
 * @Description: 通用代码
 */

// const base_url = `http://${document.domain}:8080`;
const base_url = `http://42.193.122.21:8080`;
const admin_contact = "「QQ: 441535134」";

const handle_code = (json) => {
  switch (json.code) {
    case 200:
      $(".loading").hide();
      $(".load").show();
      return true;
    default:
      window.location.href = `error.html?code=${json.code}&msg=${json.msg}&href=${window.location.href}`;
      return false;
  }
};

const handle_fail = () => {
  window.location.href = `error.html?code=500&msg=服务器请求失败，请联系开发者!${admin_contact}`;
};
