Ext.define("Ext.util.Format",function(){var A;return{requires:["Ext.Error","Ext.Number","Ext.String","Ext.Date"],singleton:true,defaultDateFormat:"m/d/Y",thousandSeparator:",",decimalSeparator:".",currencyPrecision:2,currencySign:"$",percentSign:"%",currencyAtEnd:false,stripTagsRe:/<\/?[^>]+>/gi,stripScriptsRe:/(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig,nl2brRe:/\r?\n/g,hashRe:/#+$/,allHashes:/^#+$/,formatPattern:/[\d,\.#]+/,formatCleanRe:/[^\d\.#]/g,I18NFormatCleanRe:null,formatFns:{},constructor:function(){A=this},undef:function(B){return B!==undefined?B:""},defaultValue:function(C,B){return C!==undefined&&C!==""?C:B},substr:"ab".substr(-1)!="b"?function(D,E,B){var C=String(D);return(E<0)?C.substr(Math.max(C.length+E,0),B):C.substr(E,B)}:function(C,D,B){return String(C).substr(D,B)},lowercase:function(B){return String(B).toLowerCase()},uppercase:function(B){return String(B).toUpperCase()},usMoney:function(B){return A.currency(B,"$",2)},currency:function(F,B,E,G){var H="",D=",0",C=0;F=F-0;if(F<0){F=-F;H="-"}E=Ext.isDefined(E)?E:A.currencyPrecision;D+=(E>0?".":"");for(;C<E;C++){D+="0"}F=A.number(F,D);if((G||A.currencyAtEnd)===true){return Ext.String.format("{0}{1}{2}",H,F,B||A.currencySign)}else{return Ext.String.format("{0}{1}{2}",H,B||A.currencySign,F)}},date:function(C,B){if(!C){return""}if(!Ext.isDate(C)){C=new Date(Date.parse(C))}return Ext.Date.dateFormat(C,B||Ext.Date.defaultFormat)},dateRenderer:function(B){return function(C){return A.date(C,B)}},hex:function(D,B){var C=parseInt(D||0,10).toString(16);if(B){if(B<0){B=-B;if(C.length>B){C=C.substring(C.length-B)}}while(C.length<B){C="0"+C}}return C},or:function(C,B){return C||B},pick:function(D,C,B){if(Ext.isNumber(D)){var E=arguments[D+1];if(E){return E}}return D?B:C},stripTags:function(B){return !B?B:String(B).replace(A.stripTagsRe,"")},stripScripts:function(B){return !B?B:String(B).replace(A.stripScriptsRe,"")},fileSize:(function(){var B=1024,C=1048576,D=1073741824;return function(E){var F;if(E<B){if(E===1){F="1 byte"}else{F=E+" bytes"}}else{if(E<C){F=(Math.round(((E*10)/B))/10)+" KB"}else{if(E<D){F=(Math.round(((E*10)/C))/10)+" MB"}else{F=(Math.round(((E*10)/D))/10)+" GB"}}}return F}})(),math:(function(){var B={};return function(C,D){if(!B[D]){B[D]=Ext.functionFactory("v","return v "+D+";")}return B[D](C)}}()),round:function(D,C){var B=Number(D);if(typeof C==="number"){C=Math.pow(10,C);B=Math.round(D*C)/C}else{if(C===undefined){B=Math.round(B)}}return B},number:function(E,L){if(!L){return E}if(isNaN(E)){return""}var B=A.formatFns[L];if(!B){var N=L,O=A.thousandSeparator,G=A.decimalSeparator,D=0,I="",K,H,F,M,J,C;if(L.substr(L.length-2)==="/i"){if(!A.I18NFormatCleanRe||A.lastDecimalSeparator!==G){A.I18NFormatCleanRe=new RegExp("[^\\d\\"+G+"]","g");A.lastDecimalSeparator=G}L=L.substr(0,L.length-2);K=L.indexOf(O)!==-1;H=L.replace(A.I18NFormatCleanRe,"").split(G)}else{K=L.indexOf(",")!==-1;H=L.replace(A.formatCleanRe,"").split(".")}F=L.replace(A.formatPattern,"");if(H.length>2){Ext.Error.raise({sourceClass:"Ext.util.Format",sourceMethod:"number",value:E,formatString:L,msg:"Invalid number format, should have no more than 1 decimal"})}else{if(H.length===2){D=H[1].length;M=H[1].match(A.hashRe);if(M){C=M[0].length;I='trailingZeroes=new RegExp(Ext.String.escapeRegex(utilFormat.decimalSeparator) + "*0{0,'+C+'}$")'}}}J=["var utilFormat=Ext.util.Format,extNumber=Ext.Number,neg,absVal,fnum,parts"+(K?",thousandSeparator,thousands=[],j,n,i":"")+(F?',formatString="'+L+'",formatPattern=/[\\d,\\.#]+/':"")+',trailingZeroes;return function(v){if(typeof v!=="number"&&isNaN(v=extNumber.from(v,NaN)))return"";neg=v<0;',"absVal=Math.abs(v);","fnum=Ext.Number.toFixed(absVal, "+D+");",I,";"];if(K){if(D){J[J.length]='parts=fnum.split(".");';J[J.length]="fnum=parts[0];"}J[J.length]="if(absVal>=1000) {";J[J.length]="thousandSeparator=utilFormat.thousandSeparator;thousands.length=0;j=fnum.length;n=fnum.length%3||3;for(i=0;i<j;i+=n){if(i!==0){n=3;}thousands[thousands.length]=fnum.substr(i,n);}fnum=thousands.join(thousandSeparator);}";if(D){J[J.length]="fnum += utilFormat.decimalSeparator+parts[1];"}}else{if(D){J[J.length]='if(utilFormat.decimalSeparator!=="."){parts=fnum.split(".");fnum=parts[0]+utilFormat.decimalSeparator+parts[1];}'}}if(M){J[J.length]='fnum=fnum.replace(trailingZeroes,"");'}J[J.length]='if(neg&&fnum!=="'+(D?"0."+Ext.String.repeat("0",D):"0")+'")fnum="-"+fnum;';J[J.length]="return ";if(F){J[J.length]="formatString.replace(formatPattern, fnum);"}else{J[J.length]="fnum;"}J[J.length]="};";B=A.formatFns[N]=Ext.functionFactory("Ext",J.join(""))(Ext)}return B(E)},numberRenderer:function(B){return function(C){return A.number(C,B)}},percent:function(B,C){return A.number(B*100,C||"0")+A.percentSign},attributes:function(B){if(typeof B==="object"){var D=[],C;for(C in B){if(B.hasOwnProperty(C)){D.push(C,'="',C==="style"?Ext.DomHelper.generateStyles(B[C],null,true):Ext.htmlEncode(B[C]),'" ')}}B=D.join("")}return B||""},plural:function(D,B,C){return D+" "+(D===1?B:(C?C:B+"s"))},nl2br:function(B){return Ext.isEmpty(B)?"":B.replace(A.nl2brRe,"<br/>")},capitalize:Ext.String.capitalize,uncapitalize:Ext.String.uncapitalize,ellipsis:Ext.String.ellipsis,escape:Ext.String.escape,escapeRegex:Ext.String.escapeRegex,format:Ext.String.format,htmlDecode:Ext.String.htmlDecode,htmlEncode:Ext.String.htmlEncode,leftPad:Ext.String.leftPad,toggle:Ext.String.toggle,trim:Ext.String.trim,parseBox:function(C){C=C||0;if(typeof C==="number"){return{top:C,right:C,bottom:C,left:C}}var B=C.split(" "),D=B.length;if(D===1){B[1]=B[2]=B[3]=B[0]}else{if(D===2){B[2]=B[0];B[3]=B[1]}else{if(D===3){B[3]=B[1]}}}return{top:parseInt(B[0],10)||0,right:parseInt(B[1],10)||0,bottom:parseInt(B[2],10)||0,left:parseInt(B[3],10)||0}}}});