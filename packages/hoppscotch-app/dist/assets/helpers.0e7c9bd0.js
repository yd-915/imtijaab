import{f as m,j as c,ap as g,aq as q,o as C,d as v,a7 as _,p as r,e3 as u,e4 as a,e5 as b,d0 as I,e6 as D,e7 as w,dM as i,e8 as y,e9 as k,ea as B,eb as E,aY as d,ec as p,ed as h,ee as G,dK as L}from"./index.45473f34.js";const M=m({__name:"Intersection",emits:["intersecting"],setup(s,{emit:e}){const t=c(),n=c();return g(()=>{t.value=new IntersectionObserver(([o])=>{o&&o.isIntersecting&&e("intersecting",o)}),t.value.observe(n.value)}),q(()=>{t.value.disconnect()}),(o,l)=>(C(),v("div",{ref_key:"container",ref:n},[_(o.$slots,"default")],512))}}),f=10,S=async s=>{const e=[];for(;;){const t=await i({query:E,variables:{collectionID:s,cursor:e.length>0?e[e.length-1]:void 0}});if(d(t))return p(t.left);if(e.push(...t.right.collection.children.map(n=>n.id)),t.right.collection.children.length!==f)break}return h(e)},T=async s=>{const e=[];for(;;){const t=await i({query:G,variables:{collectionID:s,cursor:e.length>0?e[e.length-1].id:void 0}});if(d(t))return p(t.left);if(e.push(...t.right.requestsInCollection.map(n=>({id:n.id,request:L(JSON.parse(n.request)),collectionID:s,title:n.title}))),t.right.requestsInCollection.length!==f)break}return h(e)},A=s=>r(k,a("title",()=>r(()=>i({query:y,variables:{collectionID:s}}),u(e=>e.collection.title))),a("children",()=>r(()=>S(s),b(I(w(A),D)))),a("requests",()=>()=>T(s)),u(({title:e,children:t,requests:n})=>({id:s,children:t,requests:n,title:e}))),R=s=>{var e,t,n,o;return B({name:s.title,folders:(t=(e=s.children)==null?void 0:e.map(R))!=null?t:[],requests:(o=(n=s.requests)==null?void 0:n.map(l=>l.request))!=null?o:[]})};export{f as B,M as _,A as g,R as t};
//# sourceMappingURL=helpers.0e7c9bd0.js.map
