Ext.define("Ext.data.schema.Namer",{mixins:["Ext.mixin.Factoryable"],requires:["Ext.util.Inflector"],alias:"namer.default",isNamer:true,capitalize:function(A){return Ext.String.capitalize(A)},fieldRole:function(B){var A=B.match(this.endsWithIdRe,"");if(A){B=B.substr(0,B.length-(A[1]||A[2]).length)}return this.apply("uncapitalize",B)},idField:function(A){return this.apply("uncapitalize,singularize",A)+"Id"},multiRole:function(A){return this.apply("undotted,uncapitalize,pluralize",A)},pluralize:function(A){return Ext.util.Inflector.pluralize(A)},readerRoot:function(A){return this.apply("uncapitalize",A)},singularize:function(A){return Ext.util.Inflector.singularize(A)},storeName:function(A){return this.apply("underscore",A)},uncapitalize:function(A){return Ext.String.uncapitalize(A)},underscore:function(A){return"_"+A},uniRole:function(A){return this.apply("undotted,uncapitalize,singularize",A)},undotted:function(B){if(B.indexOf(".")<0){return B}var A=B.split("."),C=A.length;while(C-->1){A[C]=this.apply("capitalize",A[C])}return A.join("")},getterName:function(A){var B=A.role;if(A&&A.isMany){return B}return"get"+this.apply("capitalize",B)},inverseFieldRole:function(A,B,D,F){var H=this,C=H.apply(B?"uniRole":"multiRole",A),E=H.apply("pluralize",D),G=H.apply("undotted,pluralize",F);if(E.toLowerCase()!==G.toLowerCase()){C=D+H.apply("capitalize",C)}return C},manyToMany:function(C,A,D){var B=this,E=B.apply("undotted,capitalize,singularize",A)+B.apply("undotted,capitalize,pluralize",D);if(C){E=B.apply("capitalize",C+E)}return E},manyToOne:function(A,B,D,C){return this.apply("capitalize,singularize",D)+this.apply("capitalize",B)},matrixRole:function(B,A){var C=this.apply(B?"multiRole,capitalize":"multiRole",A);return B?B+C:C},oneToOne:function(A,B,D,C){return this.apply("undotted,capitalize,singularize",D)+this.apply("capitalize",B)},setterName:function(A){return"set"+this.apply("capitalize",A.role)},endsWithIdRe:/(?:(_id)|[^A-Z](Id))$/,cache:{},apply:function(E,A){var G=this,I=G.cache,B=I[A]||(I[A]={}),H=B[E],F,C,D;if(!H){if(E.indexOf(",")<0){H=G[E](A)}else{C=(D=E.split(",")).length;H=A;for(F=0;F<C;++F){H=G.apply(D[F],H)}}B[E]=H}return H}});