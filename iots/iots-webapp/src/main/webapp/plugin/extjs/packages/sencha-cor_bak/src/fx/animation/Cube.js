Ext.define("Ext.fx.animation.Cube",{extend:"Ext.fx.animation.Abstract",alias:"animation.cube",config:{before:{},after:{},direction:"right",out:false},getData:function(){var K=this.getTo(),J=this.getFrom(),M=this.getBefore(),E=this.getAfter(),C=this.getOut(),B=this.getDirection(),F=this.getElement(),I=F.getWidth(),D=F.getHeight(),H=C?"100% 100%":"0% 0%",G=1,L=1,A={rotateY:0,translateZ:0},N={rotateY:0,translateZ:0};if(B=="left"||B=="right"){if(C){L=0.5;N.translateZ=I;N.rotateY=-90}else{G=0.5;A.translateZ=I;A.rotateY=90}}M["transform-origin"]=H;E["transform-origin"]=null;K.set("transform",N);J.set("transform",A);J.set("opacity",G);K.set("opacity",L);return this.callParent(arguments)}});