Ext.define("Ext.EventManager",{singleton:true,mouseLeaveRe:/(mouseout|mouseleave)/,mouseEnterRe:/(mouseover|mouseenter)/,addListener:function(E,C,B,D,A){Ext.log.warn("Ext.EventManager is deprecated. Use Ext.dom.Element#addListener to attach an event listener.");Ext.get(E).addListener(C,B,D,A)},onWindowResize:function(A,C,B){Ext.log.warn("Ext.EventManager is deprecated. Use Ext.on('resize', fn) to attach a window resize listener.");Ext.GlobalEvents.on("resize",A,C,B)},onWindowUnload:function(A,C,B){Ext.log.warn("Ext.EventManager is deprecated. Use Ext.getWin().on('unload', fn) to attach a window unload listener.");Ext.getWin().on("unload",A,C,B)},purgeElement:function(B,A){Ext.log.warn("Ext.EventManager is deprecated. Call clearListeners() on a Ext.dom.Element to remove all listeners.");Ext.get(B).clearListeners()},removeAll:function(A){Ext.log.warn("Ext.EventManager is deprecated. Call clearListeners() on a Ext.dom.Element to remove all listeners.");Ext.get(A).clearListeners()},removeListener:function(E,C,B,D,A){Ext.log.warn("Ext.EventManager is deprecated. Use Ext.dom.Element#removeListener to remove an event listener.");Ext.get(E).removeListener(C,B,D,A)},removeResizeListener:function(A,B){Ext.log.warn("Ext.EventManager is deprecated. Use Ext.on('resize', fn) to detach a window resize listener.");Ext.GlobalEvents.un("resize",A,B)},removeUnloadListener:function(A,B){Ext.log.warn("Ext.EventManager is deprecated. Use Ext.getWin().un('unload', fn) to detach a window unload listener.");Ext.getWin().un("unload",A,B)},stopEvent:function(A){Ext.log.warn("Ext.EventManager.stopEvent() is deprecated. Call stopEvent() directly on the Ext.event.Event instance instead.");this.stopPropagation(A);this.preventDefault(A)},stopPropagation:function(A){Ext.log.warn("Ext.EventManager.stopPropagation() is deprecated. Call stopPropagation() directly on the Ext.event.Event instance instead.");A=A.browserEvent||A;if(A.stopPropagation){A.stopPropagation()}else{A.cancelBubble=true}},preventDefault:function(B){Ext.log.warn("Ext.EventManager.preventDefault() is deprecated. Call preventDefault() directly on the Ext.event.Event instance instead.");B=B.browserEvent||B;if(B.preventDefault){B.preventDefault()}else{B.returnValue=false;try{if(B.ctrlKey||B.keyCode>111&&B.keyCode<124){B.keyCode=-1}}catch(A){}}},getId:function(A){Ext.log.warn("Ext.EventManager.getId() is deprecated. Call Ext.get() to assign ids to elements.");A=Ext.get(A);return A.id},getRelatedTarget:function(A){Ext.log.warn("Ext.EventManager.getRelatedTarget() is deprecated. Call getRelatedTarget() directly on the Ext.event.Event instance instead.");A=A.browserEvent||A;var B=A.relatedTarget;if(!B){if(this.mouseLeaveRe.test(A.type)){B=A.toElement}else{if(this.mouseEnterRe.test(A.type)){B=A.fromElement}}}return this.resolveTextNode(B)},getPageX:function(A){Ext.log.warn("Ext.EventManager.getPageX() is deprecated. Call getX() directly on the Ext.event.Event instance instead.");return this.getPageXY(A)[0]},getPageXY:function(B){Ext.log.warn("Ext.EventManager.getPageXY() is deprecated. Call getXY() directly on the Ext.event.Event instance instead.");B=B.browserEvent||B;var C=B.pageX,D=B.pageY,E=doc.documentElement,A=doc.body;if(!C&&C!==0){C=B.clientX+(E&&E.scrollLeft||A&&A.scrollLeft||0)-(E&&E.clientLeft||A&&A.clientLeft||0);D=B.clientY+(E&&E.scrollTop||A&&A.scrollTop||0)-(E&&E.clientTop||A&&A.clientTop||0)}return[C,D]},getPageY:function(A){Ext.log.warn("Ext.EventManager.getPageY() is deprecated. Call getY() directly on the Ext.event.Event instance instead.");return this.getPageXY(A)[1]},getTarget:function(A){Ext.log.warn("Ext.EventManager.getTarget() is deprecated. Call getTarget() directly on the Ext.event.Event instance instead.");A=A.browserEvent||A;return EventManager.resolveTextNode(A.target||A.srcElement)},resolveTextNode:Ext.isGecko?function(B){if(B){var A=HTMLElement.prototype.toString.call(B);if(A!=="[xpconnect wrapped native prototype]"&&A!=="[object XULElement]"){return B.nodeType==3?B.parentNode:B}}}:function(A){return A&&A.nodeType==3?A.parentNode:A}},function(A){A.on=A.addListener;A.un=A.removeListener});