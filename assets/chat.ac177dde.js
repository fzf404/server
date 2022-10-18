import{e as j,f as ge,c as x,a as u,t as S,u as K,F as H,j as be,g as ve,v as we,i as _e,b as ke,h as Ee,o as L}from"./index.c3d9ae3a.js";const d=Object.create(null);d.open="0";d.close="1";d.ping="2";d.pong="3";d.message="4";d.upgrade="5";d.noop="6";const T=Object.create(null);Object.keys(d).forEach(s=>{T[d[s]]=s});const Ae={type:"error",data:"parser error"},Re=typeof Blob=="function"||typeof Blob!="undefined"&&Object.prototype.toString.call(Blob)==="[object BlobConstructor]",Oe=typeof ArrayBuffer=="function",Te=s=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(s):s&&s.buffer instanceof ArrayBuffer,ee=({type:s,data:e},t,n)=>Re&&e instanceof Blob?t?n(e):z(e,n):Oe&&(e instanceof ArrayBuffer||Te(e))?t?n(e):z(new Blob([e]),n):n(d[s]+(e||"")),z=(s,e)=>{const t=new FileReader;return t.onload=function(){const n=t.result.split(",")[1];e("b"+n)},t.readAsDataURL(s)},Y="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",E=typeof Uint8Array=="undefined"?[]:new Uint8Array(256);for(let s=0;s<Y.length;s++)E[Y.charCodeAt(s)]=s;const Be=s=>{let e=s.length*.75,t=s.length,n,i=0,r,o,h,f;s[s.length-1]==="="&&(e--,s[s.length-2]==="="&&e--);const w=new ArrayBuffer(e),g=new Uint8Array(w);for(n=0;n<t;n+=4)r=E[s.charCodeAt(n)],o=E[s.charCodeAt(n+1)],h=E[s.charCodeAt(n+2)],f=E[s.charCodeAt(n+3)],g[i++]=r<<2|o>>4,g[i++]=(o&15)<<4|h>>2,g[i++]=(h&3)<<6|f&63;return w},Ce=typeof ArrayBuffer=="function",te=(s,e)=>{if(typeof s!="string")return{type:"message",data:se(s,e)};const t=s.charAt(0);return t==="b"?{type:"message",data:Ne(s.substring(1),e)}:T[t]?s.length>1?{type:T[t],data:s.substring(1)}:{type:T[t]}:Ae},Ne=(s,e)=>{if(Ce){const t=Be(s);return se(t,e)}else return{base64:!0,data:s}},se=(s,e)=>{switch(e){case"blob":return s instanceof ArrayBuffer?new Blob([s]):s;case"arraybuffer":default:return s}},ne=String.fromCharCode(30),xe=(s,e)=>{const t=s.length,n=new Array(t);let i=0;s.forEach((r,o)=>{ee(r,!1,h=>{n[o]=h,++i===t&&e(n.join(ne))})})},Se=(s,e)=>{const t=s.split(ne),n=[];for(let i=0;i<t.length;i++){const r=te(t[i],e);if(n.push(r),r.type==="error")break}return n},ie=4;function a(s){if(s)return Le(s)}function Le(s){for(var e in a.prototype)s[e]=a.prototype[e];return s}a.prototype.on=a.prototype.addEventListener=function(s,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+s]=this._callbacks["$"+s]||[]).push(e),this};a.prototype.once=function(s,e){function t(){this.off(s,t),e.apply(this,arguments)}return t.fn=e,this.on(s,t),this};a.prototype.off=a.prototype.removeListener=a.prototype.removeAllListeners=a.prototype.removeEventListener=function(s,e){if(this._callbacks=this._callbacks||{},arguments.length==0)return this._callbacks={},this;var t=this._callbacks["$"+s];if(!t)return this;if(arguments.length==1)return delete this._callbacks["$"+s],this;for(var n,i=0;i<t.length;i++)if(n=t[i],n===e||n.fn===e){t.splice(i,1);break}return t.length===0&&delete this._callbacks["$"+s],this};a.prototype.emit=function(s){this._callbacks=this._callbacks||{};for(var e=new Array(arguments.length-1),t=this._callbacks["$"+s],n=1;n<arguments.length;n++)e[n-1]=arguments[n];if(t){t=t.slice(0);for(var n=0,i=t.length;n<i;++n)t[n].apply(this,e)}return this};a.prototype.emitReserved=a.prototype.emit;a.prototype.listeners=function(s){return this._callbacks=this._callbacks||{},this._callbacks["$"+s]||[]};a.prototype.hasListeners=function(s){return!!this.listeners(s).length};const m=(()=>typeof self!="undefined"?self:typeof window!="undefined"?window:Function("return this")())();function re(s,...e){return e.reduce((t,n)=>(s.hasOwnProperty(n)&&(t[n]=s[n]),t),{})}const Pe=setTimeout,qe=clearTimeout;function N(s,e){e.useNativeTimers?(s.setTimeoutFn=Pe.bind(m),s.clearTimeoutFn=qe.bind(m)):(s.setTimeoutFn=setTimeout.bind(m),s.clearTimeoutFn=clearTimeout.bind(m))}const De=1.33;function Ie(s){return typeof s=="string"?Fe(s):Math.ceil((s.byteLength||s.size)*De)}function Fe(s){let e=0,t=0;for(let n=0,i=s.length;n<i;n++)e=s.charCodeAt(n),e<128?t+=1:e<2048?t+=2:e<55296||e>=57344?t+=3:(n++,t+=4);return t}class Ve extends Error{constructor(e,t,n){super(e),this.description=t,this.context=n,this.type="TransportError"}}class oe extends a{constructor(e){super(),this.writable=!1,N(this,e),this.opts=e,this.query=e.query,this.readyState="",this.socket=e.socket}onError(e,t,n){return super.emitReserved("error",new Ve(e,t,n)),this}open(){return(this.readyState==="closed"||this.readyState==="")&&(this.readyState="opening",this.doOpen()),this}close(){return(this.readyState==="opening"||this.readyState==="open")&&(this.doClose(),this.onClose()),this}send(e){this.readyState==="open"&&this.write(e)}onOpen(){this.readyState="open",this.writable=!0,super.emitReserved("open")}onData(e){const t=te(e,this.socket.binaryType);this.onPacket(t)}onPacket(e){super.emitReserved("packet",e)}onClose(e){this.readyState="closed",super.emitReserved("close",e)}}const ce="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),q=64,Me={};let W=0,R=0,$;function J(s){let e="";do e=ce[s%q]+e,s=Math.floor(s/q);while(s>0);return e}function ae(){const s=J(+new Date);return s!==$?(W=0,$=s):s+"."+J(W++)}for(;R<q;R++)Me[ce[R]]=R;function he(s){let e="";for(let t in s)s.hasOwnProperty(t)&&(e.length&&(e+="&"),e+=encodeURIComponent(t)+"="+encodeURIComponent(s[t]));return e}function Ue(s){let e={},t=s.split("&");for(let n=0,i=t.length;n<i;n++){let r=t[n].split("=");e[decodeURIComponent(r[0])]=decodeURIComponent(r[1])}return e}let ue=!1;try{ue=typeof XMLHttpRequest!="undefined"&&"withCredentials"in new XMLHttpRequest}catch{}const Ke=ue;function le(s){const e=s.xdomain;try{if(typeof XMLHttpRequest!="undefined"&&(!e||Ke))return new XMLHttpRequest}catch{}if(!e)try{return new m[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")}catch{}}function He(){}const ze=function(){return new le({xdomain:!1}).responseType!=null}();class Ye extends oe{constructor(e){if(super(e),this.polling=!1,typeof location!="undefined"){const n=location.protocol==="https:";let i=location.port;i||(i=n?"443":"80"),this.xd=typeof location!="undefined"&&e.hostname!==location.hostname||i!==e.port,this.xs=e.secure!==n}const t=e&&e.forceBase64;this.supportsBinary=ze&&!t}get name(){return"polling"}doOpen(){this.poll()}pause(e){this.readyState="pausing";const t=()=>{this.readyState="paused",e()};if(this.polling||!this.writable){let n=0;this.polling&&(n++,this.once("pollComplete",function(){--n||t()})),this.writable||(n++,this.once("drain",function(){--n||t()}))}else t()}poll(){this.polling=!0,this.doPoll(),this.emitReserved("poll")}onData(e){const t=n=>{if(this.readyState==="opening"&&n.type==="open"&&this.onOpen(),n.type==="close")return this.onClose({description:"transport closed by the server"}),!1;this.onPacket(n)};Se(e,this.socket.binaryType).forEach(t),this.readyState!=="closed"&&(this.polling=!1,this.emitReserved("pollComplete"),this.readyState==="open"&&this.poll())}doClose(){const e=()=>{this.write([{type:"close"}])};this.readyState==="open"?e():this.once("open",e)}write(e){this.writable=!1,xe(e,t=>{this.doWrite(t,()=>{this.writable=!0,this.emitReserved("drain")})})}uri(){let e=this.query||{};const t=this.opts.secure?"https":"http";let n="";this.opts.timestampRequests!==!1&&(e[this.opts.timestampParam]=ae()),!this.supportsBinary&&!e.sid&&(e.b64=1),this.opts.port&&(t==="https"&&Number(this.opts.port)!==443||t==="http"&&Number(this.opts.port)!==80)&&(n=":"+this.opts.port);const i=he(e),r=this.opts.hostname.indexOf(":")!==-1;return t+"://"+(r?"["+this.opts.hostname+"]":this.opts.hostname)+n+this.opts.path+(i.length?"?"+i:"")}request(e={}){return Object.assign(e,{xd:this.xd,xs:this.xs},this.opts),new p(this.uri(),e)}doWrite(e,t){const n=this.request({method:"POST",data:e});n.on("success",t),n.on("error",(i,r)=>{this.onError("xhr post error",i,r)})}doPoll(){const e=this.request();e.on("data",this.onData.bind(this)),e.on("error",(t,n)=>{this.onError("xhr poll error",t,n)}),this.pollXhr=e}}class p extends a{constructor(e,t){super(),N(this,t),this.opts=t,this.method=t.method||"GET",this.uri=e,this.async=t.async!==!1,this.data=t.data!==void 0?t.data:null,this.create()}create(){const e=re(this.opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");e.xdomain=!!this.opts.xd,e.xscheme=!!this.opts.xs;const t=this.xhr=new le(e);try{t.open(this.method,this.uri,this.async);try{if(this.opts.extraHeaders){t.setDisableHeaderCheck&&t.setDisableHeaderCheck(!0);for(let n in this.opts.extraHeaders)this.opts.extraHeaders.hasOwnProperty(n)&&t.setRequestHeader(n,this.opts.extraHeaders[n])}}catch{}if(this.method==="POST")try{t.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch{}try{t.setRequestHeader("Accept","*/*")}catch{}"withCredentials"in t&&(t.withCredentials=this.opts.withCredentials),this.opts.requestTimeout&&(t.timeout=this.opts.requestTimeout),t.onreadystatechange=()=>{t.readyState===4&&(t.status===200||t.status===1223?this.onLoad():this.setTimeoutFn(()=>{this.onError(typeof t.status=="number"?t.status:0)},0))},t.send(this.data)}catch(n){this.setTimeoutFn(()=>{this.onError(n)},0);return}typeof document!="undefined"&&(this.index=p.requestsCount++,p.requests[this.index]=this)}onError(e){this.emitReserved("error",e,this.xhr),this.cleanup(!0)}cleanup(e){if(!(typeof this.xhr=="undefined"||this.xhr===null)){if(this.xhr.onreadystatechange=He,e)try{this.xhr.abort()}catch{}typeof document!="undefined"&&delete p.requests[this.index],this.xhr=null}}onLoad(){const e=this.xhr.responseText;e!==null&&(this.emitReserved("data",e),this.emitReserved("success"),this.cleanup())}abort(){this.cleanup()}}p.requestsCount=0;p.requests={};if(typeof document!="undefined"){if(typeof attachEvent=="function")attachEvent("onunload",X);else if(typeof addEventListener=="function"){const s="onpagehide"in m?"pagehide":"unload";addEventListener(s,X,!1)}}function X(){for(let s in p.requests)p.requests.hasOwnProperty(s)&&p.requests[s].abort()}const fe=(()=>typeof Promise=="function"&&typeof Promise.resolve=="function"?e=>Promise.resolve().then(e):(e,t)=>t(e,0))(),O=m.WebSocket||m.MozWebSocket,Q=!0,We="arraybuffer",G=typeof navigator!="undefined"&&typeof navigator.product=="string"&&navigator.product.toLowerCase()==="reactnative";class $e extends oe{constructor(e){super(e),this.supportsBinary=!e.forceBase64}get name(){return"websocket"}doOpen(){if(!this.check())return;const e=this.uri(),t=this.opts.protocols,n=G?{}:re(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(n.headers=this.opts.extraHeaders);try{this.ws=Q&&!G?t?new O(e,t):new O(e):new O(e,t,n)}catch(i){return this.emitReserved("error",i)}this.ws.binaryType=this.socket.binaryType||We,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=e=>this.onClose({description:"websocket connection closed",context:e}),this.ws.onmessage=e=>this.onData(e.data),this.ws.onerror=e=>this.onError("websocket error",e)}write(e){this.writable=!1;for(let t=0;t<e.length;t++){const n=e[t],i=t===e.length-1;ee(n,this.supportsBinary,r=>{const o={};try{Q&&this.ws.send(r)}catch{}i&&fe(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){typeof this.ws!="undefined"&&(this.ws.close(),this.ws=null)}uri(){let e=this.query||{};const t=this.opts.secure?"wss":"ws";let n="";this.opts.port&&(t==="wss"&&Number(this.opts.port)!==443||t==="ws"&&Number(this.opts.port)!==80)&&(n=":"+this.opts.port),this.opts.timestampRequests&&(e[this.opts.timestampParam]=ae()),this.supportsBinary||(e.b64=1);const i=he(e),r=this.opts.hostname.indexOf(":")!==-1;return t+"://"+(r?"["+this.opts.hostname+"]":this.opts.hostname)+n+this.opts.path+(i.length?"?"+i:"")}check(){return!!O}}const Je={websocket:$e,polling:Ye},Xe=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,Qe=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function D(s){const e=s,t=s.indexOf("["),n=s.indexOf("]");t!=-1&&n!=-1&&(s=s.substring(0,t)+s.substring(t,n).replace(/:/g,";")+s.substring(n,s.length));let i=Xe.exec(s||""),r={},o=14;for(;o--;)r[Qe[o]]=i[o]||"";return t!=-1&&n!=-1&&(r.source=e,r.host=r.host.substring(1,r.host.length-1).replace(/;/g,":"),r.authority=r.authority.replace("[","").replace("]","").replace(/;/g,":"),r.ipv6uri=!0),r.pathNames=Ge(r,r.path),r.queryKey=Ze(r,r.query),r}function Ge(s,e){const t=/\/{2,9}/g,n=e.replace(t,"/").split("/");return(e.slice(0,1)=="/"||e.length===0)&&n.splice(0,1),e.slice(-1)=="/"&&n.splice(n.length-1,1),n}function Ze(s,e){const t={};return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(n,i,r){i&&(t[i]=r)}),t}class y extends a{constructor(e,t={}){super(),e&&typeof e=="object"&&(t=e,e=null),e?(e=D(e),t.hostname=e.host,t.secure=e.protocol==="https"||e.protocol==="wss",t.port=e.port,e.query&&(t.query=e.query)):t.host&&(t.hostname=D(t.host).host),N(this,t),this.secure=t.secure!=null?t.secure:typeof location!="undefined"&&location.protocol==="https:",t.hostname&&!t.port&&(t.port=this.secure?"443":"80"),this.hostname=t.hostname||(typeof location!="undefined"?location.hostname:"localhost"),this.port=t.port||(typeof location!="undefined"&&location.port?location.port:this.secure?"443":"80"),this.transports=t.transports||["polling","websocket"],this.readyState="",this.writeBuffer=[],this.prevBufferLen=0,this.opts=Object.assign({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!0},t),this.opts.path=this.opts.path.replace(/\/$/,"")+"/",typeof this.opts.query=="string"&&(this.opts.query=Ue(this.opts.query)),this.id=null,this.upgrades=null,this.pingInterval=null,this.pingTimeout=null,this.pingTimeoutTimer=null,typeof addEventListener=="function"&&(this.opts.closeOnBeforeunload&&(this.beforeunloadEventListener=()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},addEventListener("beforeunload",this.beforeunloadEventListener,!1)),this.hostname!=="localhost"&&(this.offlineEventListener=()=>{this.onClose("transport close",{description:"network connection lost"})},addEventListener("offline",this.offlineEventListener,!1))),this.open()}createTransport(e){const t=Object.assign({},this.opts.query);t.EIO=ie,t.transport=e,this.id&&(t.sid=this.id);const n=Object.assign({},this.opts.transportOptions[e],this.opts,{query:t,socket:this,hostname:this.hostname,secure:this.secure,port:this.port});return new Je[e](n)}open(){let e;if(this.opts.rememberUpgrade&&y.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1)e="websocket";else if(this.transports.length===0){this.setTimeoutFn(()=>{this.emitReserved("error","No transports available")},0);return}else e=this.transports[0];this.readyState="opening";try{e=this.createTransport(e)}catch{this.transports.shift(),this.open();return}e.open(),this.setTransport(e)}setTransport(e){this.transport&&this.transport.removeAllListeners(),this.transport=e,e.on("drain",this.onDrain.bind(this)).on("packet",this.onPacket.bind(this)).on("error",this.onError.bind(this)).on("close",t=>this.onClose("transport close",t))}probe(e){let t=this.createTransport(e),n=!1;y.priorWebsocketSuccess=!1;const i=()=>{n||(t.send([{type:"ping",data:"probe"}]),t.once("packet",b=>{if(!n)if(b.type==="pong"&&b.data==="probe"){if(this.upgrading=!0,this.emitReserved("upgrading",t),!t)return;y.priorWebsocketSuccess=t.name==="websocket",this.transport.pause(()=>{n||this.readyState!=="closed"&&(g(),this.setTransport(t),t.send([{type:"upgrade"}]),this.emitReserved("upgrade",t),t=null,this.upgrading=!1,this.flush())})}else{const _=new Error("probe error");_.transport=t.name,this.emitReserved("upgradeError",_)}}))};function r(){n||(n=!0,g(),t.close(),t=null)}const o=b=>{const _=new Error("probe error: "+b);_.transport=t.name,r(),this.emitReserved("upgradeError",_)};function h(){o("transport closed")}function f(){o("socket closed")}function w(b){t&&b.name!==t.name&&r()}const g=()=>{t.removeListener("open",i),t.removeListener("error",o),t.removeListener("close",h),this.off("close",f),this.off("upgrading",w)};t.once("open",i),t.once("error",o),t.once("close",h),this.once("close",f),this.once("upgrading",w),t.open()}onOpen(){if(this.readyState="open",y.priorWebsocketSuccess=this.transport.name==="websocket",this.emitReserved("open"),this.flush(),this.readyState==="open"&&this.opts.upgrade&&this.transport.pause){let e=0;const t=this.upgrades.length;for(;e<t;e++)this.probe(this.upgrades[e])}}onPacket(e){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")switch(this.emitReserved("packet",e),this.emitReserved("heartbeat"),e.type){case"open":this.onHandshake(JSON.parse(e.data));break;case"ping":this.resetPingTimeout(),this.sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong");break;case"error":const t=new Error("server error");t.code=e.data,this.onError(t);break;case"message":this.emitReserved("data",e.data),this.emitReserved("message",e.data);break}}onHandshake(e){this.emitReserved("handshake",e),this.id=e.sid,this.transport.query.sid=e.sid,this.upgrades=this.filterUpgrades(e.upgrades),this.pingInterval=e.pingInterval,this.pingTimeout=e.pingTimeout,this.maxPayload=e.maxPayload,this.onOpen(),this.readyState!=="closed"&&this.resetPingTimeout()}resetPingTimeout(){this.clearTimeoutFn(this.pingTimeoutTimer),this.pingTimeoutTimer=this.setTimeoutFn(()=>{this.onClose("ping timeout")},this.pingInterval+this.pingTimeout),this.opts.autoUnref&&this.pingTimeoutTimer.unref()}onDrain(){this.writeBuffer.splice(0,this.prevBufferLen),this.prevBufferLen=0,this.writeBuffer.length===0?this.emitReserved("drain"):this.flush()}flush(){if(this.readyState!=="closed"&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){const e=this.getWritablePackets();this.transport.send(e),this.prevBufferLen=e.length,this.emitReserved("flush")}}getWritablePackets(){if(!(this.maxPayload&&this.transport.name==="polling"&&this.writeBuffer.length>1))return this.writeBuffer;let t=1;for(let n=0;n<this.writeBuffer.length;n++){const i=this.writeBuffer[n].data;if(i&&(t+=Ie(i)),n>0&&t>this.maxPayload)return this.writeBuffer.slice(0,n);t+=2}return this.writeBuffer}write(e,t,n){return this.sendPacket("message",e,t,n),this}send(e,t,n){return this.sendPacket("message",e,t,n),this}sendPacket(e,t,n,i){if(typeof t=="function"&&(i=t,t=void 0),typeof n=="function"&&(i=n,n=null),this.readyState==="closing"||this.readyState==="closed")return;n=n||{},n.compress=n.compress!==!1;const r={type:e,data:t,options:n};this.emitReserved("packetCreate",r),this.writeBuffer.push(r),i&&this.once("flush",i),this.flush()}close(){const e=()=>{this.onClose("forced close"),this.transport.close()},t=()=>{this.off("upgrade",t),this.off("upgradeError",t),e()},n=()=>{this.once("upgrade",t),this.once("upgradeError",t)};return(this.readyState==="opening"||this.readyState==="open")&&(this.readyState="closing",this.writeBuffer.length?this.once("drain",()=>{this.upgrading?n():e()}):this.upgrading?n():e()),this}onError(e){y.priorWebsocketSuccess=!1,this.emitReserved("error",e),this.onClose("transport error",e)}onClose(e,t){(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")&&(this.clearTimeoutFn(this.pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),typeof removeEventListener=="function"&&(removeEventListener("beforeunload",this.beforeunloadEventListener,!1),removeEventListener("offline",this.offlineEventListener,!1)),this.readyState="closed",this.id=null,this.emitReserved("close",e,t),this.writeBuffer=[],this.prevBufferLen=0)}filterUpgrades(e){const t=[];let n=0;const i=e.length;for(;n<i;n++)~this.transports.indexOf(e[n])&&t.push(e[n]);return t}}y.protocol=ie;function je(s,e="",t){let n=s;t=t||typeof location!="undefined"&&location,s==null&&(s=t.protocol+"//"+t.host),typeof s=="string"&&(s.charAt(0)==="/"&&(s.charAt(1)==="/"?s=t.protocol+s:s=t.host+s),/^(https?|wss?):\/\//.test(s)||(typeof t!="undefined"?s=t.protocol+"//"+s:s="https://"+s),n=D(s)),n.port||(/^(http|ws)$/.test(n.protocol)?n.port="80":/^(http|ws)s$/.test(n.protocol)&&(n.port="443")),n.path=n.path||"/";const r=n.host.indexOf(":")!==-1?"["+n.host+"]":n.host;return n.id=n.protocol+"://"+r+":"+n.port+e,n.href=n.protocol+"://"+r+(t&&t.port===n.port?"":":"+n.port),n}const et=typeof ArrayBuffer=="function",tt=s=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(s):s.buffer instanceof ArrayBuffer,pe=Object.prototype.toString,st=typeof Blob=="function"||typeof Blob!="undefined"&&pe.call(Blob)==="[object BlobConstructor]",nt=typeof File=="function"||typeof File!="undefined"&&pe.call(File)==="[object FileConstructor]";function M(s){return et&&(s instanceof ArrayBuffer||tt(s))||st&&s instanceof Blob||nt&&s instanceof File}function B(s,e){if(!s||typeof s!="object")return!1;if(Array.isArray(s)){for(let t=0,n=s.length;t<n;t++)if(B(s[t]))return!0;return!1}if(M(s))return!0;if(s.toJSON&&typeof s.toJSON=="function"&&arguments.length===1)return B(s.toJSON(),!0);for(const t in s)if(Object.prototype.hasOwnProperty.call(s,t)&&B(s[t]))return!0;return!1}function it(s){const e=[],t=s.data,n=s;return n.data=I(t,e),n.attachments=e.length,{packet:n,buffers:e}}function I(s,e){if(!s)return s;if(M(s)){const t={_placeholder:!0,num:e.length};return e.push(s),t}else if(Array.isArray(s)){const t=new Array(s.length);for(let n=0;n<s.length;n++)t[n]=I(s[n],e);return t}else if(typeof s=="object"&&!(s instanceof Date)){const t={};for(const n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=I(s[n],e));return t}return s}function rt(s,e){return s.data=F(s.data,e),s.attachments=void 0,s}function F(s,e){if(!s)return s;if(s&&s._placeholder===!0){if(typeof s.num=="number"&&s.num>=0&&s.num<e.length)return e[s.num];throw new Error("illegal attachments")}else if(Array.isArray(s))for(let t=0;t<s.length;t++)s[t]=F(s[t],e);else if(typeof s=="object")for(const t in s)Object.prototype.hasOwnProperty.call(s,t)&&(s[t]=F(s[t],e));return s}const ot=5;var c;(function(s){s[s.CONNECT=0]="CONNECT",s[s.DISCONNECT=1]="DISCONNECT",s[s.EVENT=2]="EVENT",s[s.ACK=3]="ACK",s[s.CONNECT_ERROR=4]="CONNECT_ERROR",s[s.BINARY_EVENT=5]="BINARY_EVENT",s[s.BINARY_ACK=6]="BINARY_ACK"})(c||(c={}));class ct{constructor(e){this.replacer=e}encode(e){return(e.type===c.EVENT||e.type===c.ACK)&&B(e)?(e.type=e.type===c.EVENT?c.BINARY_EVENT:c.BINARY_ACK,this.encodeAsBinary(e)):[this.encodeAsString(e)]}encodeAsString(e){let t=""+e.type;return(e.type===c.BINARY_EVENT||e.type===c.BINARY_ACK)&&(t+=e.attachments+"-"),e.nsp&&e.nsp!=="/"&&(t+=e.nsp+","),e.id!=null&&(t+=e.id),e.data!=null&&(t+=JSON.stringify(e.data,this.replacer)),t}encodeAsBinary(e){const t=it(e),n=this.encodeAsString(t.packet),i=t.buffers;return i.unshift(n),i}}class U extends a{constructor(e){super(),this.reviver=e}add(e){let t;if(typeof e=="string"){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");t=this.decodeString(e),t.type===c.BINARY_EVENT||t.type===c.BINARY_ACK?(this.reconstructor=new at(t),t.attachments===0&&super.emitReserved("decoded",t)):super.emitReserved("decoded",t)}else if(M(e)||e.base64)if(this.reconstructor)t=this.reconstructor.takeBinaryData(e),t&&(this.reconstructor=null,super.emitReserved("decoded",t));else throw new Error("got binary data when not reconstructing a packet");else throw new Error("Unknown type: "+e)}decodeString(e){let t=0;const n={type:Number(e.charAt(0))};if(c[n.type]===void 0)throw new Error("unknown packet type "+n.type);if(n.type===c.BINARY_EVENT||n.type===c.BINARY_ACK){const r=t+1;for(;e.charAt(++t)!=="-"&&t!=e.length;);const o=e.substring(r,t);if(o!=Number(o)||e.charAt(t)!=="-")throw new Error("Illegal attachments");n.attachments=Number(o)}if(e.charAt(t+1)==="/"){const r=t+1;for(;++t&&!(e.charAt(t)===","||t===e.length););n.nsp=e.substring(r,t)}else n.nsp="/";const i=e.charAt(t+1);if(i!==""&&Number(i)==i){const r=t+1;for(;++t;){const o=e.charAt(t);if(o==null||Number(o)!=o){--t;break}if(t===e.length)break}n.id=Number(e.substring(r,t+1))}if(e.charAt(++t)){const r=this.tryParse(e.substr(t));if(U.isPayloadValid(n.type,r))n.data=r;else throw new Error("invalid payload")}return n}tryParse(e){try{return JSON.parse(e,this.reviver)}catch{return!1}}static isPayloadValid(e,t){switch(e){case c.CONNECT:return typeof t=="object";case c.DISCONNECT:return t===void 0;case c.CONNECT_ERROR:return typeof t=="string"||typeof t=="object";case c.EVENT:case c.BINARY_EVENT:return Array.isArray(t)&&t.length>0;case c.ACK:case c.BINARY_ACK:return Array.isArray(t)}}destroy(){this.reconstructor&&this.reconstructor.finishedReconstruction()}}class at{constructor(e){this.packet=e,this.buffers=[],this.reconPack=e}takeBinaryData(e){if(this.buffers.push(e),this.buffers.length===this.reconPack.attachments){const t=rt(this.reconPack,this.buffers);return this.finishedReconstruction(),t}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}}var ht=Object.freeze(Object.defineProperty({__proto__:null,protocol:ot,get PacketType(){return c},Encoder:ct,Decoder:U},Symbol.toStringTag,{value:"Module"}));function l(s,e,t){return s.on(e,t),function(){s.off(e,t)}}const ut=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1});class de extends a{constructor(e,t,n){super(),this.connected=!1,this.receiveBuffer=[],this.sendBuffer=[],this.ids=0,this.acks={},this.flags={},this.io=e,this.nsp=t,n&&n.auth&&(this.auth=n.auth),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;const e=this.io;this.subs=[l(e,"open",this.onopen.bind(this)),l(e,"packet",this.onpacket.bind(this)),l(e,"error",this.onerror.bind(this)),l(e,"close",this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected?this:(this.subEvents(),this.io._reconnecting||this.io.open(),this.io._readyState==="open"&&this.onopen(),this)}open(){return this.connect()}send(...e){return e.unshift("message"),this.emit.apply(this,e),this}emit(e,...t){if(ut.hasOwnProperty(e))throw new Error('"'+e.toString()+'" is a reserved event name');t.unshift(e);const n={type:c.EVENT,data:t};if(n.options={},n.options.compress=this.flags.compress!==!1,typeof t[t.length-1]=="function"){const o=this.ids++,h=t.pop();this._registerAckCallback(o,h),n.id=o}const i=this.io.engine&&this.io.engine.transport&&this.io.engine.transport.writable;return this.flags.volatile&&(!i||!this.connected)||(this.connected?(this.notifyOutgoingListeners(n),this.packet(n)):this.sendBuffer.push(n)),this.flags={},this}_registerAckCallback(e,t){const n=this.flags.timeout;if(n===void 0){this.acks[e]=t;return}const i=this.io.setTimeoutFn(()=>{delete this.acks[e];for(let r=0;r<this.sendBuffer.length;r++)this.sendBuffer[r].id===e&&this.sendBuffer.splice(r,1);t.call(this,new Error("operation has timed out"))},n);this.acks[e]=(...r)=>{this.io.clearTimeoutFn(i),t.apply(this,[null,...r])}}packet(e){e.nsp=this.nsp,this.io._packet(e)}onopen(){typeof this.auth=="function"?this.auth(e=>{this.packet({type:c.CONNECT,data:e})}):this.packet({type:c.CONNECT,data:this.auth})}onerror(e){this.connected||this.emitReserved("connect_error",e)}onclose(e,t){this.connected=!1,delete this.id,this.emitReserved("disconnect",e,t)}onpacket(e){if(e.nsp===this.nsp)switch(e.type){case c.CONNECT:if(e.data&&e.data.sid){const i=e.data.sid;this.onconnect(i)}else this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case c.EVENT:case c.BINARY_EVENT:this.onevent(e);break;case c.ACK:case c.BINARY_ACK:this.onack(e);break;case c.DISCONNECT:this.ondisconnect();break;case c.CONNECT_ERROR:this.destroy();const n=new Error(e.data.message);n.data=e.data.data,this.emitReserved("connect_error",n);break}}onevent(e){const t=e.data||[];e.id!=null&&t.push(this.ack(e.id)),this.connected?this.emitEvent(t):this.receiveBuffer.push(Object.freeze(t))}emitEvent(e){if(this._anyListeners&&this._anyListeners.length){const t=this._anyListeners.slice();for(const n of t)n.apply(this,e)}super.emit.apply(this,e)}ack(e){const t=this;let n=!1;return function(...i){n||(n=!0,t.packet({type:c.ACK,id:e,data:i}))}}onack(e){const t=this.acks[e.id];typeof t=="function"&&(t.apply(this,e.data),delete this.acks[e.id])}onconnect(e){this.id=e,this.connected=!0,this.emitBuffered(),this.emitReserved("connect")}emitBuffered(){this.receiveBuffer.forEach(e=>this.emitEvent(e)),this.receiveBuffer=[],this.sendBuffer.forEach(e=>{this.notifyOutgoingListeners(e),this.packet(e)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose("io server disconnect")}destroy(){this.subs&&(this.subs.forEach(e=>e()),this.subs=void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:c.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}close(){return this.disconnect()}compress(e){return this.flags.compress=e,this}get volatile(){return this.flags.volatile=!0,this}timeout(e){return this.flags.timeout=e,this}onAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(e),this}prependAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(e),this}offAny(e){if(!this._anyListeners)return this;if(e){const t=this._anyListeners;for(let n=0;n<t.length;n++)if(e===t[n])return t.splice(n,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(e),this}prependAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(e),this}offAnyOutgoing(e){if(!this._anyOutgoingListeners)return this;if(e){const t=this._anyOutgoingListeners;for(let n=0;n<t.length;n++)if(e===t[n])return t.splice(n,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(e){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){const t=this._anyOutgoingListeners.slice();for(const n of t)n.apply(this,e.data)}}}function v(s){s=s||{},this.ms=s.min||100,this.max=s.max||1e4,this.factor=s.factor||2,this.jitter=s.jitter>0&&s.jitter<=1?s.jitter:0,this.attempts=0}v.prototype.duration=function(){var s=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var e=Math.random(),t=Math.floor(e*this.jitter*s);s=(Math.floor(e*10)&1)==0?s-t:s+t}return Math.min(s,this.max)|0};v.prototype.reset=function(){this.attempts=0};v.prototype.setMin=function(s){this.ms=s};v.prototype.setMax=function(s){this.max=s};v.prototype.setJitter=function(s){this.jitter=s};class V extends a{constructor(e,t){var n;super(),this.nsps={},this.subs=[],e&&typeof e=="object"&&(t=e,e=void 0),t=t||{},t.path=t.path||"/socket.io",this.opts=t,N(this,t),this.reconnection(t.reconnection!==!1),this.reconnectionAttempts(t.reconnectionAttempts||1/0),this.reconnectionDelay(t.reconnectionDelay||1e3),this.reconnectionDelayMax(t.reconnectionDelayMax||5e3),this.randomizationFactor((n=t.randomizationFactor)!==null&&n!==void 0?n:.5),this.backoff=new v({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(t.timeout==null?2e4:t.timeout),this._readyState="closed",this.uri=e;const i=t.parser||ht;this.encoder=new i.Encoder,this.decoder=new i.Decoder,this._autoConnect=t.autoConnect!==!1,this._autoConnect&&this.open()}reconnection(e){return arguments.length?(this._reconnection=!!e,this):this._reconnection}reconnectionAttempts(e){return e===void 0?this._reconnectionAttempts:(this._reconnectionAttempts=e,this)}reconnectionDelay(e){var t;return e===void 0?this._reconnectionDelay:(this._reconnectionDelay=e,(t=this.backoff)===null||t===void 0||t.setMin(e),this)}randomizationFactor(e){var t;return e===void 0?this._randomizationFactor:(this._randomizationFactor=e,(t=this.backoff)===null||t===void 0||t.setJitter(e),this)}reconnectionDelayMax(e){var t;return e===void 0?this._reconnectionDelayMax:(this._reconnectionDelayMax=e,(t=this.backoff)===null||t===void 0||t.setMax(e),this)}timeout(e){return arguments.length?(this._timeout=e,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&this.backoff.attempts===0&&this.reconnect()}open(e){if(~this._readyState.indexOf("open"))return this;this.engine=new y(this.uri,this.opts);const t=this.engine,n=this;this._readyState="opening",this.skipReconnect=!1;const i=l(t,"open",function(){n.onopen(),e&&e()}),r=l(t,"error",o=>{n.cleanup(),n._readyState="closed",this.emitReserved("error",o),e?e(o):n.maybeReconnectOnOpen()});if(this._timeout!==!1){const o=this._timeout;o===0&&i();const h=this.setTimeoutFn(()=>{i(),t.close(),t.emit("error",new Error("timeout"))},o);this.opts.autoUnref&&h.unref(),this.subs.push(function(){clearTimeout(h)})}return this.subs.push(i),this.subs.push(r),this}connect(e){return this.open(e)}onopen(){this.cleanup(),this._readyState="open",this.emitReserved("open");const e=this.engine;this.subs.push(l(e,"ping",this.onping.bind(this)),l(e,"data",this.ondata.bind(this)),l(e,"error",this.onerror.bind(this)),l(e,"close",this.onclose.bind(this)),l(this.decoder,"decoded",this.ondecoded.bind(this)))}onping(){this.emitReserved("ping")}ondata(e){try{this.decoder.add(e)}catch(t){this.onclose("parse error",t)}}ondecoded(e){fe(()=>{this.emitReserved("packet",e)},this.setTimeoutFn)}onerror(e){this.emitReserved("error",e)}socket(e,t){let n=this.nsps[e];return n||(n=new de(this,e,t),this.nsps[e]=n),n}_destroy(e){const t=Object.keys(this.nsps);for(const n of t)if(this.nsps[n].active)return;this._close()}_packet(e){const t=this.encoder.encode(e);for(let n=0;n<t.length;n++)this.engine.write(t[n],e.options)}cleanup(){this.subs.forEach(e=>e()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close"),this.engine&&this.engine.close()}disconnect(){return this._close()}onclose(e,t){this.cleanup(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",e,t),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;const e=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{const t=this.backoff.duration();this._reconnecting=!0;const n=this.setTimeoutFn(()=>{e.skipReconnect||(this.emitReserved("reconnect_attempt",e.backoff.attempts),!e.skipReconnect&&e.open(i=>{i?(e._reconnecting=!1,e.reconnect(),this.emitReserved("reconnect_error",i)):e.onreconnect()}))},t);this.opts.autoUnref&&n.unref(),this.subs.push(function(){clearTimeout(n)})}}onreconnect(){const e=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",e)}}const k={};function C(s,e){typeof s=="object"&&(e=s,s=void 0),e=e||{};const t=je(s,e.path||"/socket.io"),n=t.source,i=t.id,r=t.path,o=k[i]&&r in k[i].nsps,h=e.forceNew||e["force new connection"]||e.multiplex===!1||o;let f;return h?f=new V(n,e):(k[i]||(k[i]=new V(n,e)),f=k[i]),t.query&&!e.query&&(e.query=t.queryKey),f.socket(t.path,e)}Object.assign(C,{Manager:V,Socket:de,io:C,connect:C});const A=C("http://42.193.122.21:8080");let Z=prompt("\u8BF7\u8BBE\u7F6E\u7528\u6237\u540D","\u533F\u540D");const P=Z||"\u65E0\u540D\u6C0F",ye=j(0),me=ge([]);A.on("number",s=>{ye.value=s});A.on("message",s=>{me.push(s)});const lt=u("h1",null,"\u7F51\u7EDC\u804A\u5929\u5BA4 \u{1F37B}",-1),ft={class:"notice"},pt={class:"second"},dt=u("br",null,null,-1),yt=["onKeypress"],gt={__name:"chat",setup(s){A.send({user_name:P,message:"\u300C\u5DF2\u52A0\u5165\u300D"});const e=j(""),t=()=>{A.send({user_name:P,message:e.value}),e.value=""},n=()=>{A.send({user_name:P,message:"\u300C\u5DF2\u767B\u51FA\u300D"}),Ee.push("/")};return(i,r)=>(L(),x(H,null,[lt,u("h2",null,"\u5728\u7EBF\u4EBA\u6570: "+S(K(ye)),1),(L(!0),x(H,null,be(K(me),o=>(L(),x("div",null,[u("span",ft,S(o.user_name),1),u("span",pt,":\u2002"+S(o.message),1),dt]))),256)),u("div",null,[ve(u("input",{"onUpdate:modelValue":r[0]||(r[0]=o=>e.value=o),onKeypress:_e(t,["enter"]),placeholder:"\u5728\u6B64\u8F93\u5165\u6D88\u606F",autofocus:""},null,40,yt),[[we,e.value]]),u("label",null,[ke("\u2002"),u("a",{class:"purple",onClick:t},"\u53D1\u9001")])]),u("p",null,[u("a",{class:"fr",onClick:n},"\u767B\u51FA")])],64))}};export{gt as default};
