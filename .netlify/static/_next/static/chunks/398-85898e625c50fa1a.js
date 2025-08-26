"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[398],{4928:function(e,t,n){n.d(t,{Z:function(){return c}});var r=n(7437),l=n(2265),a=n(4697),i=n(6569),o=n(8954),s=n(8604),d=n(9338);function c(e){var t,n,c,u,m,x,h,p,y,f;let{onClose:g,onSubmit:b,editingTestimonial:v}=e,[k,j]=(0,l.useState)({type:(null==v?void 0:null===(t=v.fields)||void 0===t?void 0:t.Type)||"text",content:(null==v?void 0:null===(n=v.fields)||void 0===n?void 0:n.Content)||"",author:(null==v?void 0:null===(c=v.fields)||void 0===c?void 0:c.Author)||"",location:(null==v?void 0:null===(u=v.fields)||void 0===u?void 0:u.Location)||"",rating:(null==v?void 0:null===(m=v.fields)||void 0===m?void 0:m.Rating)||5,videoUrl:(null==v?void 0:null===(x=v.fields)||void 0===x?void 0:x["Video URL"])||"",imageUrl:(null==v?void 0:null===(h=v.fields)||void 0===h?void 0:h["Image URL"])||"",tiktokUrl:(null==v?void 0:null===(p=v.fields)||void 0===p?void 0:p["TikTok URL"])||"",date:(null==v?void 0:null===(y=v.fields)||void 0===y?void 0:y.Date)||new Date().toISOString().split("T")[0],isApproved:(null==v?void 0:null===(f=v.fields)||void 0===f?void 0:f["Is Approved"])||!1}),[w,N]=(0,l.useState)(!1),Z=async e=>{e.preventDefault(),N(!0);try{let e={...k};k.tiktokUrl&&"video"===k.type&&(e.videoUrl=C(k.tiktokUrl)),v?await b({id:v.id,...e}):await b(e),g()}catch(e){console.error("Failed to submit testimonial:",e)}finally{N(!1)}},C=e=>{if(e.includes("tiktok.com")){let t=e.match(/\/video\/(\d+)/);if(t)return"https://www.tiktok.com/embed/v2/".concat(t[1])}return e},U=e=>{let{name:t,value:n,type:r}=e.target;j(l=>({...l,[t]:"checkbox"===r?e.target.checked:"number"===r?parseInt(n)||0:n}))};return(0,r.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",children:(0,r.jsx)("div",{className:"bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto",children:(0,r.jsxs)("div",{className:"p-6",children:[(0,r.jsxs)("div",{className:"flex justify-between items-center mb-6",children:[(0,r.jsx)("h2",{className:"text-2xl font-bold text-gray-900",children:v?"Edit Testimonial":"Add New Testimonial"}),(0,r.jsx)("button",{onClick:g,className:"text-gray-400 hover:text-gray-600 transition-colors",children:(0,r.jsx)(a.Z,{className:"w-6 h-6"})})]}),(0,r.jsxs)("form",{onSubmit:Z,className:"space-y-6",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Testimonial Type"}),(0,r.jsx)("div",{className:"grid grid-cols-3 gap-4",children:[{value:"text",icon:i.Z,label:"Text Review"},{value:"video",icon:o.Z,label:"Video"},{value:"image",icon:s.Z,label:"Image"}].map(e=>{let{value:t,icon:n,label:l}=e;return(0,r.jsxs)("label",{className:"relative",children:[(0,r.jsx)("input",{type:"radio",name:"type",value:t,checked:k.type===t,onChange:U,className:"sr-only"}),(0,r.jsxs)("div",{className:"border-2 rounded-lg p-4 text-center cursor-pointer transition-all ".concat(k.type===t?"border-blue-500 bg-blue-50":"border-gray-200 hover:border-gray-300"),children:[(0,r.jsx)(n,{className:"w-6 h-6 mx-auto mb-2 ".concat(k.type===t?"text-blue-500":"text-gray-400")}),(0,r.jsx)("span",{className:"text-sm font-medium ".concat(k.type===t?"text-blue-700":"text-gray-700"),children:l})]})]},t)})})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"text"===k.type?"Review Content":"Description"}),(0,r.jsx)("textarea",{name:"content",value:k.content,onChange:U,rows:4,className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",placeholder:"text"===k.type?"Enter the customer review...":"Brief description of the video/image...",required:!0})]}),(0,r.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Customer Name"}),(0,r.jsx)("input",{type:"text",name:"author",value:k.author,onChange:U,className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",placeholder:"John Smith",required:!0})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Location (Optional)"}),(0,r.jsx)("input",{type:"text",name:"location",value:k.location,onChange:U,className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",placeholder:"Phoenix, AZ"})]})]}),"text"===k.type&&(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Rating"}),(0,r.jsxs)("div",{className:"flex items-center space-x-2",children:[[1,2,3,4,5].map(e=>(0,r.jsx)("button",{type:"button",onClick:()=>j(t=>({...t,rating:e})),className:"focus:outline-none",children:(0,r.jsx)(d.Z,{className:"w-6 h-6 ".concat(e<=k.rating?"text-yellow-400 fill-current":"text-gray-300")})},e)),(0,r.jsxs)("span",{className:"ml-2 text-sm text-gray-600",children:[k.rating," star",1!==k.rating?"s":""]})]})]}),"video"===k.type&&(0,r.jsxs)("div",{className:"space-y-4",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"TikTok URL"}),(0,r.jsx)("input",{type:"url",name:"tiktokUrl",value:k.tiktokUrl,onChange:U,className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",placeholder:"https://www.tiktok.com/@username/video/1234567890"}),(0,r.jsx)("p",{className:"text-xs text-gray-500 mt-1",children:"Paste the TikTok video URL here. It will be automatically converted to an embed."})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Other Video URL (YouTube, Vimeo, etc.)"}),(0,r.jsx)("input",{type:"url",name:"videoUrl",value:k.videoUrl,onChange:U,className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",placeholder:"https://www.youtube.com/embed/VIDEO_ID"})]})]}),"image"===k.type&&(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Image URL"}),(0,r.jsx)("input",{type:"url",name:"imageUrl",value:k.imageUrl,onChange:U,className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",placeholder:"https://example.com/image.jpg",required:!0})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Date"}),(0,r.jsx)("input",{type:"date",name:"date",value:k.date,onChange:U,className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"})]}),(0,r.jsxs)("div",{className:"flex items-center",children:[(0,r.jsx)("input",{type:"checkbox",name:"isApproved",checked:k.isApproved,onChange:U,className:"w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"}),(0,r.jsx)("label",{className:"ml-2 text-sm font-medium text-gray-700",children:"Approved for public display"})]}),(0,r.jsxs)("div",{className:"flex justify-end space-x-4 pt-6 border-t",children:[(0,r.jsx)("button",{type:"button",onClick:g,className:"px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors",children:"Cancel"}),(0,r.jsxs)("button",{type:"submit",disabled:w,className:"px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50",children:[w?"Saving...":v?"Update":"Add"," Testimonial"]})]})]})]})})})}},8030:function(e,t,n){n.d(t,{Z:function(){return s}});var r=n(2265);/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let l=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),a=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter((e,t,n)=>!!e&&n.indexOf(e)===t).join(" ")};/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let o=(0,r.forwardRef)((e,t)=>{let{color:n="currentColor",size:l=24,strokeWidth:o=2,absoluteStrokeWidth:s,className:d="",children:c,iconNode:u,...m}=e;return(0,r.createElement)("svg",{ref:t,...i,width:l,height:l,stroke:n,strokeWidth:s?24*Number(o)/Number(l):o,className:a("lucide",d),...m},[...u.map(e=>{let[t,n]=e;return(0,r.createElement)(t,n)}),...Array.isArray(c)?c:[c]])}),s=(e,t)=>{let n=(0,r.forwardRef)((n,i)=>{let{className:s,...d}=n;return(0,r.createElement)(o,{ref:i,iconNode:t,className:a("lucide-".concat(l(e)),s),...d})});return n.displayName="".concat(e),n}},2671:function(e,t,n){n.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n(8030).Z)("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]])},2468:function(e,t,n){n.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n(8030).Z)("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]])},8604:function(e,t,n){n.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n(8030).Z)("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]])},4086:function(e,t,n){n.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n(8030).Z)("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]])},9321:function(e,t,n){n.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n(8030).Z)("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]])},7390:function(e,t,n){n.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n(8030).Z)("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]])},9832:function(e,t,n){n.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n(8030).Z)("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]])},2513:function(e,t,n){n.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n(8030).Z)("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]])},6649:function(e,t,n){n.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n(8030).Z)("SquarePen",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]])},9338:function(e,t,n){n.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n(8030).Z)("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]])},883:function(e,t,n){n.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n(8030).Z)("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]])},3225:function(e,t,n){n.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n(8030).Z)("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]])},6569:function(e,t,n){n.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n(8030).Z)("Type",[["polyline",{points:"4 7 4 4 20 4 20 7",key:"1nosan"}],["line",{x1:"9",x2:"15",y1:"20",y2:"20",key:"swin9y"}],["line",{x1:"12",x2:"12",y1:"4",y2:"20",key:"1tx1rr"}]])},1240:function(e,t,n){n.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n(8030).Z)("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]])},8954:function(e,t,n){n.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n(8030).Z)("Video",[["path",{d:"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",key:"ftymec"}],["rect",{x:"2",y:"6",width:"14",height:"12",rx:"2",key:"158x01"}]])},4697:function(e,t,n){n.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n(8030).Z)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]])}}]);