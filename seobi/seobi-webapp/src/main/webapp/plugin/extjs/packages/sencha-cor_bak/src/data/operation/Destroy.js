Ext.define("Ext.data.operation.Destroy",{extend:"Ext.data.operation.Operation",alias:"data.operation.destroy",action:"destroy",isDestroyOperation:true,order:30,foreignKeyDirection:-1,doProcess:function(){var A=this.getRecords(),C=A.length,B;for(B=0;B<C;++B){A[B].setErased()}},doExecute:function(){return this.getProxy().erase(this)},getRecordData:function(A,C){var E={},D=A.idField,B=this.getNameProperty()||"name";E[D[B]]=A.id;return E}});