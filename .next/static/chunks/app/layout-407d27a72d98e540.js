(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[177],{2297:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,347,23)),Promise.resolve().then(r.t.bind(r,5356,23)),Promise.resolve().then(r.bind(r,6146)),Promise.resolve().then(r.bind(r,9546))},7401:(e,t,r)=>{"use strict";r.d(t,{A:()=>o});var n=r(2115);let s=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),a=function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return t.filter((e,t,r)=>!!e&&""!==e.trim()&&r.indexOf(e)===t).join(" ").trim()};var l={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let i=(0,n.forwardRef)((e,t)=>{let{color:r="currentColor",size:s=24,strokeWidth:i=2,absoluteStrokeWidth:o,className:u="",children:c,iconNode:d,...m}=e;return(0,n.createElement)("svg",{ref:t,...l,width:s,height:s,stroke:r,strokeWidth:o?24*Number(i)/Number(s):i,className:a("lucide",u),...m},[...d.map(e=>{let[t,r]=e;return(0,n.createElement)(t,r)}),...Array.isArray(c)?c:[c]])}),o=(e,t)=>{let r=(0,n.forwardRef)((r,l)=>{let{className:o,...u}=r;return(0,n.createElement)(i,{ref:l,iconNode:t,className:a("lucide-".concat(s(e)),o),...u})});return r.displayName="".concat(e),r}},6146:(e,t,r)=>{"use strict";r.d(t,{FormHeader:()=>c});var n=r(5155);let s=[{id:1,name:"Instructions",href:"/",status:"complete"},{id:2,name:"General",href:"/general",status:"current"},{id:3,name:"Bank Details",href:"/bank-details",status:"upcoming"},{id:4,name:"GST Details",href:"/gst-details",status:"upcoming"},{id:5,name:"Contact Person",href:"/contact-person",status:"upcoming"},{id:6,name:"Address",href:"/address",status:"upcoming"},{id:7,name:"Turnover",href:"/turnover",status:"upcoming"},{id:8,name:"Submitter",href:"/submitter",status:"upcoming"}];var a=r(8947),l=r(1567);let i=(0,r(7401).A)("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);function o(e){let{steps:t,currentStep:r}=e;return(0,n.jsxs)("div",{className:"w-full",children:[(0,n.jsx)("div",{className:"relative",children:(0,n.jsx)("div",{className:"w-full h-2 bg-purple-700 rounded-full",children:(0,n.jsx)("div",{className:"h-full bg-green-500 rounded-full transition-all duration-300",style:{width:"".concat((r+1)/t.length*100,"%")}})})}),(0,n.jsx)("ol",{className:"mt-4 flex items-center justify-between w-full",children:t.map((e,r)=>(0,n.jsxs)("li",{className:(0,l.cn)("relative flex flex-col items-center",r!==t.length-1?"flex-1":void 0),children:[(0,n.jsx)("div",{className:"flex items-center justify-center",children:"complete"===e.status?(0,n.jsx)(i,{className:"w-8 h-8 text-green-500"}):(0,n.jsx)("div",{className:(0,l.cn)("w-8 h-8 rounded-full flex items-center justify-center border-2","current"===e.status?"border-white bg-white text-purple-600":"border-white bg-transparent text-white"),children:(0,n.jsx)("span",{className:"text-sm font-medium",children:e.id})})}),(0,n.jsx)("div",{className:"mt-2 text-xs text-center",children:(0,n.jsx)("span",{className:(0,l.cn)("font-medium","complete"===e.status?"text-green-500":"current"===e.status?"text-white":"text-white/70"),children:e.name})})]},e.name))})]})}var u=r(2115);function c(){let{currentStep:e}=(0,a.x)(),t=(0,u.useMemo)(()=>s.map((t,r)=>({...t,status:r<e?"complete":r===e?"current":"upcoming"})),[e]);return(0,n.jsxs)("div",{className:"space-y-6 text-white",children:[(0,n.jsx)("h1",{className:"text-2xl font-semibold",children:"Business Partner Registration Form"}),(0,n.jsx)(o,{steps:t,currentStep:e})]})}},9546:(e,t,r)=>{"use strict";r.d(t,{NavigationGuard:()=>s});var n=r(4610);function s(){return(0,n.I)(),null}},4610:(e,t,r)=>{"use strict";r.d(t,{I:()=>l});var n=r(6046),s=r(8947);let a=["/","/general","/bank-details","/gst-details","/contact-person","/address","/turnover","/submitter"],l=()=>{let e=(0,n.useRouter)(),{currentStep:t,setCurrentStep:r,formData:l}=(0,s.x)(),i=t=>{t>=0&&t<a.length&&(r(t),e.push(a[t]))};return{currentStep:t,goToNext:()=>{i(t+1)},goToPrevious:()=>{i(t-1)},navigateToStep:i}}},1567:(e,t,r)=>{"use strict";r.d(t,{cn:()=>a});var n=r(3463),s=r(9795);function a(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,s.QP)((0,n.$)(t))}},8947:(e,t,r)=>{"use strict";r.d(t,{x:()=>a});var n=r(9827),s=r(709);let a=(0,n.v)()((0,s.Zr)(e=>({formData:{},currentStep:0,updateFormData:(t,r)=>e(e=>({formData:{...e.formData,[t]:r}})),setCurrentStep:t=>e({currentStep:t})}),{name:"form-storage",storage:(0,s.KU)(()=>localStorage)}))},347:()=>{},5356:e=>{e.exports={style:{fontFamily:"'Inter', 'Inter Fallback'",fontStyle:"normal"},className:"__className_d65c78"}},709:(e,t,r)=>{"use strict";function n(e,t){let r;try{r=e()}catch(e){return}return{getItem:e=>{var n;let s=e=>null===e?null:JSON.parse(e,null==t?void 0:t.reviver),a=null!=(n=r.getItem(e))?n:null;return a instanceof Promise?a.then(s):s(a)},setItem:(e,n)=>r.setItem(e,JSON.stringify(n,null==t?void 0:t.replacer)),removeItem:e=>r.removeItem(e)}}r.d(t,{KU:()=>n,Zr:()=>a});let s=e=>t=>{try{let r=e(t);if(r instanceof Promise)return r;return{then:e=>s(e)(r),catch(e){return this}}}catch(e){return{then(e){return this},catch:t=>s(t)(e)}}},a=(e,t)=>(r,a,l)=>{let i,o={storage:n(()=>localStorage),partialize:e=>e,version:0,merge:(e,t)=>({...t,...e}),...t},u=!1,c=new Set,d=new Set,m=o.storage;if(!m)return e((...e)=>{console.warn(`[zustand persist middleware] Unable to update item '${o.name}', the given storage is currently unavailable.`),r(...e)},a,l);let h=()=>{let e=o.partialize({...a()});return m.setItem(o.name,{state:e,version:o.version})},f=l.setState;l.setState=(e,t)=>{f(e,t),h()};let g=e((...e)=>{r(...e),h()},a,l);l.getInitialState=()=>g;let v=()=>{var e,t;if(!m)return;u=!1,c.forEach(e=>{var t;return e(null!=(t=a())?t:g)});let n=(null==(t=o.onRehydrateStorage)?void 0:t.call(o,null!=(e=a())?e:g))||void 0;return s(m.getItem.bind(m))(o.name).then(e=>{if(e){if("number"!=typeof e.version||e.version===o.version)return[!1,e.state];if(o.migrate){let t=o.migrate(e.state,e.version);return t instanceof Promise?t.then(e=>[!0,e]):[!0,t]}console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}return[!1,void 0]}).then(e=>{var t;let[n,s]=e;if(r(i=o.merge(s,null!=(t=a())?t:g),!0),n)return h()}).then(()=>{null==n||n(i,void 0),i=a(),u=!0,d.forEach(e=>e(i))}).catch(e=>{null==n||n(void 0,e)})};return l.persist={setOptions:e=>{o={...o,...e},e.storage&&(m=e.storage)},clearStorage:()=>{null==m||m.removeItem(o.name)},getOptions:()=>o,rehydrate:()=>v(),hasHydrated:()=>u,onHydrate:e=>(c.add(e),()=>{c.delete(e)}),onFinishHydration:e=>(d.add(e),()=>{d.delete(e)})},o.skipHydration||v(),i||g}},9827:(e,t,r)=>{"use strict";r.d(t,{v:()=>o});var n=r(2115);let s=e=>{let t;let r=new Set,n=(e,n)=>{let s="function"==typeof e?e(t):e;if(!Object.is(s,t)){let e=t;t=(null!=n?n:"object"!=typeof s||null===s)?s:Object.assign({},t,s),r.forEach(r=>r(t,e))}},s=()=>t,a={setState:n,getState:s,getInitialState:()=>l,subscribe:e=>(r.add(e),()=>r.delete(e))},l=t=e(n,s,a);return a},a=e=>e?s(e):s,l=e=>e,i=e=>{let t=a(e),r=e=>(function(e,t=l){let r=n.useSyncExternalStore(e.subscribe,()=>t(e.getState()),()=>t(e.getInitialState()));return n.useDebugValue(r),r})(t,e);return Object.assign(r,t),r},o=e=>e?i(e):i}},e=>{var t=t=>e(e.s=t);e.O(0,[444,946,441,517,358],()=>t(2297)),_N_E=e.O()}]);