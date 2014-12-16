Ext.define("Ext.event.publisher.Dom",{extend:"Ext.event.publisher.Publisher",requires:["Ext.env.Browser","Ext.event.Event","Ext.GlobalEvents"],targetType:"element",idOrClassSelectorRegex:/^([#|\.])([\w\-]+)$/,classNameSplitRegex:/\s+/,SELECTOR_ALL:"*",captureEvents:{resize:1,focus:1,blur:1,paste:1,input:1,change:1,animationstart:1,animationend:1,scroll:1},directEvents:{mouseenter:1,mouseleave:1,pointerenter:1,pointerleave:1,MSPointerEnter:1,MSPointerLeave:1,load:1,unload:1,beforeunload:1,error:1,DOMContentLoaded:1,DOMFrameContentLoaded:1},blockedPointerEvents:{pointerover:1,pointerout:1,pointerenter:1,pointerleave:1,MSPointerOver:1,MSPointerOut:1,MSPointerEnter:1,MSPointerLeave:1},blockedCompatibilityMouseEvents:{mouseenter:1,mouseleave:1},constructor:function(){var H=this,F=document,I=F.defaultView,E=H.eventToVendorMap={},J=H.vendorToEventMap={},C=H.handledEvents,G=Ext.browser,D,B,A;H.captureSubscribers={};H.directSubscribers={};H.globalListeners={};if((Ext.os.is.iOS&&Ext.os.version.getMajor()<5)||!(I&&I.addEventListener)){H.target=F;H.isTargetWin=false}else{H.target=I;H.isTargetWin=true}H.initHandlers();if(C){for(D=0,B=C.length;D<B;D++){this.addDelegatedListener(C[D])}}else{if(G.is.WebKit){E.transitionend=G.getVendorProperyName("transitionEnd");E.animationstart=G.getVendorProperyName("animationStart");E.animationend=G.getVendorProperyName("animationEnd");for(A in E){J[E[A]]=A}}}return H.callParent()},initHandlers:function(){var A=this;A.onDelegatedEvent=Ext.bind(A.onDelegatedEvent,A);A.onDirectEvent=Ext.bind(A.onDirectEvent,A)},handles:function(){return false},getSubscribers:function(C,A){var B=A?this.captureSubscribers:this.subscribers,D=B[C];if(!D){D=B[C]={id:{$length:0},className:{$length:0},selector:[],all:0,$length:0}}return D},getDirectSubscribers:function(E,B){var A=this.directSubscribers,D=A[E]||(A[E]={}),C=D[B]||(D[B]={$length:0});return C},addDelegatedListener:function(A){this.target.addEventListener(A,this.onDelegatedEvent,this.captureEvents[A])},removeDelegatedListener:function(A){this.target.removeEventListener(A,this.onDelegatedEvent,this.captureEvents[A])},addDirectListener:function(B,C,A){C.addEventListener(B,this.onDirectEvent,A)},removeDirectListener:function(B,C,A){C.removeEventListener(B,this.onDirectEvent,A)},subscribe:function(M,F,H,I){var K=this,A=!!H.capture,J=M.match(K.idOrClassSelectorRegex),N,E,G,L,C,D,O,B;if(H.delegated!==false&&!K.directEvents[F]&&!(M==="#ext-window"&&!K.isTargetWin)){if(!K.handledEvents&&!K.globalListeners[F]){K.addDelegatedListener(K.eventToVendorMap[F]||F);this.globalListeners[F]=1}}else{D=I.dom;C=this.getDirectSubscribers(D.id,F);if(++C.$length===1){K.addDirectListener(F,D,A)}if(!J){(C.selector||(C.selector=[])).push(M)}return}N=K.getSubscribers(F,A);E=N.id;G=N.className;L=N.selector;if(J){O=J[1];B=J[2];if(O==="#"){if(E.hasOwnProperty(B)){E[B]++;return}E[B]=1;E.$length++}else{if(G.hasOwnProperty(B)){G[B]++;return}G[B]=1;G.$length++}}else{if(M===this.SELECTOR_ALL){N.all++}else{if(L.hasOwnProperty(M)){L[M]++;return}L[M]=1;L.push(M)}}N.$length++},unsubscribe:function(O,G,K,M,F){var E=this,I=!!M.capture,L=O.match(E.idOrClassSelectorRegex),C,Q,A,N,D,P,J,H,B;if(M.delegated===false||E.directEvents[G]||(O===Ext.windowId&&!E.isTargetWin)){H=F.dom;B=H.id;D=E.getDirectSubscribers(B,G);if(K){if(D.$length){E.removeDirectListener(G,H,I)}delete E.directSubscribers[B]}else{if(!--D.$length){E.removeDirectListener(G,H,I);delete E.directSubscribers[B][G]}else{if(!L){Ext.Array.remove(D.selector,O)}}}return}C=E.getSubscribers(G,I);Q=C.id;A=C.className;N=C.selector;if(L){P=L[1];J=L[2];if(P==="#"){if(!Q.hasOwnProperty(J)||(!K&&--Q[J]>0)){return}delete Q[J];Q.$length--}else{if(!A.hasOwnProperty(J)||(!K&&--A[J]>0)){return}delete A[J];A.$length--}}else{if(O===E.SELECTOR_ALL){if(K){C.all=0}else{C.all--}}else{if(!N.hasOwnProperty(O)||(!K&&--N[O]>0)){return}delete N[O];Ext.Array.remove(N,O)}}C.$length--},getPropagatingTargets:function(B){var A=[];if(!B){return A}do{A[A.length]=B;B=B.parentNode}while(B);return A},dispatch:function(B,A,C){C.push(C[0].target);this.callParent(arguments)},publish:function(D,H,E){var K=this.getSubscribers(D,true),F=this.getSubscribers(D),J=this.getSubscribers("*",true),I=this.getSubscribers("*"),G=K.$length,B=F.$length,C=J.$length,A=I.$length,L;if(!G&&!B&&!C&&!A){return}if(Ext.isArray(H)){L=H}else{if(this.captureEvents[D]){L=[H]}else{L=this.getPropagatingTargets(H)}}if(!G||!this.doPublish(K,D,L,E,true)){if(C){this.doPublish(J,D,L,E,true)}}if(!E.isStopped&&(!B||!this.doPublish(F,D,L,E))){if(A){this.doPublish(I,D,L,E)}}return this},doPublish:function(E,K,R,T,Z){var b=E.id,C=E.className,X=E.selector,I=b.$length>0,N=C.$length>0,P=X.length>0,S=E.all>0,D={},L=[T],J=false,H=this.classNameSplitRegex,Q=0,M=R.length,A=1,F,W,G,B,Y,U,O,a,V;if(Z){Q=M-1;M=A=-1}for(F=Q;F!==M;F+=A){Y=R[F];T.setCurrentTarget(Y);if(I){U=(Y.tagName==="FORM")?Y.getAttribute("id"):(Y===window)?"ext-window":Y.id;if(U){if(b.hasOwnProperty(U)){J=true;this.dispatch("#"+U,K,L,Z)}}}if(N){O=Y.className;if(O){a=O.split(H);for(G=0,B=a.length;G<B;G++){O=a[G];if(!D[O]){D[O]=true;if(C.hasOwnProperty(O)){J=true;this.dispatch("."+O,K,L)}}}}}if(T.isStopped){return J}}if(S&&!J){T.setCurrentTarget(T.browserEvent.target);J=true;this.dispatch(this.SELECTOR_ALL,K,L);if(T.isStopped){return J}}if(P){for(G=0,B=R.length;G<B;G++){Y=R[G];for(F=0,W=X.length;F<W;F++){V=X[F];if(Ext.fly(Y).is(V)){T.setCurrentTarget(Y);J=true;this.dispatch(V,K,L)}if(T.isStopped){return J}}}}return J},onDelegatedEvent:function(B,E){var C=this,A=B.type,D;D=new Ext.event.Event(B);if(C.isEventBlocked(D)){return false}C.beforeEvent(D);A=D.type=C.vendorToEventMap[A]||A;Ext.frameStartTime=B.timeStamp;C.publish(A,D.target,D);if(E!==false){C.afterEvent(D)}return D},onDirectEvent:function(A){var M=this,O=A.type,F=new Ext.event.Event(A),E,G,L,D,I,N,J,H,K,B,C;if(M.isEventBlocked(F)){return}M.beforeEvent(F);E=F.type=this.vendorToEventMap[O]||O;G=A.currentTarget;L=G.id;D=M.getDirectSubscribers(L,E).selector;I=M.dispatcher;N=M.targetType;J=A.target;H=J;Ext.frameStartTime=A.timeStamp;if(J.navigator){L="ext-window"}F.setCurrentTarget(G);if(D){B=D.length;while(H!==G){for(K=0;K<B;K++){C=D[K];if(Ext.fly(H).is(C)){I.dispatchDirectEvent(N,C,E,[F,J])}}H=H.parentNode}}I.dispatchDirectEvent(N,"#"+L,E,[F,J]);M.afterEvent(F)},beforeEvent:function(A){var B=A.browserEvent,D=Ext.event.publisher.Dom,E,C;if(B.type==="touchstart"){E=B.touches;if(E.length===1){C=E[0];D.lastTouchStartX=C.pageX;D.lastTouchStartY=C.pageY}}},afterEvent:function(B){var C=B.browserEvent,A=C.type,D=Ext.event.publisher.Dom,E=Ext.GlobalEvents;if(E.hasListeners.idle&&!E.idleEventMask[A]){E.fireEvent("idle")}if(B.self.pointerEvents[A]&&B.pointerType!=="mouse"){D.lastScreenPointerEventTime=Ext.now()}if(A==="touchend"){D.lastTouchEndTime=Ext.now()}},isEventBlocked:function(B){var C=this,A=B.type,D=Ext.event.publisher.Dom,E=Ext.now();return(C.blockedPointerEvents[A]&&B.pointerType!=="mouse")||(C.blockedCompatibilityMouseEvents[A]&&(E-D.lastScreenPointerEventTime<1000))||(Ext.supports.TouchEvents&&B.self.mouseEvents[B.type]&&Math.abs(B.pageX-D.lastTouchStartX)<15&&Math.abs(B.pageY-D.lastTouchStartY)<15&&(Ext.now()-D.lastTouchEndTime)<1000)},hasSubscriber:function(F,D){var C=F.match(this.idOrClassSelectorRegex),B=this.getSubscribers(D),A,E;if(C!==null){A=C[1];E=C[2];if(A==="#"){return B.id.hasOwnProperty(E)}else{return B.className.hasOwnProperty(E)}}else{return(B.selector.hasOwnProperty(F)&&Ext.Array.indexOf(B.selector,F)!==-1)}return false},getSubscribersCount:function(A){return this.getSubscribers(A).$length+this.getSubscribers("*").$length},destroy:function(){var C=this,D=C.handledEvents,A,E,B;if(D){for(A=0,E=D.length;A<E;A++){C.removeDelegatedListener(D[A])}}else{for(B in C.globalListeners){C.removeDelegatedListener(B)}}}});