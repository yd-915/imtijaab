import{_ as k,a as g}from"./Tab.vue_vue_type_script_setup_true_lang.417ddf5c.js";import{f as w,E as y,j as V,U as h,g as v,X as u,o as c,c as p,w as _,d as x,q as T,l as d,n as E,aa as I,ab as q,a as A,ac as B}from"./index.45473f34.js";const $=w({__name:"realtime",setup(N){const e=y(),i=I(),b=q(),m=[{target:"websocket",title:e("tab.websocket")},{target:"sse",title:e("tab.sse")},{target:"socketio",title:e("tab.socketio")},{target:"mqtt",title:e("tab.mqtt")}],a=V("websocket");return h({title:v(()=>e(`tab.${a.value}`))}),u(a,s=>{i.push(`/realtime/${s}`)}),u(b,s=>{var t,n;const o=s.path;if(((t=s.name)==null?void 0:t.toString())==="realtime"){i.replace("/realtime/websocket");return}const l=o.split("realtime/")[1],r=(n=m.find(({target:f})=>f===l))==null?void 0:n.target;r&&(a.value=r)},{immediate:!0}),(s,o)=>{const l=g,r=k;return c(),p(r,{modelValue:a.value,"onUpdate:modelValue":o[0]||(o[0]=t=>a.value=t),styles:"sticky bg-primary top-0 z-50","content-styles":"h-[calc(100%-var(--sidebar-primary-sticky-fold)-1px)] !flex"},{default:_(()=>[(c(!0),x(E,null,T(d(m),({target:t,title:n})=>(c(),p(l,{id:t,key:t,label:n},{default:_(()=>[A(d(B))]),_:2},1032,["id","label"]))),128))]),_:1},8,["modelValue"])}}});export{$ as default};
//# sourceMappingURL=realtime.8f2ca7f2.js.map
