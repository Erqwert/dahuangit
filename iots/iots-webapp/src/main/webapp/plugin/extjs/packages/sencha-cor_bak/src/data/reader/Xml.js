Ext.define("Ext.data.reader.Xml",{extend:"Ext.data.reader.Reader",requires:["Ext.dom.Query"],alternateClassName:"Ext.data.XmlReader",alias:"reader.xml",config:{record:"",namespace:""},createAccessor:function(A){var B=this;if(Ext.isEmpty(A)){return Ext.emptyFn}if(Ext.isFunction(A)){return A}return function(C){return B.getNodeValue(Ext.DomQuery.selectNode(A,C))}},getNodeValue:function(A){if(A){if(typeof A.normalize==="function"){A.normalize()}A=A.firstChild;if(A){return A.nodeValue}}return undefined},getResponseData:function(C){var A=C.responseXML,B="XML data not found in the response";if(!A){Ext.Logger.warn(B);return this.createReadError(B)}return A},getData:function(A){return A.documentElement||A},getRoot:function(C){var B=C.nodeName,A=this.getRootProperty();if(!A||(B&&B==A)){return C}else{if(Ext.DomQuery.isXml(C)){return Ext.DomQuery.selectNode(A,C)}}},extractData:function(A,B){var C=this.getRecord();if(!C){Ext.Error.raise("Record is a required parameter")}if(C!==A.nodeName){A=Ext.DomQuery.select(C,A)}else{A=[A]}return this.callParent([A,B])},readRecords:function(B,A){if(Ext.isArray(B)){B=B[0]}this.xmlData=B;return this.callParent([B,A])},createFieldAccessor:function(E){var D=this,A=D.getNamespace(),C,B;C=E.mapping||((A?A+"|":"")+E.name);if(typeof C==="function"){B=function(F){return E.mapping(F,D)}}else{B=function(F){return D.getNodeValue(Ext.DomQuery.selectNode(C,F))}}return B}});