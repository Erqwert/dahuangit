Ext.define("Ext.util.SizeMonitor",{requires:["Ext.util.sizemonitor.Default","Ext.util.sizemonitor.Scroll","Ext.util.sizemonitor.OverflowChange"],constructor:function(B){var A=Ext.util.sizemonitor;if(Ext.browser.is.Firefox){return new A.OverflowChange(B)}else{if(Ext.browser.is.WebKit){if(!Ext.browser.is.Silk&&Ext.browser.engineVersion.gtEq("535")){return new A.OverflowChange(B)}else{return new A.Scroll(B)}}else{if(Ext.browser.is.IE11){return new A.Scroll(B)}else{return new A.Default(B)}}}}});