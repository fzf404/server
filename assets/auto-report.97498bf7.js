import{e as d,f as p,c as _,a as e,t as c,g as s,v as a,d as m,w as f,F as h,r as v,o as b,b as g}from"./index.c3d9ae3a.js";import{r as V}from"./request.f96ac14b.js";const w=e("h1",null,"\u6B22\u8FCE\u5440 \u{1F64C}",-1),y=e("span",null,"\u5065\u5EB7\u60C5\u51B5\u81EA\u52A8\u586B\u62A5 \u{1F321}",-1),S=e("p",null,"\u{1F36D} \u5DF2\u9488\u5BF9\u9A8C\u8BC1\u7801\u8FDB\u884C\u66F4\u65B0\uFF0C\u5E76\u4FEE\u590D\u4E86\u4E00\u4E9Bbug \u{1F36D}",-1),k=e("label",null,"\u5B66\u53F7",-1),x=e("br",null,null,-1),N=e("label",null,"\u5BC6\u7801",-1),z=e("br",null,null,-1),U=e("label",null,"\u59D3\u540D",-1),B=e("br",null,null,-1),C=e("label",null,"\u90AE\u7BB1",-1),D={class:"center"},F=e("a",null,null,-1),q={__name:"auto-report",setup(I){const u=localStorage.getItem("info"),n=d(!1),l=p(u?JSON.parse(u):{}),r=()=>{if(n.value){alert("\u63D0\u4EA4\u4E2D...\u8BF7\u8010\u5FC3\u7B49\u5F85...");return}n.value=!0,localStorage.setItem("info",JSON.stringify(l)),V("/auto-report/new",{method:"post",data:l}).then(()=>{n.value=!1})};return(J,t)=>{const i=v("router-link");return b(),_(h,null,[w,e("h2",null,[e("span",null,"\u300E"+c(n.value?"\u63D0\u4EA4\u4E2D...":"\u6C88\u9633\u7406\u5DE5\u5927\u5B66")+"\u300F",1),y]),S,e("div",null,[k,s(e("input",{"onUpdate:modelValue":t[0]||(t[0]=o=>l.student_id=o),placeholder:"\u4F60\u7684\u5B66\u53F7",autofocus:""},null,512),[[a,l.student_id,void 0,{lazy:!0}]]),x,N,s(e("input",{"onUpdate:modelValue":t[1]||(t[1]=o=>l.password=o),placeholder:"\u8EAB\u4EFD\u8BC1\u540E\u516D\u4F4D"},null,512),[[a,l.password,void 0,{lazy:!0}]]),z,U,s(e("input",{"onUpdate:modelValue":t[2]||(t[2]=o=>l.user_name=o),placeholder:"\u5982\u4F55\u79F0\u547C"},null,512),[[a,l.user_name,void 0,{lazy:!0}]]),B,C,s(e("input",{"onUpdate:modelValue":t[3]||(t[3]=o=>l.email=o),placeholder:"\u63A5\u53D7\u6D88\u606F\u7684\u90AE\u7BB1"},null,512),[[a,l.email,void 0,{lazy:!0}]])]),e("p",D,[e("a",{class:"purple",onClick:r},"\u63D0\u4EA4 "),F,m(i,{class:"fr",to:"/"},{default:f(()=>[g("\u8FD4\u56DE")]),_:1})])],64)}}};export{q as default};
