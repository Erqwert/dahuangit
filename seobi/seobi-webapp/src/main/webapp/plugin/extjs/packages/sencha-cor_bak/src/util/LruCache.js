Ext.define("Ext.util.LruCache",{extend:"Ext.util.HashMap",config:{maxSize:null},add:function(A,E){var C=this,D=C.findKey(E),B;if(D){C.unlinkEntry(B=C.map[D]);B.prev=C.last;B.next=null}else{B={prev:C.last,next:null,key:A,value:E}}if(C.last){C.last.next=B}else{C.first=B}C.last=B;C.callParent([A,B]);C.prune();return E},insertBefore:function(A,F,C){var D=this,E,B;if(C=this.map[this.findKey(C)]){E=D.findKey(F);if(E){D.unlinkEntry(B=D.map[E])}else{B={prev:C.prev,next:C,key:A,value:F}}if(C.prev){B.prev.next=B}else{D.first=B}B.next=C;C.prev=B;D.prune();return F}else{return D.add(A,F)}},get:function(A){var B=this.map[A];if(B){if(B.next){this.moveToEnd(B)}return B.value}},removeAtKey:function(A){this.unlinkEntry(this.map[A]);return this.callParent(arguments)},clear:function(A){this.first=this.last=null;return this.callParent(arguments)},unlinkEntry:function(A){if(A){if(A.next){A.next.prev=A.prev}else{this.last=A.prev}if(A.prev){A.prev.next=A.next}else{this.first=A.next}A.prev=A.next=null}},moveToEnd:function(A){this.unlinkEntry(A);if(A.prev=this.last){this.last.next=A}else{this.first=A}this.last=A},getArray:function(C){var B=[],A=this.first;while(A){B.push(C?A.key:A.value);A=A.next}return B},each:function(C,E,B){var D=this,F=B?D.last:D.first,A=D.length;E=E||D;while(F){if(C.call(E,F.key,F.value,A)===false){break}F=B?F.prev:F.next}return D},findKey:function(C){var A,B=this.map;for(A in B){if(B.hasOwnProperty(A)&&B[A].value===C){return A}}return undefined},clone:function(){var C=new this.self(this.initialConfig),B=this.map,A;C.suspendEvents();for(A in B){if(B.hasOwnProperty(A)){C.add(A,B[A].value)}}C.resumeEvents();return C},prune:function(){var B=this,C=B.getMaxSize(),A=C?(B.length-C):0;if(A>0){for(;B.first&&A;A--){B.removeAtKey(B.first.key)}}}});