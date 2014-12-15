Ext.define("Ext.util.paintmonitor.Abstract",{config:{element:null,callback:Ext.emptyFn,scope:null,args:[]},eventName:"",monitorClass:"",constructor:function(A){this.onElementPainted=Ext.Function.bind(this.onElementPainted,this);this.initConfig(A)},bindListeners:function(A){this.monitorElement[A?"addEventListener":"removeEventListener"](this.eventName,this.onElementPainted,true)},applyElement:function(A){if(A){return Ext.get(A)}},updateElement:function(A){this.monitorElement=Ext.Element.create({classList:["x-paint-monitor",this.monitorClass]},true);A.appendChild(this.monitorElement);A.addCls("x-paint-monitored");this.bindListeners(true)},onElementPainted:function(){},destroy:function(){var B=this.monitorElement,A=B.parentNode,C=this.getElement();this.bindListeners(false);delete this.monitorElement;if(C&&!C.isDestroyed){C.removeCls("x-paint-monitored");delete this._element}if(A){A.removeChild(B)}this.callSuper()}});