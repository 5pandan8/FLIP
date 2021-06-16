/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[0],{349:function(ha,da,h){h.r(da);h.d(da,"ByteRangeRequest",function(){return ma});var ca=h(3),aa=h(0);h.n(aa);var fa=h(1),ea=h(119);ha=h(75);var z=h(202),x=h(54),f=h(50),e=h(201),y=h(135);h=h(303);var r=[],n=[],w=window,ba=function(){return function(){this.Mk=1}}(),ia;(function(e){e[e.UNSENT=0]="UNSENT";e[e.DONE=4]="DONE"})(ia||(ia={}));var ma=function(){function f(f,h,n,r){var y=this;this.url=f;this.range=h;this.Af=n;this.withCredentials=
r;this.VV=ia;this.request=new XMLHttpRequest;this.request.open("GET",this.url,!0);w.Uint8Array&&(this.request.responseType="arraybuffer");r&&(this.request.withCredentials=r);qa.DISABLE_RANGE_HEADER||(Object(aa.isUndefined)(h.stop)?this.request.setRequestHeader("Range","bytes="+h.start):this.request.setRequestHeader("Range",["bytes=",h.start,"-",h.stop-1].join("")));this.request.setRequestHeader("X-Requested-With","XMLHttpRequest");n&&Object.keys(n).forEach(function(e){y.request.setRequestHeader(e,
n[e])});this.request.overrideMimeType?this.request.overrideMimeType("text/plain; charset=x-user-defined"):this.request.setRequestHeader("Accept-Charset","x-user-defined");this.status=e.a.NOT_STARTED}f.prototype.start=function(f){var h=this,n=this.request;n.onreadystatechange=function(){if(h.aborted)return h.status=e.a.ABORTED,f({code:e.a.ABORTED});if(this.readyState===h.VV.DONE){h.Xy();var r=0===window.document.URL.indexOf("file:///");200===n.status||206===n.status||r&&0===n.status?(r=w.oO(this),
h.Cr(r,f)):(h.status=e.a.ERROR,f({code:h.status,status:h.status}))}};this.request.send(null);this.status=e.a.STARTED};f.prototype.Cr=function(f,h){this.status=e.a.SUCCESS;if(h)return h(!1,f)};f.prototype.abort=function(){this.Xy();this.aborted=!0;this.request.abort()};f.prototype.Xy=function(){var e=Object(y.b)(this.url,this.range,n);-1!==e&&n.splice(e,1);if(0<r.length){e=r.shift();var h=new f(e.url,e.range,this.Af,this.withCredentials);e.request=h;n.push(e);h.start(Object(y.c)(e))}};f.prototype.extend=
function(e){var f=Object.assign({},this,e.prototype);f.constructor=e;return f};return f}(),qa=function(e){function h(f,h,n,r,w){n=e.call(this,f,n,r)||this;n.Ok={};n.Ex=h;n.url=f;n.DISABLE_RANGE_HEADER=!1;n.av=ma;n.TI=3;n.Af=w||{};return n}Object(ca.c)(h,e);h.prototype.$s=function(e,h,n){var r=-1===e.indexOf("?")?"?":"&";switch(n){case !1:case f.a.NEVER_CACHE:e=e+r+"_="+Object(aa.uniqueId)();break;case !0:case f.a.CACHE:e=e+r+"_="+h.start+","+(Object(aa.isUndefined)(h.stop)?"":h.stop)}return e};h.prototype.EM=
function(e,f,h,n){void 0===h&&(h={});return new this.av(e,f,h,n)};h.prototype.M0=function(e,f,h,w,y){for(var x=0;x<r.length;x++)if(Object(aa.isEqual)(r[x].range,f)&&Object(aa.isEqual)(r[x].url,e))return r[x].ag.push(w),r[x].Sz++,null;for(x=0;x<n.length;x++)if(Object(aa.isEqual)(n[x].range,f)&&Object(aa.isEqual)(n[x].url,e))return n[x].ag.push(w),n[x].Sz++,null;h={url:e,range:f,Ex:h,ag:[w],Sz:1};if(0===r.length&&n.length<this.TI)return n.push(h),h.request=this.EM(e,f,y,this.withCredentials),h;r.push(h);
return null};h.prototype.dm=function(e,f,h){var w=this.$s(e,f,this.Ex);(e=this.M0(w,f,this.Ex,h,this.Af))&&e.request.start(Object(y.c)(e));return function(){var e=Object(y.b)(w,f,n);if(-1!==e){var h=--n[e].Sz;0===h&&n[e].request&&n[e].request.abort()}else e=Object(y.b)(w,f,r),-1!==e&&(h=--r[e].Sz,0===h&&r.splice(e,1))}};h.prototype.TN=function(){return{start:-ea.a}};h.prototype.J3=function(){var e=-(ea.a+ea.e);return{start:e-ea.d,end:e}};h.prototype.Pq=function(e){var f=this;this.Jx=!0;var h=ea.a;
this.dm(this.url,this.TN(),function(n,r,w){function y(){var h=f.Gd.QN();f.dm(f.url,h,function(n,r){if(n)return Object(fa.h)("Error loading central directory: "+n),e(n);r=Object(x.a)(r);if(r.length!==h.stop-h.start)return e("Invalid XOD file: Zip central directory data is wrong size! Should be "+(h.stop-h.start)+" but is "+r.length);f.Gd.hR(r);f.oD=!0;f.Jx=!1;return e(!1)})}if(n)return Object(fa.h)("Error loading end header: "+n),e(n,r,w);r=Object(x.a)(r);if(r.length!==h)return e("Invalid XOD file: Zip end header data is wrong size!");
try{f.Gd=new z.a(r)}catch(ua){return e(ua)}f.Gd.f5?f.dm(f.url,f.J3(),function(h,n){if(h)return Object(fa.h)("Error loading zip64 header: "+h),e(h);n=Object(x.a)(n);f.Gd.w5(n);y()}):y()})};h.prototype.lO=function(e){e(Object.keys(this.Gd.Nl))};h.prototype.TG=function(e,f){var h=this;if(this.Gd.wM(e)){var n=this.Gd.Qy(e);if(n in this.Ok){var r=this.Wg[e];r.Np=this.Ok[n];r.Np.Mk++;r.cancel=r.Np.cancel}else{var w=this.Gd.e2(e),y=this.dm(this.url,w,function(r,y){r?(Object(fa.h)('Error loading part "'+
e+'": '+r),h.dm(h.url,w,function(r,y){if(r)return f(r,e);h.lR(y,w,n,e,f)})):h.lR(y,w,n,e,f)}),x=this.Wg[e];x&&(x.qT=!0,x.cancel=function(){x.Np.Mk--;0===x.Np.Mk&&(y(),delete h.Ok[n])},this.Ok[n]=new ba(n),x.Np=this.Ok[n],x.Np.cancel=x.cancel)}}else delete this.Wg[e],f(Error('File not found: "'+e+'"'),e)};h.prototype.lR=function(e,f,h,n,r){if(e.length!==f.stop-f.start)r(Error("Part data is wrong size!"),n);else{do{if(!this.Ok[h])return;n=this.Ok[h].Mk;for(var w=f.Ho.length,y=0;y<w;++y){var x=f.Ho[y];
r(!1,x.Bo,e["string"===typeof e?"substring":"subarray"](x.start,x.stop),this.Gd.nP(x.Bo));x.Bo in this.Wg&&delete this.Wg[x.Bo]}}while(n!==this.Ok[h].Mk);delete this.Ok[h]}};h.DISABLE_RANGE_HEADER=!1;h.TI=3;return h}(ha.a);(function(e){function f(f,h,n){var r=e.call(this)||this,w;for(w in f)r[w]=f[w];r.Nea=f;r.startOffset=h;r.endOffset=n;r.EM=function(e,h,n,w){Object(aa.isUndefined)(h.stop)?(h.start+=r.endOffset,h.stop=r.endOffset):(h.start+=r.startOffset,h.stop+=r.startOffset);e=r.$s(r.url,h,r.Ex);
return new f.av(e,h,n,w)};return r}Object(ca.c)(f,e);return f})(qa);Object(h.a)(qa);Object(h.b)(qa);da["default"]=qa}}]);}).call(this || window)