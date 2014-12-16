Ext.define("Ext.app.bind.Formula",{extend:"Ext.util.Schedulable",requires:["Ext.util.LruCache"],statics:{getFormulaParser:function(C){var A=this.formulaCache,D,B;if(!A){A=this.formulaCache=new Ext.util.LruCache({maxSize:20})}D=A.get(C);if(!D){B="[^\\.a-z0-9_]"+C+"\\((['\"])(.*?)\\1\\)";D=new RegExp(B,"gi");A.add(C,D)}return D}},isFormula:true,calculation:null,explicit:false,set:null,single:false,argumentNamesRe:/^function\s*\(\s*([^,\)\s]+)/,constructor:function(B,H){var G=this,A=B.owner,D,F,C,E;G.owner=A;G.stub=B;G.callParent();if(H instanceof Function){G.get=C=H}else{G.get=C=H.get;G.set=H.set;F=H.bind;if(H.single){G.single=H.single}if(F){D=F.bindTo;if(D){E=Ext.apply({},F);delete E.bindTo;F=D}}}if(!C){Ext.Error.raise("Must specify a getter method for a formula")}if(F){G.explicit=true}else{F=C.$expressions||G.parseFormula(C)}G.binding=A.bind(F,G.onChange,G,E)},destroy:function(){var B=this,A=B.binding,C=B.stub;if(A){A.destroy();B.binding=null}if(C){C.formula=null}B.callParent();B.getterFn=B.owner=null},getFullName:function(){return this.fullName||(this.fullName=this.stub.getFullName()+"="+this.callParent()+")")},getRawValue:function(){return this.calculation},onChange:function(){if(!this.scheduled){this.schedule()}},parseFormula:function(G){var E=G.toString(),C={$literal:true},B,D,F,A;B=this.argumentNamesRe.exec(E);D=B?B[1]:"get";F=Ext.app.bind.Formula.getFormulaParser(D);while((B=F.exec(E))){A=B[2];C[A]=A}C.$literal=true;G.$expressions=C;return C},react:function(){var B=this,D=B.owner,E=B.binding.lastValue,C=B.getterFn,A;if(B.explicit){A=E}else{A=D.getFormulaFn(E)}B.settingValue=true;B.stub.set(B.calculation=B.get.call(D,A));B.settingValue=false;if(B.single){B.destroy()}},privates:{getScheduler:function(){var A=this.owner;return A&&A.getScheduler()},sort:function(){var B=this,A=B.binding;if(!A.destroyed){B.scheduler.sortItem(A)}}}});