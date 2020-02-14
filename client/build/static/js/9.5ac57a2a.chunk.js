(this["webpackJsonpsecret-notes"]=this["webpackJsonpsecret-notes"]||[]).push([[9],{387:function(e,a,t){"use strict";var r=t(101);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=r(t(0)),n=(0,r(t(222)).default)(l.default.createElement(l.default.Fragment,null,l.default.createElement("defs",null,l.default.createElement("path",{id:"a",d:"M24 24H0V0h24v24z"})),l.default.createElement("path",{d:"M3 4V1h2v3h3v2H5v3H3V6H0V4h3zm3 6V7h3V4h7l1.83 2H21c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V10h3zm7 9c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-3.2-5c0 1.77 1.43 3.2 3.2 3.2s3.2-1.43 3.2-3.2-1.43-3.2-3.2-3.2-3.2 1.43-3.2 3.2z"})),"AddAPhoto");a.default=n},418:function(e,a,t){"use strict";t.r(a);var r=t(0),l=t.n(r),n=t(43);function s(e,a){if(null==e)return{};var t,r,l=function(e,a){if(null==e)return{};var t,r,l={},n=Object.keys(e);for(r=0;r<n.length;r++)t=n[r],a.indexOf(t)>=0||(l[t]=e[t]);return l}(e,a);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(r=0;r<n.length;r++)t=n[r],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(l[t]=e[t])}return l}var m=t(4),c=t.n(m),o=function(e){var a=e.title,t=e.subtitle,r=e.className,m=s(e,["title","subtitle","className"]),o=c()(r,"text-center","text-md-left","mb-sm-0");return l.a.createElement(n.d,Object.assign({xs:"12",sm:"4",className:o},m),l.a.createElement("span",{className:"text-uppercase page-subtitle"},t),l.a.createElement("h3",{className:"page-title"},a))},i=t(31),u=t(32),p=t(34),d=t(33),f=t(35),h=t(9),g=t(334),E=t(19),N=t(387),b=t.n(N),v=function(e){function a(e){var t;return Object(i.a)(this,a),(t=Object(p.a)(this,Object(d.a)(a).call(this,e))).getFile=function(e){var a=e.target.files[0];a&&t.setState({imageToUpload:a},(function(){t.uploadImage(),t.setState({loading:!0})}))},t.handleChangeFile=function(){t.refs.fileUploader.click()},t.uploadImage=function(){Object(E.n)(t.state.imageToUpload,t.state.token).then((function(e){e.data&&t.setState({error:!1},(function(){return t.props.changeAvatar(e.data)}))})).catch((function(e){t.setState({error:!0})}))},t.renderProfileImage=function(e){return e?l.a.createElement("div",{className:"flex-center"},l.a.createElement("div",{onError:null,style:{backgroundImage:"url(".concat(h.HOSTNAME,"/").concat(e,")")},className:"profile-avatar-main"})):l.a.createElement("div",{className:"flex-center"},l.a.createElement(g.a,{name:t.state.firstName,round:!0,size:"10vw",className:"rounded-circle mr-2"}))},t.state={firstName:t.props.userData&&t.props.userData.firstName,lastName:t.props.userData&&t.props.userData.lastName,email:t.props.userData&&t.props.userData.email,currentSecret:t.props.userData&&t.props.userData.currentSecret,token:t.props.token,imageToUpload:null,error:!1},t}return Object(f.a)(a,e),Object(u.a)(a,[{key:"render",value:function(){return l.a.createElement(n.b,{small:!0,className:"mb-4 pt-3"},l.a.createElement(n.c,{className:"border-bottom text-center"},l.a.createElement("div",{className:"mb-3 mx-auto"},this.renderProfileImage(this.props.profileImage),l.a.createElement("input",{onChange:this.getFile,style:{display:"none"},type:"file",ref:"fileUploader"})),l.a.createElement("h4",{className:"mb-0"},this.state.firstName),l.a.createElement("span",{className:"text-muted d-block mb-2"},this.state.jobTitle),l.a.createElement(n.a,{pill:!0,outline:!0,size:"sm",className:"mb-2",onClick:this.handleChangeFile,style:{paddingLeft:50,paddingRight:50}},l.a.createElement(b.a,{className:"material-icons mr-1"},"Change Image"))),this.state.error&&l.a.createElement("h8",{style:{color:"red",textAlign:"center",marginTop:10}},"We Encountered An Error"),l.a.createElement(n.q,{flush:!0},l.a.createElement(n.r,{className:"px-4"},l.a.createElement("div",{className:"text-center",style:{padding:20}},l.a.createElement("h6",{className:"mb-0 text-center"},"Personalize Your Profile with a better photo of Yourself"," ")))))}}]),a}(l.a.Component),C=t(45),O=function(e){function a(e){var t;return Object(i.a)(this,a),(t=Object(p.a)(this,Object(d.a)(a).call(this,e))).handleChange=function(e){t.setState(Object(C.a)({},e.target.name,e.target.value))},t.onSaveChanges=function(){if(t.areChangesAllowed(t.state)){var e={firstName:t.state.firstName,lastName:t.state.lastName,email:t.state.email,secret:t.state.secret};t.updateChanges(e)}},t.updateChanges=function(e){Object(E.m)(e,t.state.token).then((function(e){t.props.updateChanges(e.data)}))},t.areChangesAllowed=function(e){var a=e.firstName,t=e.lastName,r=e.email;return a.length>0&&t.length>0&&r.length>0},t.state={firstName:t.props.userData&&t.props.userData.firstName,lastName:t.props.userData&&t.props.userData.lastName,email:t.props.userData&&t.props.userData.email,secret:t.props.userData&&t.props.userData.secret,token:t.props.token},t}return Object(f.a)(a,e),Object(u.a)(a,[{key:"render",value:function(){var e=this.state,a=e.firstName,t=e.lastName,r=e.secret,s=e.email;return l.a.createElement(n.b,{small:!0,className:"mb-4"},l.a.createElement(n.c,{className:"border-bottom"},l.a.createElement("h6",{className:"m-0"},"Your Profile")),l.a.createElement(n.q,{flush:!0},l.a.createElement(n.r,{className:"p-3"},l.a.createElement(n.x,null,l.a.createElement(n.d,null,l.a.createElement(n.k,null,l.a.createElement(n.x,{form:!0},l.a.createElement(n.d,{md:"6",className:"form-group"},l.a.createElement("label",{htmlFor:"feFirstName"},"First Name"),l.a.createElement(n.l,{id:"feFirstName",name:"firstName",placeholder:"First Name",value:a||"",onChange:this.handleChange})),l.a.createElement(n.d,{md:"6",className:"form-group"},l.a.createElement("label",{htmlFor:"feLastName"},"Last Name"),l.a.createElement(n.l,{name:"lastName",id:"feLastName",placeholder:"Last Name",value:t||"",onChange:this.handleChange}))),l.a.createElement(n.x,{form:!0},l.a.createElement(n.d,{className:"form-group"},l.a.createElement("label",{htmlFor:"feEmail"},"Email"),l.a.createElement(n.l,{name:"email",type:"email",id:"feEmail",placeholder:"Email Address",value:s||"",onChange:this.handleChange,autoComplete:"email"}))),l.a.createElement(n.x,{form:!0},l.a.createElement(n.d,{md:"12",className:"form-group"},l.a.createElement("label",{htmlFor:"feDescription"},"Current Secret"),l.a.createElement(n.m,{name:"secret",id:"feDescription",rows:"5",onChange:this.handleChange,value:r||""}))),l.a.createElement("div",{className:"flex-center"},l.a.createElement(n.a,{theme:"primary",className:"mb-2 mr-1",onClick:this.onSaveChanges},"Save Changes"))))))))}}]),a}(l.a.Component);a.default=function(e){return l.a.createElement(n.f,{fluid:!0,className:"main-content-container px-4"},l.a.createElement(n.x,{noGutters:!0,className:"page-header py-4"},l.a.createElement(o,{title:"User Profile",subtitle:"Overview",md:"12",className:"ml-sm-auto mr-sm-auto"})),l.a.createElement(n.x,null,l.a.createElement(n.d,{lg:"4"},l.a.createElement(v,{userData:e.userData,token:e.token,profileImage:e.profileImage,changeAvatar:e.changeAvatar})),l.a.createElement(n.d,{lg:"8"},l.a.createElement(O,{userData:e.userData,token:e.token,updateChanges:e.updateChanges}))))}}}]);
//# sourceMappingURL=9.5ac57a2a.chunk.js.map