import{f as g,E as L,g as R,j as x,b3 as B,eM as v,z as $,o as n,d as M,e as l,t as S,l as e,k as c,c as d,N as T,b8 as D,s as p,f8 as w,x as E}from"./index.45473f34.js";import{u as H,a as I}from"./utils.88b63f0a.js";import{b as z,a as N,u as j}from"./lens-actions.b9670b75.js";import"./json.6cb86656.js";const V={class:"flex flex-col flex-1"},W={class:"sticky z-10 flex items-center justify-between pl-4 border-b bg-primary border-dividerLight top-lowerSecondaryStickyFold"},A={class:"font-semibold text-secondaryLight"},F={class:"flex"},q=g({__name:"XMLLensRenderer",props:{response:null},setup(o){const u=o,s=L(),{responseBodyText:i}=z(u.response),_=R(()=>(u.response.headers.find(k=>k.key.toLowerCase()==="content-type").value||"").split(";")[0].toLowerCase()),{downloadIcon:h,downloadResponse:m}=N(_.value,i),{copyIcon:C,copyResponse:f}=j(i),y=x(null),t=x(!0);return H(y,i,B({extendedEditorConfig:{mode:"application/xml",readOnly:!0,lineWrapping:t},linter:null,completer:null,environmentHighlights:!0})),v("response.file.download",()=>m()),v("response.copy",()=>f()),(k,b)=>{const a=E,r=$("tippy");return n(),M("div",V,[l("div",W,[l("label",A,S(e(s)("response.body")),1),l("div",F,[o.response.body?c((n(),d(a,{key:0,title:e(s)("state.linewrap"),class:T({"!text-accent":t.value}),icon:e(I),onClick:b[0]||(b[0]=D(J=>t.value=!t.value,["prevent"]))},null,8,["title","class","icon"])),[[r,{theme:"tooltip"}]]):p("",!0),o.response.body?c((n(),d(a,{key:1,title:`${e(s)("action.download_file")} <kbd>${e(w)()}</kbd><kbd>J</kbd>`,icon:e(h),onClick:e(m)},null,8,["title","icon","onClick"])),[[r,{theme:"tooltip",allowHTML:!0}]]):p("",!0),o.response.body?c((n(),d(a,{key:2,title:`${e(s)("action.copy")} <kbd>${e(w)()}</kbd><kbd>.</kbd>`,icon:e(C),onClick:e(f)},null,8,["title","icon","onClick"])),[[r,{theme:"tooltip",allowHTML:!0}]]):p("",!0)])]),l("div",{ref_key:"xmlResponse",ref:y,class:"flex flex-col flex-1"},null,512)])}}});export{q as default};
//# sourceMappingURL=XMLLensRenderer.d4a69be3.js.map
