Ext.define("Ext.form.action.Action",{alternateClassName:"Ext.form.Action",submitEmptyText:true,constructor:function(A){if(A){Ext.apply(this,A)}var B=A.params;if(Ext.isString(B)){this.params=Ext.Object.fromQueryString(B)}},run:Ext.emptyFn,onFailure:function(A){this.response=A;this.failureType=Ext.form.action.Action.CONNECT_FAILURE;this.form.afterAction(this,false)},processResponse:function(A){this.response=A;if(!A.responseText&&!A.responseXML){return true}return(this.result=this.handleResponse(A))},getUrl:function(){return this.url||this.form.url},getMethod:function(){return(this.method||this.form.method||"POST").toUpperCase()},getParams:function(){return Ext.apply({},this.params,this.form.baseParams)},createCallback:function(){var B=this,C,A=B.form;return{success:B.onSuccess,failure:B.onFailure,scope:B,timeout:(this.timeout*1000)||(A.timeout*1000),upload:A.fileUpload?B.onSuccess:C}},statics:{CLIENT_INVALID:"client",SERVER_INVALID:"server",CONNECT_FAILURE:"connect",LOAD_FAILURE:"load"}});