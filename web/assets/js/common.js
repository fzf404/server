/*
 * @Author: fzf404
 * @Date: 2021-11-16 23:19:30
 * @LastEditTime: 2021-11-25 16:50:58
 * @Description: 通用代码
 */

// 警告
console.log(
  `%c                                                  
                                                  
                                                  
                 %c FBI WARNING %c                    
                                                  
                                                  
%c     请遵守《中华人民共和国网络安全法》相关法律法规       
                                                  
            不要试图更改、破坏计算机系统               
                                                  
          违者移交司法机关, 追究其法律责任             
                                                  
                                                  
                                                  
`,
  "background: #000; font-size: 18px; font-family: monospace",
  "background: #f33; font-size: 18px; font-family: monospace; color: #eee; text-shadow:0 0 1px #fff",
  "background: #000; font-size: 18px; font-family: monospace",
  "background: #000; font-size: 18px; font-family: monospace; color: #ddd; text-shadow:0 0 2px #fff"
);

// const base_url = `http://${document.domain}:8080`;
const base_url = `http://42.193.122.21:8080`;
const admin_contact = "「QQ: 441535134」";

const handle_code = (json) => {
  switch (json.code) {
    case 200:
      $(".loading").hide();
      $(".load").show();
      return true;
    case 409:
      alert(json.msg)
      return false;
    default:
      window.location.href = `error.html?code=${json.code}&msg=${json.msg}&href=${window.location.href}`;
      return false;
  }
};

const handle_fail = () => {
  window.location.href = `error.html?code=500&msg=服务器请求失败，请联系开发者!${admin_contact}`;
};
