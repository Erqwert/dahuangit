Ext.define("Ext.button.Manager",{singleton:true,alternateClassName:"Ext.ButtonToggleManager",groups:{},pressedButton:null,buttonSelector:"."+Ext.baseCSSPrefix+"btn",init:function(){var A=this;if(!A.initialized){Ext.getDoc().on({keydown:A.onDocumentKeyDown,mouseup:A.onDocumentMouseUp,scope:A});A.initialized=true}},onDocumentKeyDown:function(A){var C=A.getKey(),B;if(C===A.SPACE||C===A.ENTER){B=A.getTarget(this.buttonSelector);if(B){Ext.getCmp(B.id).onClick(A)}}},onButtonMousedown:function(B,C){var A=this.pressedButton;if(A){A.onMouseUp(C)}this.pressedButton=B},onDocumentMouseUp:function(B){var A=this.pressedButton;if(A){A.onMouseUp(B);this.pressedButton=null}},toggleGroup:function(D,E){if(E){var A=this.groups[D.toggleGroup],B=A.length,C;for(C=0;C<B;C++){if(A[C]!==D){A[C].toggle(false)}}}},register:function(D){var C=this,B=this.groups,A=B[D.toggleGroup];C.init();if(!D.toggleGroup){return}if(!A){A=B[D.toggleGroup]=[]}A.push(D);D.on("toggle",C.toggleGroup,C)},unregister:function(C){if(!C.toggleGroup){return}var B=this,A=B.groups[C.toggleGroup];if(A){Ext.Array.remove(A,C);C.un("toggle",B.toggleGroup,B)}},getPressed:function(A){var B=this.groups[A],C=0,D;if(B){for(D=B.length;C<D;C++){if(B[C].pressed===true){return B[C]}}}return null}});