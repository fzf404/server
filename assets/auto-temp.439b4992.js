import{r as p,k as _,f as c,g as e,t as m,l as a,v as u,u as o,h as f,i as h,F as v,d as b,o as g,j as V}from"./vendor.25cd031f.js";import{r as k}from"./request.b37e4164.js";import"./index.6e7ae6ab.js";const x=e("h1",null,"\u6B22\u8FCE\u5440 \u{1F64C}",-1),y=e("span",null,"\u4F53\u6E29\u81EA\u52A8\u586B\u62A5 \u{1F321}",-1),S=e("p",null,"\u{1F36D} \u6BCF\u65E5\u586B\u62A5\u4E09\u6B21 \u{1F36D}",-1),w=e("label",null,"\u5B66\u53F7",-1),N=e("br",null,null,-1),j=e("label",null,"\u5BC6\u7801",-1),z=e("br",null,null,-1),U=e("label",null,"\u59D3\u540D",-1),B=e("br",null,null,-1),C=e("label",null,"\u90AE\u7BB1",-1),q={class:"center"},D=e("a",null,null,-1),F=V("\u8FD4\u56DE"),M={setup(I){const r=localStorage.getItem("info"),n=p(!1),l=_(r?JSON.parse(r):{}),i=()=>{if(n.value){alert("\u63D0\u4EA4\u4E2D...\u8BF7\u8010\u5FC3\u7B49\u5F85...");return}n.value=!0,localStorage.setItem("info",JSON.stringify(l)),k("/auto-temp/new",{method:"post",data:l}).then(()=>{n.value=!1})};return(J,t)=>{const d=b("router-link");return g(),c(v,null,[x,e("h2",null,[e("span",null,"\u300E"+m(n.value?"\u63D0\u4EA4\u4E2D...":"\u6C88\u9633\u7406\u5DE5\u5927\u5B66")+"\u300F",1),y]),S,e("div",null,[w,a(e("input",{"onUpdate:modelValue":t[0]||(t[0]=s=>o(l).student_id=s),placeholder:"\u4F60\u7684\u5B66\u53F7",autofocus:""},null,512),[[u,o(l).student_id,void 0,{lazy:!0}]]),N,j,a(e("input",{"onUpdate:modelValue":t[1]||(t[1]=s=>o(l).password=s),placeholder:"\u8EAB\u4EFD\u8BC1\u540E\u516D\u4F4D"},null,512),[[u,o(l).password,void 0,{lazy:!0}]]),z,U,a(e("input",{"onUpdate:modelValue":t[2]||(t[2]=s=>o(l).user_name=s),placeholder:"\u5982\u4F55\u79F0\u547C"},null,512),[[u,o(l).user_name,void 0,{lazy:!0}]]),B,C,a(e("input",{"onUpdate:modelValue":t[3]||(t[3]=s=>o(l).email=s),placeholder:"\u63A5\u53D7\u6D88\u606F\u7684\u90AE\u7BB1"},null,512),[[u,o(l).email,void 0,{lazy:!0}]])]),e("p",q,[e("a",{class:"purple",onClick:i},"\u63D0\u4EA4 "),D,f(d,{class:"fr",to:"/"},{default:h(()=>[F]),_:1})])],64)}}};export{M as default};
