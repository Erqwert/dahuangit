Ext.define("Ext.plugin.Manager",{alternateClassName:["Ext.PluginManager","Ext.PluginMgr"],singleton:true,typeName:"ptype",create:function(C,D,A){var B,E;if(C.init){B=C}else{if(A){C=Ext.apply({},C);C.cmp=A}else{A=C.cmp}if(C.xclass){B=Ext.create(C)}else{E="plugin."+(C.ptype||D);B=Ext.ClassManager.instantiateByAlias(E,C)}}if(B&&A&&B.setCmp&&!B.setCmpCalled){B.setCmp(A);B.setCmpCalled=true}return B}});