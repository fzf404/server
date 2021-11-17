/*
 * @Author: fzf404
 * @Date: 2021-11-16 23:19:30
 * @LastEditTime: 2021-11-17 11:06:31
 * @Description: 通用代码
 */

const base_url = `http://${document.domain}:8080`
const admin_contact = '「QQ: 441535134」'

const handle_code = (json) => {
  if (json.code != 200) {
    window.location.href = `error.html?code=${json.code}&msg=${json.msg}&href=${window.location.href}`
  } else {
    alert("提交成功~请注意查收邮件!")
  }
}

const handle_fail = () => {
  window.location.href = `error.html?code=500&msg=服务器请求失败，请联系开发者!${admin_contact}`
}