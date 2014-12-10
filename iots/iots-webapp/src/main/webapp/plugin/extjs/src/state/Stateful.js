Ext.define("Ext.state.Stateful",{mixinId:"state",requires:["Ext.state.Manager"],stateful:false,saveDelay:100,constructor:function(){var A=this;if(!A.stateEvents){A.stateEvents=[]}if(A.stateful!==false){A.addStateEvents(A.stateEvents);A.initState()}},addStateEvents:function(D){var B=this,A,C,F,E;if(B.stateful&&B.getStateId()){E=(typeof D==="string")?arguments:D;F=B.stateEventsByName||(B.stateEventsByName={});for(A=E.length;A--;){C=E[A];if(C&&!F[C]){F[C]=1;B.on(C,B.onStateChange,B)}}}},onStateChange:function(){var C=this,D=C.saveDelay,B,A;if(!C.stateful){return}if(D){if(!C.stateTask){B=Ext.state.Stateful;A=B.runner||(B.runner=new Ext.util.TaskRunner());C.stateTask=A.newTask({run:C.saveState,scope:C,interval:D,repeat:1})}C.stateTask.start()}else{C.saveState()}},saveState:function(){var F=this,E=F.stateful&&F.getStateId(),H=F.hasListeners,I,B,D,G,C,A;if(E){C=F.getState()||{};I=F.getPlugins()||[];for(D=0,G=I.length;D<G;D++){B=I[D];if(B&&B.getState){A=B.getState(C);if(A&&!C[B.ptype]){C[B.ptype]=A}}}if(!H.beforestatesave||F.fireEvent("beforestatesave",F,C)!==false){Ext.state.Manager.set(E,C);if(H.statesave){F.fireEvent("statesave",F,C)}}}},getState:function(){return null},applyState:function(A){if(A){Ext.apply(this,A)}},getStateId:function(){var A=this;return A.stateId||(A.autoGenId?null:A.id)},initState:function(){var H=this,G=H.stateful&&H.getStateId(),J=H.hasListeners,E,C,F,I,A,D,B;if(G){C=Ext.state.Manager.get(G);if(C){E=Ext.apply({},C);if(!J.beforestaterestore||H.fireEvent("beforestaterestore",H,C)!==false){A=H.getPlugins()||[];for(F=0,I=A.length;F<I;F++){D=A[F];if(D){B=D.ptype;if(D.applyState){D.applyState(E[B],C)}delete E[B]}}H.applyState(E);if(J.staterestore){H.fireEvent("staterestore",H,C)}}}}},savePropToState:function(F,E,D){var B=this,A=B[F],C=B.initialConfig;if(B.hasOwnProperty(F)){if(!C||C[F]!==A){if(E){E[D||F]=A}return true}}return false},savePropsToState:function(A,E){var D=this,B,C;if(typeof A==="string"){D.savePropToState(A,E)}else{for(B=0,C=A.length;B<C;++B){D.savePropToState(A[B],E)}}return E},destroy:function(){var A=this,B=A.stateTask;if(B){B.destroy();A.stateTask=null}A.clearListeners()}});