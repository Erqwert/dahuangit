Ext.define("Ext.mixin.Mashup",function(A){return{extend:"Ext.Mixin",mixinConfig:{id:"mashup",extended:function(C,B){A.process(B)}},statics:{process:function(B){var C=B.prototype,E=C.requiredScripts,F=B._classHooks,D=F.onCreated;if(E){delete C.requiredScripts;F.onCreated=function(){var G=this,H=Ext.Array.slice(arguments);Ext.Loader.loadScripts({url:E,cache:true,onLoad:function(){F.onCreated=D;F.onCreated.call(G,H)}})}}}},onClassMixedIn:function(B){A.process(B)}}});