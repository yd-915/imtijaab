import{f as u,E as _,ei as m,it as g,X as k,ek as y,el as v,fD as D,ab as R,aa as b,fm as I,g3 as S,gr as C,fT as E,_ as x,o as s,d as o,e as t,t as a,a as c,s as p,dV as j,x as q}from"./index.8036b442.js";const L=u({setup(){const e=R(),d=b(),h=_(),i=m({query:g,variables:{code:e.params.id}});return k(()=>i.data,()=>{var n;if(i.loading)return;const r=i.data;if(I(r)){const l=JSON.parse((n=r.right.shortcode)==null?void 0:n.request);S(C(l,E())),d.push({path:"/"})}}),{E:y,shortcodeDetails:i,reloadApplication:()=>{window.location.reload()},t:h,route:e,IconHome:v,IconRefreshCW:D}},data(){return{invalidLink:!1,shortcodeID:""}},mounted(){typeof this.route.params.id=="string"&&(this.shortcodeID=this.route.params.id),this.invalidLink=!this.shortcodeID}}),$={class:"flex flex-col items-center justify-between"},w={key:0,class:"flex flex-col items-center justify-center flex-1"},B=t("i",{class:"pb-2 opacity-75 material-icons"},"error_outline",-1),N={class:"text-center heading"},V={class:"mt-2 text-center"},A={key:1,class:"flex flex-col items-center justify-center flex-1 p-4"},T={key:0,class:"flex flex-col items-center justify-center flex-1 p-4"},H={key:1},Q={key:0,class:"flex flex-col items-center p-4"},W=t("i",{class:"pb-2 opacity-75 material-icons"},"error_outline",-1),G={class:"text-center heading"},J={class:"mt-2 text-center"},O={class:"mt-4"},X={key:1,class:"flex flex-col items-center justify-center flex-1 p-4"},z={class:"heading"};function F(e,d,h,i,f,r){const n=j,l=q;return s(),o("div",$,[e.invalidLink?(s(),o("div",w,[B,t("h1",N,a(e.t("error.invalid_link")),1),t("p",V,a(e.t("error.invalid_link_description")),1)])):(s(),o("div",A,[e.shortcodeDetails.loading?(s(),o("div",T,[c(n)])):(s(),o("div",H,[!e.shortcodeDetails.loading&&e.E.isLeft(e.shortcodeDetails.data)?(s(),o("div",Q,[W,t("h1",G,a(e.t("error.invalid_link")),1),t("p",J,a(e.t("error.invalid_link_description")),1),t("p",O,[c(l,{to:"/",icon:e.IconHome,filled:"",label:e.t("app.home")},null,8,["icon","label"]),c(l,{icon:e.IconRefreshCW,label:e.t("app.reload"),filled:"",onClick:e.reloadApplication},null,8,["icon","label","onClick"])])])):p("",!0),!e.shortcodeDetails.loading&&e.E.isRight(e.shortcodeDetails.data)?(s(),o("div",X,[t("h1",z,a(e.t("state.loading")),1)])):p("",!0)]))]))])}const M=x(L,[["render",F]]);export{M as default};
//# sourceMappingURL=_id.7a070fe8.js.map
