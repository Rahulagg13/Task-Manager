"use strict";(self.webpackChunktask_manager=self.webpackChunktask_manager||[]).push([[896],{7332:function(e,t,r){var n=r(7689),a=r(184);t.Z=function(){var e=(0,n.s0)();return(0,a.jsx)("button",{onClick:function(){e(-1)},className:"mt-12 px-12  w-12 text-lg font-bold",children:"Back"})}},8896:function(e,t,r){r.r(t);var n=r(4165),a=r(5861),s=r(9439),c=r(2791),u=r(1243),i=r(4673),o=r(8348),l=r(7332),d=r(184);t.default=function(){var e=(0,i.Z)(["jwt"]),t=(0,s.Z)(e,1)[0],r=(0,c.useState)([]),p=(0,s.Z)(r,2),f=p[0],h=p[1];(0,c.useEffect)((function(){var e=function(){var e=(0,a.Z)((0,n.Z)().mark((function e(){var r;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u.Z.get("https://task-manager-backend-rust.vercel.app/users/allUser",{headers:{Authorization:"Bearer ".concat(t.jwt)}});case 3:r=e.sent,h(r.data.data.users),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),o.Am.error("Something went wrong!!!");case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();e()}),[t]);var x=function(){var e=(0,a.Z)((0,n.Z)().mark((function e(r){var a;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u.Z.get("https://task-manager-backend-rust.vercel.app/"+"users/deactivateUser/".concat(r),{headers:{Authorization:"Bearer ".concat(t.jwt)}});case 3:e.sent,a=f.filter((function(e){return e.id!==r})),h(a),window.location.reload(),o.Am.success("User delete successfully"),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),o.Am.error("Something went wrong !!!");case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}();return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(l.Z,{}),(0,d.jsx)("section",{className:"h-screen w-full flex flex-col items-center px-8 py-12 space-y-10",children:f.map((function(e){return(0,d.jsxs)("div",{className:" container px-4 py-2 border-2 border-gray-800 rounded-lg space-y-8",children:[(0,d.jsx)("h1",{className:"text-xl font-bold",children:e.username}),(0,d.jsxs)("p",{className:"text-lg",children:["Email: ",e.email]}),(0,d.jsx)("div",{className:"flex justify-end",children:(0,d.jsx)("button",{className:" border-2 bg-green-500 text-white rounded-lg px-6 py-2 ",onClick:function(){return x(e._id)},children:"Deactivate User"})})]},e._id)}))})]})}}}]);
//# sourceMappingURL=896.524ede3e.chunk.js.map