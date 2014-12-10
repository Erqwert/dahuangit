Ext.define("Ext.dd.DragDropManager",{singleton:true,requires:["Ext.util.Region"],uses:["Ext.tip.QuickTipManager"],alternateClassName:["Ext.dd.DragDropMgr","Ext.dd.DDM"],ids:{},handleIds:{},dragCurrent:null,dragOvers:{},deltaX:0,deltaY:0,preventDefault:true,stopPropagation:true,initialized:false,locked:false,init:function(){this.initialized=true},POINT:0,INTERSECT:1,mode:0,notifyOccluded:false,dragCls:Ext.baseCSSPrefix+"dd-drag-current",_execOnAll:function(C,G){var D=this.ids,A,F,E,B;for(A in D){if(D.hasOwnProperty(A)){B=D[A];for(F in B){if(B.hasOwnProperty(F)){E=B[F];if(!this.isTypeOfDD(E)){continue}E[C].apply(E,G)}}}}},addListeners:function(){var A=this;A.init();Ext.getDoc().on({mouseup:A.handleMouseUp,mousemove:A.handleMouseMove,dragstart:A.preventDrag,drag:A.preventDrag,dragend:A.preventDrag,capture:true,scope:A});Ext.getWin().on({unload:A._onUnload,resize:A._onResize,scope:A})},preventDrag:function(A){if(this.isMouseDown){A.stopPropagation()}},_onResize:function(A){this._execOnAll("resetConstraints",[])},lock:function(){this.locked=true},unlock:function(){this.locked=false},isLocked:function(){return this.locked},locationCache:{},useCache:true,clickPixelThresh:8,dragThreshMet:false,clickTimeout:null,startX:0,startY:0,regDragDrop:function(B,A){if(!this.initialized){this.init()}if(!this.ids[A]){this.ids[A]={}}this.ids[A][B.id]=B},removeDDFromGroup:function(C,B){if(!this.ids[B]){this.ids[B]={}}var A=this.ids[B];if(A&&A[C.id]){delete A[C.id]}},_remove:function(F,A){var D=this,E=D.ids,B=F.groups,C;if(D.clearingAll){return}if(D.dragCurrent===F){D.dragCurrent=null}for(C in B){if(B.hasOwnProperty(C)){if(A){delete E[C]}else{if(E[C]){delete E[C][F.id]}}}}delete D.handleIds[F.id]},regHandle:function(A,B){if(!this.handleIds[A]){this.handleIds[A]={}}this.handleIds[A][B]=B},isDragDrop:function(A){return(this.getDDById(A))?true:false},getRelated:function(D,C){var B=[],A,E,F;for(A in D.groups){for(E in this.ids[A]){F=this.ids[A][E];if(!this.isTypeOfDD(F)){continue}if(!C||F.isTarget){B[B.length]=F}}}return B},isLegalTarget:function(D,E){var B=this.getRelated(D,true),A,C;for(A=0,C=B.length;A<C;++A){if(B[A].id==E.id){return true}}return false},isTypeOfDD:function(A){return(A&&A.__ygDragDrop)},isHandle:function(A,B){return(this.handleIds[A]&&this.handleIds[A][B])},getDDById:function(D,B){var A,C;for(A in this.ids){C=this.ids[A][D];if(C instanceof Ext.dd.DDTarget||B){return C}}return null},handleMouseDown:function(B,E){var D=this,A,C;D.isMouseDown=true;if(Ext.quickTipsActive){Ext.tip.QuickTipManager.ddDisable()}D.currentPoint=B.getPoint();if(D.dragCurrent){D.handleMouseUp(B)}D.mousedownEvent=B;D.currentTarget=B.getTarget();D.dragCurrent=E;C=E.getEl();Ext.fly(C).setCapture();A=B.getXY();D.startX=A[0];D.startY=A[1];D.offsetX=D.offsetY=0;D.deltaX=D.startX-C.offsetLeft;D.deltaY=D.startY-C.offsetTop;D.dragThreshMet=false},startDrag:function(C,D){var B=this,A=B.dragCurrent,E;clearTimeout(B.clickTimeout);if(A){A.b4StartDrag(C,D);A.startDrag(C,D);E=A.getDragEl();if(E){Ext.fly(E).addCls(B.dragCls)}}B.dragThreshMet=true},handleMouseUp:function(A){var B=this;B.isMouseDown=false;if(Ext.quickTipsActive){Ext.tip.QuickTipManager.ddEnable()}if(!B.dragCurrent){return}if(Ext.isIE&&document.releaseCapture){document.releaseCapture()}clearTimeout(B.clickTimeout);if(B.dragThreshMet){B.fireEvents(A,true)}B.stopDrag(A);B.stopEvent(A)},stopEvent:function(A){if(this.stopPropagation){A.stopPropagation()}if(this.preventDefault){A.preventDefault()}},stopDrag:function(A){var B=this,C=B.dragCurrent,D;if(C){if(B.dragThreshMet){D=C.getDragEl();if(D){Ext.fly(D).removeCls(B.dragCls)}C.b4EndDrag(A);C.endDrag(A)}B.dragCurrent.onMouseUp(A)}B.dragCurrent=null;B.dragOvers={}},handleMouseMove:function(A){var D=this,B=D.dragCurrent,E=D.currentPoint=A.getPoint(),C=E.x,H=E.y,F,G;D.offsetX=C-D.startX;D.offsetY=H-D.startY;if(!B){return true}if(!D.dragThreshMet){F=Math.abs(D.offsetX);G=Math.abs(D.offsetY);if(F>D.clickPixelThresh||G>D.clickPixelThresh){D.startDrag(D.startX,D.startY)}}if(D.dragThreshMet){B.b4Drag(A);B.onDrag(A);if(!B.moveOnly){D.fireEvents(A,false)}}D.stopEvent(A);return true},fireEvents:function(L,F){var H=this,I=Ext.supports.Touch,W=H.dragCurrent,A=H.currentPoint,O=A.x,E=A.y,P,M,Q,R,K=[],U=[],S=[],D=[],B=[],T=[],V,G,C,X,N=I?document.documentElement.clientWidth/window.innerWidth:1,J;if(!W||W.isLocked()){return}J=!(W.deltaX<0||W.deltaY<0);if(I||(!H.notifyOccluded&&(!Ext.supports.CSSPointerEvents||Ext.isIE10m||Ext.isOpera)&&J)){P=W.getDragEl();if(J){P.style.visibility="hidden"}L.target=document.elementFromPoint(O/N,E/N);if(J){P.style.visibility="visible"}}for(G in H.dragOvers){Q=H.dragOvers[G];delete H.dragOvers[G];if(!H.isTypeOfDD(Q)||Q.isDestroyed){continue}if(H.notifyOccluded){if(!this.isOverTarget(A,Q,H.mode)){S.push(Q)}}else{if(!L.within(Q.getEl())){S.push(Q)}}U[G]=true}for(X in W.groups){if("string"!=typeof X){continue}for(G in H.ids[X]){Q=H.ids[X][G];if(H.isTypeOfDD(Q)&&(R=Q.getEl())&&(Q.isTarget)&&(!Q.isLocked())&&(Ext.fly(R).isVisible(true))&&((Q!=W)||(W.ignoreSelf===false))){if(H.notifyOccluded){if((Q.zIndex=H.getZIndex(R))!==-1){V=true}K.push(Q)}else{if(L.within(Q.getEl())){K.push(Q);break}}}}}if(V){Ext.Array.sort(K,H.byZIndex)}for(G=0,C=K.length;G<C;G++){Q=K[G];if(H.isOverTarget(A,Q,H.mode)){if(F){B.push(Q)}else{if(!U[Q.id]){T.push(Q)}else{D.push(Q)}H.dragOvers[Q.id]=Q}if(!H.notifyOccluded){break}}}if(H.mode){if(S.length){W.b4DragOut(L,S);W.onDragOut(L,S)}if(T.length){W.onDragEnter(L,T)}if(D.length){W.b4DragOver(L,D);W.onDragOver(L,D)}if(B.length){W.b4DragDrop(L,B);W.onDragDrop(L,B)}}else{for(G=0,C=S.length;G<C;++G){W.b4DragOut(L,S[G].id);W.onDragOut(L,S[G].id)}for(G=0,C=T.length;G<C;++G){W.onDragEnter(L,T[G].id)}for(G=0,C=D.length;G<C;++G){W.b4DragOver(L,D[G].id);W.onDragOver(L,D[G].id)}for(G=0,C=B.length;G<C;++G){W.b4DragDrop(L,B[G].id);W.onDragDrop(L,B[G].id)}}if(F&&!B.length){W.onInvalidDrop(L)}},getZIndex:function(D){var A=document.body,B,C=-1;D=Ext.getDom(D);while(D!==A){if(!isNaN(B=Number(Ext.fly(D).getStyle("zIndex")))){C=B}D=D.parentNode}return C},byZIndex:function(A,B){return A.zIndex<B.zIndex},getBestMatch:function(C){var D=null,B=C.length,A,E;if(B==1){D=C[0]}else{for(A=0;A<B;++A){E=C[A];if(E.cursorIsOver){D=E;break}else{if(!D||D.overlap.getArea()<E.overlap.getArea()){D=E}}}}return D},refreshCache:function(B){var C,A,D,E;for(C in B){if("string"!=typeof C){continue}for(A in this.ids[C]){D=this.ids[C][A];if(this.isTypeOfDD(D)){E=this.getLocation(D);if(E){this.locationCache[D.id]=E}else{delete this.locationCache[D.id]}}}}},verifyEl:function(A){if(A){var C;if(Ext.isIE){try{C=A.offsetParent}catch(B){}}else{C=A.offsetParent}if(C){return true}}return false},getLocation:function(B){if(!this.isTypeOfDD(B)){return null}if(B.getRegion){return B.getRegion()}var H=B.getEl(),J,C,F,D,G,E,A,K,L;try{J=Ext.fly(H).getXY()}catch(I){}if(!J){return null}C=J[0];F=C+H.offsetWidth;D=J[1];G=D+H.offsetHeight;E=D-B.padding[0];A=F+B.padding[1];K=G+B.padding[2];L=C-B.padding[3];return new Ext.util.Region(E,A,K,L)},isOverTarget:function(A,E,F){var B=this.locationCache[E.id],C,G,H,D,I;if(!B||!this.useCache){B=this.getLocation(E);this.locationCache[E.id]=B}if(!B){return false}E.cursorIsOver=B.contains(A);C=this.dragCurrent;if(!C||!C.getTargetCoord||(!F&&!C.constrainX&&!C.constrainY)){return E.cursorIsOver}E.overlap=null;G=C.getTargetCoord(A.x,A.y);H=C.getDragEl();D=new Ext.util.Region(G.y,G.x+H.offsetWidth,G.y+H.offsetHeight,G.x);I=D.intersect(B);if(I){E.overlap=I;return(F)?true:E.cursorIsOver}else{return false}},_onUnload:function(A,B){Ext.dd.DragDropManager.unregAll()},unregAll:function(){var C=this,A=C.elementCache,B;if(C.dragCurrent){C.stopDrag();C.dragCurrent=null}C.clearingAll=true;C._execOnAll("unreg",[]);delete C.clearingAll;for(B in A){delete A[B]}C.elementCache={};C.ids={};C.handleIds={}},elementCache:{},getElWrapper:function(B){var A=this.elementCache[B];if(!A||!A.el){A=this.elementCache[B]=new this.ElementWrapper(Ext.getDom(B))}return A},getElement:function(A){return Ext.getDom(A)},getCss:function(B){var A=Ext.getDom(B);return(A)?A.style:null},ElementWrapper:function(A){this.el=A||null;this.id=this.el&&A.id;this.css=this.el&&A.style},getPosX:function(A){return Ext.fly(A).getX()},getPosY:function(A){return Ext.fly(A).getY()},swapNode:function(C,D){if(C.swapNode){C.swapNode(D)}else{var B=D.parentNode,A=D.nextSibling;if(A==C){B.insertBefore(C,D)}else{if(D==C.nextSibling){B.insertBefore(D,C)}else{C.parentNode.replaceChild(D,C);B.insertBefore(C,A)}}}},getScroll:function(){var E=window.document,C=E.documentElement,A=E.body,D=0,B=0;if(C&&(C.scrollTop||C.scrollLeft)){D=C.scrollTop;B=C.scrollLeft}else{if(A){D=A.scrollTop;B=A.scrollLeft}}return{top:D,left:B}},getStyle:function(A,B){return Ext.fly(A).getStyle(B)},getScrollTop:function(){return this.getScroll().top},getScrollLeft:function(){return this.getScroll().left},moveToEl:function(A,C){var B=Ext.fly(C).getXY();Ext.fly(A).setXY(B)},numericSort:function(B,A){return(B-A)},handleWasClicked:function(B,C){if(this.isHandle(C,B.id)){return true}else{var A=B.parentNode;while(A){if(this.isHandle(C,A.id)){return true}else{A=A.parentNode}}}return false}},function(A){Ext.onReady(function(){A.addListeners()})});