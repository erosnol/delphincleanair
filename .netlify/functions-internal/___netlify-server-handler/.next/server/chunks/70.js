"use strict";exports.id=70,exports.ids=[70],exports.modules={64067:(e,t,a)=>{a.d(t,{Z:()=>c});var l=a(10326),r=a(17577),s=a(94019),i=a(61182),d=a(49758),o=a(71709),n=a(33734);function c({onClose:e,onSubmit:t,editingTestimonial:a}){let[c,m]=(0,r.useState)({type:a?.fields?.Type||"text",content:a?.fields?.Content||"",author:a?.fields?.Author||"",location:a?.fields?.Location||"",rating:a?.fields?.Rating||5,videoUrl:a?.fields?.["Video URL"]||"",imageUrl:a?.fields?.["Image URL"]||"",tiktokUrl:a?.fields?.["TikTok URL"]||"",date:a?.fields?.Date||new Date().toISOString().split("T")[0],isApproved:a?.fields?.["Is Approved"]||!1}),[x,p]=(0,r.useState)(!1),y=async l=>{l.preventDefault(),p(!0);try{let l={...c};c.tiktokUrl&&"video"===c.type&&(l.videoUrl=u(c.tiktokUrl)),a?await t({id:a.id,...l}):await t(l),e()}catch(e){console.error("Failed to submit testimonial:",e)}finally{p(!1)}},u=e=>{if(e.includes("tiktok.com")){let t=e.match(/\/video\/(\d+)/);if(t)return`https://www.tiktok.com/embed/v2/${t[1]}`}return e},h=e=>{let{name:t,value:a,type:l}=e.target;m(r=>({...r,[t]:"checkbox"===l?e.target.checked:"number"===l?parseInt(a)||0:a}))};return l.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",children:l.jsx("div",{className:"bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto",children:(0,l.jsxs)("div",{className:"p-6",children:[(0,l.jsxs)("div",{className:"flex justify-between items-center mb-6",children:[l.jsx("h2",{className:"text-2xl font-bold text-gray-900",children:a?"Edit Testimonial":"Add New Testimonial"}),l.jsx("button",{onClick:e,className:"text-gray-400 hover:text-gray-600 transition-colors",children:l.jsx(s.Z,{className:"w-6 h-6"})})]}),(0,l.jsxs)("form",{onSubmit:y,className:"space-y-6",children:[(0,l.jsxs)("div",{children:[l.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Testimonial Type"}),l.jsx("div",{className:"grid grid-cols-3 gap-4",children:[{value:"text",icon:i.Z,label:"Text Review"},{value:"video",icon:d.Z,label:"Video"},{value:"image",icon:o.Z,label:"Image"}].map(({value:e,icon:t,label:a})=>(0,l.jsxs)("label",{className:"relative",children:[l.jsx("input",{type:"radio",name:"type",value:e,checked:c.type===e,onChange:h,className:"sr-only"}),(0,l.jsxs)("div",{className:`border-2 rounded-lg p-4 text-center cursor-pointer transition-all ${c.type===e?"border-blue-500 bg-blue-50":"border-gray-200 hover:border-gray-300"}`,children:[l.jsx(t,{className:`w-6 h-6 mx-auto mb-2 ${c.type===e?"text-blue-500":"text-gray-400"}`}),l.jsx("span",{className:`text-sm font-medium ${c.type===e?"text-blue-700":"text-gray-700"}`,children:a})]})]},e))})]}),(0,l.jsxs)("div",{children:[l.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"text"===c.type?"Review Content":"Description"}),l.jsx("textarea",{name:"content",value:c.content,onChange:h,rows:4,className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",placeholder:"text"===c.type?"Enter the customer review...":"Brief description of the video/image...",required:!0})]}),(0,l.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,l.jsxs)("div",{children:[l.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Customer Name"}),l.jsx("input",{type:"text",name:"author",value:c.author,onChange:h,className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",placeholder:"John Smith",required:!0})]}),(0,l.jsxs)("div",{children:[l.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Location (Optional)"}),l.jsx("input",{type:"text",name:"location",value:c.location,onChange:h,className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",placeholder:"Phoenix, AZ"})]})]}),"text"===c.type&&(0,l.jsxs)("div",{children:[l.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Rating"}),(0,l.jsxs)("div",{className:"flex items-center space-x-2",children:[[1,2,3,4,5].map(e=>l.jsx("button",{type:"button",onClick:()=>m(t=>({...t,rating:e})),className:"focus:outline-none",children:l.jsx(n.Z,{className:`w-6 h-6 ${e<=c.rating?"text-yellow-400 fill-current":"text-gray-300"}`})},e)),(0,l.jsxs)("span",{className:"ml-2 text-sm text-gray-600",children:[c.rating," star",1!==c.rating?"s":""]})]})]}),"video"===c.type&&(0,l.jsxs)("div",{className:"space-y-4",children:[(0,l.jsxs)("div",{children:[l.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"TikTok URL"}),l.jsx("input",{type:"url",name:"tiktokUrl",value:c.tiktokUrl,onChange:h,className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",placeholder:"https://www.tiktok.com/@username/video/1234567890"}),l.jsx("p",{className:"text-xs text-gray-500 mt-1",children:"Paste the TikTok video URL here. It will be automatically converted to an embed."})]}),(0,l.jsxs)("div",{children:[l.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Other Video URL (YouTube, Vimeo, etc.)"}),l.jsx("input",{type:"url",name:"videoUrl",value:c.videoUrl,onChange:h,className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",placeholder:"https://www.youtube.com/embed/VIDEO_ID"})]})]}),"image"===c.type&&(0,l.jsxs)("div",{children:[l.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Image URL"}),l.jsx("input",{type:"url",name:"imageUrl",value:c.imageUrl,onChange:h,className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",placeholder:"https://example.com/image.jpg",required:!0})]}),(0,l.jsxs)("div",{children:[l.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Date"}),l.jsx("input",{type:"date",name:"date",value:c.date,onChange:h,className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"})]}),(0,l.jsxs)("div",{className:"flex items-center",children:[l.jsx("input",{type:"checkbox",name:"isApproved",checked:c.isApproved,onChange:h,className:"w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"}),l.jsx("label",{className:"ml-2 text-sm font-medium text-gray-700",children:"Approved for public display"})]}),(0,l.jsxs)("div",{className:"flex justify-end space-x-4 pt-6 border-t",children:[l.jsx("button",{type:"button",onClick:e,className:"px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors",children:"Cancel"}),(0,l.jsxs)("button",{type:"submit",disabled:x,className:"px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50",children:[x?"Saving...":a?"Update":"Add"," Testimonial"]})]})]})]})})})}},37358:(e,t,a)=>{a.d(t,{Z:()=>l});/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let l=(0,a(62881).Z)("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]])},32933:(e,t,a)=>{a.d(t,{Z:()=>l});/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let l=(0,a(62881).Z)("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]])},71709:(e,t,a)=>{a.d(t,{Z:()=>l});/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let l=(0,a(62881).Z)("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]])},5932:(e,t,a)=>{a.d(t,{Z:()=>l});/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let l=(0,a(62881).Z)("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]])},77636:(e,t,a)=>{a.d(t,{Z:()=>l});/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let l=(0,a(62881).Z)("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]])},40617:(e,t,a)=>{a.d(t,{Z:()=>l});/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let l=(0,a(62881).Z)("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]])},42887:(e,t,a)=>{a.d(t,{Z:()=>l});/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let l=(0,a(62881).Z)("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]])},83855:(e,t,a)=>{a.d(t,{Z:()=>l});/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let l=(0,a(62881).Z)("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]])},69508:(e,t,a)=>{a.d(t,{Z:()=>l});/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let l=(0,a(62881).Z)("SquarePen",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]])},33734:(e,t,a)=>{a.d(t,{Z:()=>l});/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let l=(0,a(62881).Z)("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]])},98091:(e,t,a)=>{a.d(t,{Z:()=>l});/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let l=(0,a(62881).Z)("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]])},17069:(e,t,a)=>{a.d(t,{Z:()=>l});/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let l=(0,a(62881).Z)("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]])},61182:(e,t,a)=>{a.d(t,{Z:()=>l});/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let l=(0,a(62881).Z)("Type",[["polyline",{points:"4 7 4 4 20 4 20 7",key:"1nosan"}],["line",{x1:"9",x2:"15",y1:"20",y2:"20",key:"swin9y"}],["line",{x1:"12",x2:"12",y1:"4",y2:"20",key:"1tx1rr"}]])},24061:(e,t,a)=>{a.d(t,{Z:()=>l});/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let l=(0,a(62881).Z)("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]])},49758:(e,t,a)=>{a.d(t,{Z:()=>l});/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let l=(0,a(62881).Z)("Video",[["path",{d:"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",key:"ftymec"}],["rect",{x:"2",y:"6",width:"14",height:"12",rx:"2",key:"158x01"}]])}};