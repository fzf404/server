import{e as r,c as u,a as e,g as i,v as c,i as d,F as p,o as _}from"./index.2de65fae.js";import{r as m}from"./request.58db6574.js";const f=e("h1",null,"\u6B22\u8FCE\u5440 \u{1F64C}",-1),h=e("h2",null,[e("span",null,"\u300E\u6C88\u9633\u7406\u5DE5\u5927\u5B66\u300F"),e("span",null,"\u8003\u8BD5\u67E5\u8BE2\u{1F50D}")],-1),v=e("p",{class:"notice"},"\u7EA2\u8272\u4E3A\u91CD\u4FEE, \u4EC5\u4F9B\u53C2\u8003",-1),k=e("label",null,"\u5B66\u53F7",-1),g=["onKeypress"],x={class:"center"},b=e("a",null,null,-1),S={__name:"exam-info",setup(y){const n=localStorage.getItem("info"),t=r(n?JSON.parse(n).student_id:""),o=()=>{m("/exam-info/search",{params:{student_id:t.value}})};return(l,s)=>(_(),u(p,null,[f,h,v,e("div",null,[k,i(e("input",{"onUpdate:modelValue":s[0]||(s[0]=a=>t.value=a),onKeypress:d(o,["enter"]),placeholder:"\u4F60\u7684\u5B66\u53F7",autofocus:""},null,40,g),[[c,t.value]])]),e("p",x,[e("a",{class:"purple",onClick:o},"\u67E5\u8BE2 "),b,e("a",{class:"fr",onClick:s[1]||(s[1]=a=>l.$router.back())},"\u8FD4\u56DE")])],64))}};export{S as default};