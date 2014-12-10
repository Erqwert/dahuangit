Ext.define("Ext.util.Animate",{mixinId:"animate",requires:["Ext.fx.Manager","Ext.fx.Anim"],isAnimate:true,animate:function(B){var A=this;if(Ext.fx.Manager.hasFxBlock(A.id)){return A}Ext.fx.Manager.queueFx(new Ext.fx.Anim(A.anim(B)));return this},anim:function(A){if(!Ext.isObject(A)){return(A)?{}:false}var B=this;if(A.stopAnimation){B.stopAnimation()}Ext.applyIf(A,Ext.fx.Manager.getFxDefaults(B.id));return Ext.apply({target:B,paused:true},A)},getAnimationProps:function(){var A=this,B=A.layout;return B&&B.animate?B.animate:{}},stopFx:Ext.Function.alias(Ext.util.Animate,"stopAnimation"),stopAnimation:function(){Ext.fx.Manager.stopAnimation(this.id);return this},syncFx:function(){Ext.fx.Manager.setFxDefaults(this.id,{concurrent:true});return this},sequenceFx:function(){Ext.fx.Manager.setFxDefaults(this.id,{concurrent:false});return this},hasActiveFx:Ext.Function.alias(Ext.util.Animate,"getActiveAnimation"),getActiveAnimation:function(){return Ext.fx.Manager.getActiveAnimation(this.id)}});