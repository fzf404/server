import{c as d,a as _,r as h,w as E,b as v,d as g,u as b,o as y,e as L}from"./vendor.7184aeb7.js";const x=function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}};x();const I="modulepreload",m={},O="/",n=function(a,s){return!s||s.length===0?a():Promise.all(s.map(o=>{if(o=`${O}${o}`,o in m)return;m[o]=!0;const e=o.endsWith(".css"),t=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${t}`))return;const r=document.createElement("link");if(r.rel=e?"stylesheet":I,e||(r.as="script",r.crossOrigin=""),r.href=o,document.head.appendChild(r),e)return new Promise((u,p)=>{r.addEventListener("load",u),r.addEventListener("error",p)})})).then(()=>a())},P=[{path:"/",name:"index",component:()=>n(()=>import("./index.ced405fc.js"),["assets/index.ced405fc.js","assets/vendor.7184aeb7.js"]),meta:{title:"fzf404 | \u670D\u52A1"}},{path:"/auto-temp",name:"auto-temp",component:()=>n(()=>import("./auto-temp.f98d3abd.js"),["assets/auto-temp.f98d3abd.js","assets/vendor.7184aeb7.js","assets/request.8cbe8758.js"]),meta:{title:"fzf404 | \u4F53\u6E29\u81EA\u52A8\u586B\u62A5"}},{path:"/stop-temp",name:"stop-temp",component:()=>n(()=>import("./stop-temp.ab7a0f7a.js"),["assets/stop-temp.ab7a0f7a.js","assets/vendor.7184aeb7.js","assets/request.8cbe8758.js"]),meta:{title:"fzf404 | \u505C\u6B62\u81EA\u52A8\u586B\u62A5"}},{path:"/exam-info",name:"exam-info",component:()=>n(()=>import("./exam-info.7c717ae1.js"),["assets/exam-info.7c717ae1.js","assets/vendor.7184aeb7.js","assets/request.8cbe8758.js"]),meta:{title:"fzf404 | \u8003\u8BD5\u67E5\u8BE2"}},{path:"/chat",name:"chat",component:()=>n(()=>import("./chat.39ba154b.js"),["assets/chat.39ba154b.js","assets/vendor.7184aeb7.js"]),meta:{title:"fzf404 | \u804A\u5929\u5BA4"}},{path:"/reward",name:"reward",component:()=>n(()=>import("./reward.0055d928.js"),["assets/reward.0055d928.js","assets/vendor.7184aeb7.js","assets/plugin-vue_export-helper.21dcd24c.js"]),meta:{title:"fzf404 | \u6253\u8D4F"}},{path:"/feed",name:"feed",component:()=>n(()=>import("./feed.de7206b0.js"),["assets/feed.de7206b0.js","assets/vendor.7184aeb7.js","assets/plugin-vue_export-helper.21dcd24c.js"]),meta:{title:"fzf404 | \u53CD\u9988"}},{path:"/success:data",name:"success",component:()=>n(()=>import("./success.a913a46b.js"),["assets/success.a913a46b.js","assets/vendor.7184aeb7.js"]),meta:{title:"fzf404 | \u6210\u529F"}},{path:"/error",name:"error",component:()=>n(()=>import("./error.097e020b.js"),["assets/error.097e020b.js","assets/vendor.7184aeb7.js"]),meta:{title:"fzf404 | \u51FA\u9519\u4E86"}},{path:"/404",name:"404",component:()=>n(()=>import("./404.3ee7e61b.js"),["assets/404.3ee7e61b.js","assets/vendor.7184aeb7.js","assets/plugin-vue_export-helper.21dcd24c.js"]),meta:{title:"fzf404 | 404"}},{path:"/:pathMatch(.*)*",redirect:"404"}],f=d({history:_(),routes:P});f.beforeEach((c,a)=>{c.meta.title&&(document.title=c.meta.title)});const l=localStorage.getItem("theme"),i=h(l||"dark");E(()=>{document.documentElement.setAttribute("class",i.value),localStorage.setItem("theme",i.value)});const k=()=>{switch(i.value){case"dark":i.value="light";break;case"light":i.value="dark";break}};console.log(`%c                                                  
                                                  
                                                  
                 %c FBI WARNING %c                    
                                                  
%c     \u8BF7\u9075\u5B88\u300A\u4E2D\u534E\u4EBA\u6C11\u5171\u548C\u56FD\u7F51\u7EDC\u5B89\u5168\u6CD5\u300B\u76F8\u5173\u6CD5\u5F8B\u6CD5\u89C4       
                                                  
            \u4E0D\u8981\u8BD5\u56FE\u66F4\u6539\u3001\u7834\u574F\u8BA1\u7B97\u673A\u7CFB\u7EDF               
                                                  
          \u8FDD\u8005\u79FB\u4EA4\u53F8\u6CD5\u673A\u5173, \u8FFD\u7A76\u5176\u6CD5\u5F8B\u8D23\u4EFB             
                                                  
                                                  
                                                  `,"background: #000; font-size: 18px; font-family: monospace","background: #f33; font-size: 18px; font-family: monospace; color: #eee; text-shadow:0 0 1px #fff","background: #000; font-size: 18px; font-family: monospace","background: #000; font-size: 18px; font-family: monospace; color: #ddd; text-shadow:0 0 2px #fff");const z={setup(c){return(a,s)=>{const o=v("router-view");return y(),g(o,{onChangeTheme:b(k)},null,8,["onChangeTheme"])}}};L(z).use(f).mount("#app");export{f as r};