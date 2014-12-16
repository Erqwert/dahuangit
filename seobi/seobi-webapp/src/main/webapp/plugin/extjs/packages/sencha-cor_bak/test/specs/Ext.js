describe("Ext",function(){describe("Ext.global",function(){it("should return the global scope",function(){expect(Ext.global).toBe((function(){return this}).call())})});describe("Ext.apply",function(){var B,A;beforeEach(function(){B={name:"value",something:"cool",items:[1,2,3],method:function(){this.myMethodCalled=true},toString:function(){this.myToStringCalled=true}}});it("should copy normal properties",function(){Ext.apply(B,{name:"newName",items:[4,5,6],otherThing:"not cool",isCool:false});expect(B.name).toEqual("newName");expect(B.items).toEqual([4,5,6]);expect(B.something).toEqual("cool");expect(B.otherThing).toEqual("not cool");expect(B.isCool).toEqual(false)});it("should copy functions",function(){Ext.apply(B,{method:function(){this.newMethodCalled=true}});B.method();expect(B.myMethodCalled).not.toBeDefined();expect(B.newMethodCalled).toBeTruthy()});it("should copy non-enumerables",function(){Ext.apply(B,{toString:function(){this.newToStringCalled=true}});B.toString();expect(B.myToStringCalled).not.toBeDefined();expect(B.newToStringCalled).toBeTruthy()});it("should apply properties and return an object",function(){A=Ext.apply({},{foo:1,bar:2});expect(A).toEqual({foo:1,bar:2})});it("should change the reference of the object",function(){A={};Ext.apply(A,{opt1:"x",opt2:"y"});expect(A).toEqual({opt1:"x",opt2:"y"})});it("should overwrite properties",function(){A=Ext.apply({foo:1,baz:4},{foo:2,bar:3});expect(A).toEqual({foo:2,bar:3,baz:4})});it("should use default",function(){A={};Ext.apply(A,{foo:"new",exist:true},{foo:"old",def:true});expect(A).toEqual({foo:"new",def:true,exist:true})});it("should override all defaults",function(){A=Ext.apply({},{foo:"foo",bar:"bar"},{foo:"oldFoo",bar:"oldBar"});expect(A).toEqual({foo:"foo",bar:"bar"})});it("should return null if null is passed as first argument",function(){expect(Ext.apply(null,{})).toBeNull()});it("should return the object if second argument is not defined",function(){A={foo:1};expect(Ext.apply(A)).toEqual(A)});it("should override valueOf",function(){A=Ext.apply({},{valueOf:1});expect(A.valueOf).toEqual(1)});it("should override toString",function(){A=Ext.apply({},{toString:3});expect(A.toString).toEqual(3)})});describe("Ext.emptyFn",function(){it("should return undefined without params",function(){expect(Ext.emptyFn()).toBeUndefined()});it("should return undefined if you pass params",function(){expect(Ext.emptyFn("aaaa","bbbbb")).toBeUndefined()})});describe("Ext.iterate",function(){var A;beforeEach(function(){A=jasmine.createSpy()});describe("iterate object",function(){var B;beforeEach(function(){B={n1:11,n2:13,n3:18}});describe("if itFn does not return false",function(){beforeEach(function(){Ext.iterate(B,A)});it("should call the iterate function 3 times",function(){expect(A.callCount).toEqual(3)});it("should call the iterate function with correct arguments",function(){expect(A.calls[0].args).toEqual(["n1",11,B]);expect(A.calls[1].args).toEqual(["n2",13,B]);expect(A.calls[2].args).toEqual(["n3",18,B])})});describe("if itFn return false",function(){beforeEach(function(){A.andReturn(false);Ext.iterate(B,A)});it("should stop iteration if function return false",function(){A.andReturn(false);expect(A.calls.length).toEqual(1)})})});describe("do nothing on an empty object",function(){var B;beforeEach(function(){B={};Ext.iterate(B,A)});it("should not call the iterate function",function(){expect(A).not.toHaveBeenCalled()})});describe("iterate array",function(){var B;beforeEach(function(){B=[6,7,8,9]});describe("if itFn does not return false",function(){beforeEach(function(){Ext.iterate(B,A)});it("should call the iterate function 4 times",function(){expect(A.callCount).toEqual(4)});it("should call the iterate function with correct arguments",function(){expect(A.calls[0].args).toEqual([6,0,B]);expect(A.calls[1].args).toEqual([7,1,B]);expect(A.calls[2].args).toEqual([8,2,B]);expect(A.calls[3].args).toEqual([9,3,B])})});describe("if itFn return false",function(){beforeEach(function(){A.andReturn(false);Ext.iterate(B,A)});it("should stop iteration if function return false",function(){A.andReturn(false);expect(A.calls.length).toEqual(1)})})});describe("do nothing on an empty array",function(){var B;beforeEach(function(){B=[];Ext.iterate(B,A)});it("should not call the iterate function",function(){expect(A).not.toHaveBeenCalled()})})});describe("Ext.applyIf",function(){var A;it("should apply properties and return an object with an empty destination object",function(){A=Ext.applyIf({},{foo:"foo",bar:"bar"});expect(A).toEqual({foo:"foo",bar:"bar"})});it("should not override default properties",function(){A=Ext.applyIf({foo:"foo"},{foo:"oldFoo"});expect(A).toEqual({foo:"foo"})});it("should not override default properties with mixing properties",function(){A=Ext.applyIf({foo:1,bar:2},{bar:3,baz:4});expect(A).toEqual({foo:1,bar:2,baz:4})});it("should change the reference of the object",function(){A={};Ext.applyIf(A,{foo:2},{foo:1});expect(A).toEqual({foo:2})});it("should return null if null is passed as first argument",function(){expect(Ext.applyIf(null,{})).toBeNull()});it("should return the object if second argument is no defined",function(){A={foo:1};expect(Ext.applyIf(A)).toEqual(A)})});describe("Ext.extend",function(){describe("class creation",function(){var A,C,B;C=Ext.extend(Object,{constructor:function(D){Ext.apply(this,D);this.foobar=false}});A=Ext.extend(C,{constructor:function(){A.superclass.constructor.apply(this,arguments);this.foobar=true}});B=new A({sencha:"isAwesome"});it("should throw an error if superclass isn't defined",function(){expect(function(){Ext.extend(undefined,{})}).toThrow("Attempting to extend from a class which has not been loaded on the page.")});it("should create a superclass that refers to its (usually unreachable) parent prototype",function(){expect(B.superclass).toEqual(C.prototype)});it("should add override method",function(){expect(typeof B.override==="function").toBe(true)});it("should override redefined methods",function(){expect(B.foobar).toBe(true)});it("should keep new properties",function(){expect(B.sencha).toEqual("isAwesome")})});describe("constructors",function(){var J=function(){J.superclass.constructor.call(this);this.data="a"};Ext.extend(J,Object,{});var H=function(){H.superclass.constructor.call(this);this.data+="b"};Ext.extend(H,J,{});var I=Ext.extend(H,{constructor:function(){I.superclass.constructor.call(this);this.data+="c"}});var F=Ext.extend(I,{constructor:function(){F.superclass.constructor.call(this);this.data+="d"}});var G=function(){G.superclass.constructor.call(this);this.data+="e"};Ext.extend(G,F,{});it("should call each constructor ",function(){var A=new G();expect(A.data).toBe("abcde")});it("should correctly set the constructor",function(){expect(G.superclass.constructor).toEqual(F.prototype.constructor);expect(F.superclass.constructor).toEqual(I.prototype.constructor);expect(I.superclass.constructor).toEqual(H);expect(H.superclass.constructor).toEqual(J)})});describe("derive from Ext.define'd base",function(){var J=Ext.define(null,{constructor:function(){this.data="a"}});var H=function(){H.superclass.constructor.call(this);this.data+="b"};Ext.extend(H,J,{});var I=Ext.extend(H,{constructor:function(){I.superclass.constructor.call(this);this.data+="c"}});var F=Ext.extend(I,{constructor:function(){F.superclass.constructor.call(this);this.data+="d"}});var G=function(){G.superclass.constructor.call(this);this.data+="e"};Ext.extend(G,F,{});it("should call each constructor ",function(){var A=new G();expect(A.data).toBe("abcde")});it("should correctly set the constructor",function(){expect(G.superclass.constructor).toEqual(F.prototype.constructor);expect(F.superclass.constructor).toEqual(I.prototype.constructor);expect(I.superclass.constructor).toEqual(H);expect(H.superclass.constructor).toEqual(J.prototype.constructor)})})});describe("Ext.override",function(){var A,B;beforeEach(function(){A=function(){};B=spyOn(Ext,"apply")});it("should apply override",function(){var C={foo:true};Ext.override(A,C);expect(B).toHaveBeenCalledWith(A.prototype,C)})});describe("Ext.valueFrom",function(){var B,A;describe("with allowBlank",function(){describe("and an empty string",function(){it("should return the value",function(){expect(Ext.valueFrom("","aaa",true)).toBe("")})});describe("and a string",function(){it("should return the value",function(){expect(Ext.valueFrom("bbb","aaa",true)).toBe("bbb")})});describe("and an undefined value",function(){it("should return the default value",function(){expect(Ext.valueFrom(undefined,"aaa",true)).toBe("aaa")})});describe("and a null value",function(){it("should return the default value",function(){expect(Ext.valueFrom(null,"aaa",true)).toBe("aaa")})});describe("and a 0 value",function(){it("should return the value",function(){expect(Ext.valueFrom(0,"aaa",true)).toBe(0)})})});describe("without allowBlank",function(){describe("and an empty string",function(){it("should return the default value",function(){expect(Ext.valueFrom("","aaa")).toBe("aaa")})});describe("and a string",function(){it("should return the value",function(){expect(Ext.valueFrom("bbb","aaa")).toBe("bbb")})});describe("and an undefined value",function(){it("should return the default value",function(){expect(Ext.valueFrom(undefined,"aaa")).toBe("aaa")})});describe("and a null value",function(){it("should return the default value",function(){expect(Ext.valueFrom(null,"aaa")).toBe("aaa")})});describe("and a 0 value",function(){it("should return the value",function(){expect(Ext.valueFrom(0,"aaa")).toBe(0)})})})});describe("Ext.typeOf",function(){it("should return null",function(){expect(Ext.typeOf(null)).toEqual("null")});it("should return undefined",function(){expect(Ext.typeOf(undefined)).toEqual("undefined");expect(Ext.typeOf(window.someWeirdPropertyThatDoesntExist)).toEqual("undefined")});it("should return string",function(){expect(Ext.typeOf("")).toEqual("string");expect(Ext.typeOf("something")).toEqual("string");expect(Ext.typeOf("1.2")).toEqual("string")});it("should return number",function(){expect(Ext.typeOf(1)).toEqual("number");expect(Ext.typeOf(1.2)).toEqual("number");expect(Ext.typeOf(new Number(1.2))).toEqual("number")});it("should return boolean",function(){expect(Ext.typeOf(true)).toEqual("boolean");expect(Ext.typeOf(false)).toEqual("boolean");expect(Ext.typeOf(new Boolean(true))).toEqual("boolean")});it("should return array",function(){expect(Ext.typeOf([1,2,3])).toEqual("array");expect(Ext.typeOf(new Array(1,2,3))).toEqual("array")});it("should return function",function(){expect(Ext.typeOf(function(){})).toEqual("function");expect(Ext.typeOf(new Function())).toEqual("function");expect(Ext.typeOf(Object)).toEqual("function");expect(Ext.typeOf(Array)).toEqual("function");expect(Ext.typeOf(Number)).toEqual("function");expect(Ext.typeOf(Function)).toEqual("function");expect(Ext.typeOf(Boolean)).toEqual("function");expect(Ext.typeOf(String)).toEqual("function");expect(Ext.typeOf(Date)).toEqual("function");expect(Ext.typeOf(Ext.typeOf)).toEqual("function")});it("should return regexp",function(){expect(Ext.typeOf(/test/)).toEqual("regexp");expect(Ext.typeOf(new RegExp("test"))).toEqual("regexp")});it("should return date",function(){expect(Ext.typeOf(new Date())).toEqual("date")});it("should return textnode",function(){expect(Ext.typeOf(document.createTextNode("tada"))).toEqual("textnode");expect(Ext.typeOf(document.createTextNode(" "))).toEqual("whitespace");expect(Ext.typeOf(document.createTextNode("         "))).toEqual("whitespace")});it("should return element",function(){expect(Ext.typeOf(document.getElementsByTagName("body")[0])).toEqual("element");expect(Ext.typeOf(document.createElement("button"))).toEqual("element");expect(Ext.typeOf(new Image())).toEqual("element")});it("should return object",function(){expect(Ext.typeOf({some:"stuff"})).toEqual("object");expect(Ext.typeOf(new Object())).toEqual("object");expect(Ext.typeOf(window)).toEqual("object")})});describe("Ext.isIterable",function(){var C=function(){},A=function(){},B=function(){};C.prototype.length=1;A.prototype.item=function(){};B.prototype.length=1;B.prototype.item=function(){};it("should return true with an arguments object",function(){expect(Ext.isIterable(arguments)).toBe(true)});it("should return true with empty array",function(){expect(Ext.isIterable([])).toBe(true)});it("should return true with filled array",function(){expect(Ext.isIterable([1,2,3,4])).toBe(true)});it("should return false with boolean true",function(){expect(Ext.isIterable(true)).toBe(false)});it("should return false with boolean false",function(){expect(Ext.isIterable(false)).toBe(false)});it("should return false with string",function(){expect(Ext.isIterable("foo")).toBe(false)});it("should return false with empty string",function(){expect(Ext.isIterable("")).toBe(false)});it("should return false with number",function(){expect(Ext.isIterable(1)).toBe(false)});it("should return false with null",function(){expect(Ext.isIterable(null)).toBe(false)});it("should return false with undefined",function(){expect(Ext.isIterable(undefined)).toBe(false)});it("should return false with date",function(){expect(Ext.isIterable(new Date())).toBe(false)});it("should return false with empty object",function(){expect(Ext.isIterable({})).toBe(false)});it("should return true with node list",function(){expect(Ext.isIterable(document.getElementsByTagName("body"))).toBe(true)});it("should return true with html collection",function(){expect(Ext.isIterable(document.images)).toBe(true)});it("should return false for a function",function(){expect(Ext.isIterable(function(){})).toBe(false)});it("should return false for objects with a length property",function(){expect(Ext.isIterable({length:1})).toBe(false)});it("should return false for objects with an item property",function(){expect(Ext.isIterable({item:function(){}})).toBe(false)});it("should return false for objects with a length prototype property",function(){expect(Ext.isIterable(new C())).toBe(false)});it("should return false for objects with an item prototype property",function(){expect(Ext.isIterable(new A())).toBe(false)});it("should return false for objects with item and length prototype properties",function(){expect(Ext.isIterable(new B())).toBe(false)});it("should return true for arguments object",function(){expect(Ext.isIterable(arguments)).toBe(true)});describe("stylesheets",function(){var D;beforeEach(function(){D=document.createElement("style");document.body.appendChild(D)});afterEach(function(){document.body.removeChild(D)});it("should return true for StyleSheetList",function(){expect(Ext.isIterable(document.styleSheets)).toBe(true)});it("should return true for CSSRuleList",function(){expect(Ext.isIterable(document.styleSheets[0].cssRules||document.styleSheets[0].rules)).toBe(true)})})});describe("Ext.isArray",function(){it("should return true with empty array",function(){expect(Ext.isArray([])).toBe(true)});it("should return true with filled array",function(){expect(Ext.isArray([1,2,3,4])).toBe(true)});it("should return false with boolean true",function(){expect(Ext.isArray(true)).toBe(false)});it("should return false with boolean false",function(){expect(Ext.isArray(false)).toBe(false)});it("should return false with string",function(){expect(Ext.isArray("foo")).toBe(false)});it("should return false with empty string",function(){expect(Ext.isArray("")).toBe(false)});it("should return false with number",function(){expect(Ext.isArray(1)).toBe(false)});it("should return false with null",function(){expect(Ext.isArray(null)).toBe(false)});it("should return false with undefined",function(){expect(Ext.isArray(undefined)).toBe(false)});it("should return false with date",function(){expect(Ext.isArray(new Date())).toBe(false)});it("should return false with empty object",function(){expect(Ext.isArray({})).toBe(false)});it("should return false with node list",function(){expect(Ext.isArray(document.getElementsByTagName("body"))).toBe(false)});it("should return false with custom class that has a length property",function(){var A=Ext.extend(Object,{length:1});expect(Ext.isArray(new A())).toBe(false)});it("should return false with element",function(){expect(Ext.isArray(document.body)).toBe(false)})});describe("Ext.isBoolean",function(){it("should return false with empty array",function(){expect(Ext.isBoolean([])).toBe(false)});it("should return false with filled array",function(){expect(Ext.isBoolean([1,2,3,4])).toBe(false)});it("should return true with boolean true",function(){expect(Ext.isBoolean(true)).toBe(true)});it("should return true with boolean false",function(){expect(Ext.isBoolean(false)).toBe(true)});it("should return false with string",function(){expect(Ext.isBoolean("foo")).toBe(false)});it("should return false with empty string",function(){expect(Ext.isBoolean("")).toBe(false)});it("should return false with number",function(){expect(Ext.isBoolean(1)).toBe(false)});it("should return false with null",function(){expect(Ext.isBoolean(null)).toBe(false)});it("should return false with undefined",function(){expect(Ext.isBoolean(undefined)).toBe(false)});it("should return false with date",function(){expect(Ext.isBoolean(new Date())).toBe(false)});it("should return false with empty object",function(){expect(Ext.isBoolean({})).toBe(false)});it("should return false with node list",function(){expect(Ext.isBoolean(document.getElementsByTagName("body"))).toBe(false)});it("should return false with element",function(){expect(Ext.isArray(document.body)).toBe(false)})});describe("Ext.isDate",function(){it("should return false with empty array",function(){expect(Ext.isDate([])).toBe(false)});it("should return false with filled array",function(){expect(Ext.isDate([1,2,3,4])).toBe(false)});it("should return false with boolean true",function(){expect(Ext.isDate(true)).toBe(false)});it("should return false with boolean false",function(){expect(Ext.isDate(false)).toBe(false)});it("should return false with string",function(){expect(Ext.isDate("foo")).toBe(false)});it("should return false with empty string",function(){expect(Ext.isDate("")).toBe(false)});it("should return false with number",function(){expect(Ext.isDate(1)).toBe(false)});it("should return false with null",function(){expect(Ext.isDate(null)).toBe(false)});it("should return false with undefined",function(){expect(Ext.isDate(undefined)).toBe(false)});it("should return true with date",function(){expect(Ext.isDate(new Date())).toBe(true)});it("should return false with empty object",function(){expect(Ext.isDate({})).toBe(false)});it("should return false with node list",function(){expect(Ext.isDate(document.getElementsByTagName("body"))).toBe(false)});it("should return false with element",function(){expect(Ext.isDate(document.body)).toBe(false)})});describe("Ext.isDefined",function(){it("should return true with empty array",function(){expect(Ext.isDefined([])).toBe(true)});it("should return true with filled array",function(){expect(Ext.isDefined([1,2,3,4])).toBe(true)});it("should return true with boolean true",function(){expect(Ext.isDefined(true)).toBe(true)});it("should return true with boolean false",function(){expect(Ext.isDefined(false)).toBe(true)});it("should return true with string",function(){expect(Ext.isDefined("foo")).toBe(true)});it("should return true with empty string",function(){expect(Ext.isDefined("")).toBe(true)});it("should return true with number",function(){expect(Ext.isDefined(1)).toBe(true)});it("should return true with null",function(){expect(Ext.isDefined(null)).toBe(true)});it("should return false with undefined",function(){expect(Ext.isDefined(undefined)).toBe(false)});it("should return true with date",function(){expect(Ext.isDefined(new Date())).toBe(true)});it("should return true with empty object",function(){expect(Ext.isDefined({})).toBe(true)});it("should return true with node list",function(){expect(Ext.isDefined(document.getElementsByTagName("body"))).toBe(true)});it("should return true with element",function(){expect(Ext.isDefined(document.body)).toBe(true)})});describe("Ext.isElement",function(){it("should return false with empty array",function(){expect(Ext.isElement([])).toBe(false)});it("should return false with filled array",function(){expect(Ext.isElement([1,2,3,4])).toBe(false)});it("should return false with boolean true",function(){expect(Ext.isElement(true)).toBe(false)});it("should return false with boolean false",function(){expect(Ext.isElement(false)).toBe(false)});it("should return false with string",function(){expect(Ext.isElement("foo")).toBe(false)});it("should return false with empty string",function(){expect(Ext.isElement("")).toBe(false)});it("should return false with number",function(){expect(Ext.isElement(1)).toBe(false)});it("should return false with null",function(){expect(Ext.isElement(null)).toBe(false)});it("should return false with undefined",function(){expect(Ext.isElement(undefined)).toBe(false)});it("should return false with date",function(){expect(Ext.isElement(new Date())).toBe(false)});it("should return false with empty object",function(){expect(Ext.isElement({})).toBe(false)});it("should return false with node list",function(){expect(Ext.isElement(document.getElementsByTagName("body"))).toBe(false)});it("should return true with element",function(){expect(Ext.isElement(document.body)).toBe(true)});it("should return false with TextNode",function(){var A=document.createTextNode("foobar");document.body.appendChild(A);expect(Ext.isElement(A)).toBe(false);document.body.removeChild(A)})});describe("Ext.isEmpty",function(){it("should return true with empty array",function(){expect(Ext.isEmpty([])).toBe(true)});it("should return false with filled array",function(){expect(Ext.isEmpty([1,2,3,4])).toBe(false)});it("should return false with boolean true",function(){expect(Ext.isEmpty(true)).toBe(false)});it("should return false with boolean false",function(){expect(Ext.isEmpty(false)).toBe(false)});it("should return false with string",function(){expect(Ext.isEmpty("foo")).toBe(false)});it("should return true with empty string",function(){expect(Ext.isEmpty("")).toBe(true)});it("should return true with empty string with allowBlank",function(){expect(Ext.isEmpty("",true)).toBe(false)});it("should return false with number",function(){expect(Ext.isEmpty(1)).toBe(false)});it("should return true with null",function(){expect(Ext.isEmpty(null)).toBe(true)});it("should return true with undefined",function(){expect(Ext.isEmpty(undefined)).toBe(true)});it("should return false with date",function(){expect(Ext.isEmpty(new Date())).toBe(false)});it("should return false with empty object",function(){expect(Ext.isEmpty({})).toBe(false)})});describe("Ext.isFunction",function(){it("should return true with anonymous function",function(){expect(Ext.isFunction(function(){})).toBe(true)});it("should return true with new Function syntax",function(){expect(Ext.isFunction(Ext.functionFactory('return "";'))).toBe(true)});it("should return true with static function",function(){expect(Ext.isFunction(Ext.emptyFn)).toBe(true)});it("should return true with instance function",function(){var A=function(){},B;A.prototype.testMe=function(){};B=new A();expect(Ext.isFunction(B.testMe)).toBe(true)});it("should return true with function on object",function(){var A={fn:function(){}};expect(Ext.isFunction(A.fn)).toBe(true)});it("should return false with empty array",function(){expect(Ext.isFunction([])).toBe(false)});it("should return false with filled array",function(){expect(Ext.isFunction([1,2,3,4])).toBe(false)});it("should return false with boolean true",function(){expect(Ext.isFunction(true)).toBe(false)});it("should return false with boolean false",function(){expect(Ext.isFunction(false)).toBe(false)});it("should return false with string",function(){expect(Ext.isFunction("foo")).toBe(false)});it("should return false with empty string",function(){expect(Ext.isFunction("")).toBe(false)});it("should return false with number",function(){expect(Ext.isFunction(1)).toBe(false)});it("should return false with null",function(){expect(Ext.isFunction(null)).toBe(false)});it("should return false with undefined",function(){expect(Ext.isFunction(undefined)).toBe(false)});it("should return false with date",function(){expect(Ext.isFunction(new Date())).toBe(false)});it("should return false with empty object",function(){expect(Ext.isFunction({})).toBe(false)});it("should return false with node list",function(){expect(Ext.isFunction(document.getElementsByTagName("body"))).toBe(false)});it("should return true with a function from a document where Ext isn't loaded",function(){var A=document.createElement("iframe"),B,C;A.src="about:blank";document.body.appendChild(A);C=A.contentDocument?A.contentDocument:(A.contentWindow.document||A.document);B=A.contentWindow||A.window;C.open();C.write('<html><head><script type="text/javascript">function customFn() {}</script></head><body></body></html>');C.close();expect(Ext.isFunction(B.customFn)).toBe(true);document.body.removeChild(A);A=C=B=null})});describe("Ext.isNumber",function(){it("should return true with zero",function(){expect(Ext.isNumber(0)).toBe(true)});it("should return true with non zero",function(){expect(Ext.isNumber(4)).toBe(true)});it("should return true with negative integer",function(){expect(Ext.isNumber(-3)).toBe(true)});it("should return true with float",function(){expect(Ext.isNumber(1.75)).toBe(true)});it("should return true with negative float",function(){expect(Ext.isNumber(-4.75)).toBe(true)});it("should return true with Number.MAX_VALUE",function(){expect(Ext.isNumber(Number.MAX_VALUE)).toBe(true)});it("should return true with Number.MIN_VALUE",function(){expect(Ext.isNumber(Number.MIN_VALUE)).toBe(true)});it("should return true with Math.PI",function(){expect(Ext.isNumber(Math.PI)).toBe(true)});it("should return true with Number() contructor",function(){expect(Ext.isNumber(Number("3.1"))).toBe(true)});it("should return false with NaN",function(){expect(Ext.isNumber(Number.NaN)).toBe(false)});it("should return false with Number.POSITIVE_INFINITY",function(){expect(Ext.isNumber(Number.POSITIVE_INFINITY)).toBe(false)});it("should return false with Number.NEGATIVE_INFINITY",function(){expect(Ext.isNumber(Number.NEGATIVE_INFINITY)).toBe(false)});it("should return false with empty array",function(){expect(Ext.isNumber([])).toBe(false)});it("should return false with filled array",function(){expect(Ext.isNumber([1,2,3,4])).toBe(false)});it("should return false with boolean true",function(){expect(Ext.isNumber(true)).toBe(false)});it("should return false with boolean false",function(){expect(Ext.isNumber(false)).toBe(false)});it("should return false with string",function(){expect(Ext.isNumber("foo")).toBe(false)});it("should return false with empty string",function(){expect(Ext.isNumber("")).toBe(false)});it("should return false with string containing a number",function(){expect(Ext.isNumber("1.0")).toBe(false)});it("should return false with undefined",function(){expect(Ext.isNumber(undefined)).toBe(false)});it("should return false with date",function(){expect(Ext.isNumber(new Date())).toBe(false)});it("should return false with empty object",function(){expect(Ext.isNumber({})).toBe(false)});it("should return false with node list",function(){expect(Ext.isNumber(document.getElementsByTagName("body"))).toBe(false)})});describe("Ext.isNumeric",function(){it("should return true with zero",function(){expect(Ext.isNumeric(0)).toBe(true)});it("should return true with non zero",function(){expect(Ext.isNumeric(4)).toBe(true)});it("should return true with negative integer",function(){expect(Ext.isNumeric(-3)).toBe(true)});it("should return true with float",function(){expect(Ext.isNumeric(1.75)).toBe(true)});it("should return true with negative float",function(){expect(Ext.isNumeric(-4.75)).toBe(true)});it("should return true with Number.MAX_VALUE",function(){expect(Ext.isNumeric(Number.MAX_VALUE)).toBe(true)});it("should return true with Number.MIN_VALUE",function(){expect(Ext.isNumeric(Number.MIN_VALUE)).toBe(true)});it("should return true with Math.PI",function(){expect(Ext.isNumeric(Math.PI)).toBe(true)});it("should return true with Number() contructor",function(){expect(Ext.isNumeric(Number("3.1"))).toBe(true)});it("should return false with NaN",function(){expect(Ext.isNumeric(Number.NaN)).toBe(false)});it("should return false with Number.POSITIVE_INFINITY",function(){expect(Ext.isNumeric(Number.POSITIVE_INFINITY)).toBe(false)});it("should return false with Number.NEGATIVE_INFINITY",function(){expect(Ext.isNumeric(Number.NEGATIVE_INFINITY)).toBe(false)});it("should return false with empty array",function(){expect(Ext.isNumeric([])).toBe(false)});it("should return false with filled array",function(){expect(Ext.isNumeric([1,2,3,4])).toBe(false)});it("should return false with boolean true",function(){expect(Ext.isNumeric(true)).toBe(false)});it("should return false with boolean false",function(){expect(Ext.isNumeric(false)).toBe(false)});it("should return false with string",function(){expect(Ext.isNumeric("foo")).toBe(false)});it("should return false with empty string",function(){expect(Ext.isNumeric("")).toBe(false)});it("should return true with string containing a number",function(){expect(Ext.isNumeric("1.0")).toBe(true)});it("should return false with undefined",function(){expect(Ext.isNumeric(undefined)).toBe(false)});it("should return false with date",function(){expect(Ext.isNumeric(new Date())).toBe(false)});it("should return false with empty object",function(){expect(Ext.isNumeric({})).toBe(false)});it("should return false with node list",function(){expect(Ext.isNumeric(document.getElementsByTagName("body"))).toBe(false)})});describe("Ext.isObject",function(){it("should return false with empty array",function(){expect(Ext.isObject([])).toBe(false)});it("should return false with filled array",function(){expect(Ext.isObject([1,2,3,4])).toBe(false)});it("should return false with boolean true",function(){expect(Ext.isObject(true)).toBe(false)});it("should return false with boolean false",function(){expect(Ext.isObject(false)).toBe(false)});it("should return false with string",function(){expect(Ext.isObject("foo")).toBe(false)});it("should return false with empty string",function(){expect(Ext.isObject("")).toBe(false)});it("should return false with number",function(){expect(Ext.isObject(1)).toBe(false)});it("should return false with null",function(){expect(Ext.isObject(null)).toBe(false)});it("should return false with undefined",function(){expect(Ext.isObject(undefined)).toBe(false)});it("should return false with date",function(){expect(Ext.isObject(new Date())).toBe(false)});it("should return true with empty object",function(){expect(Ext.isObject({})).toBe(true)});it("should return false with a DOM node",function(){expect(Ext.isObject(document.body)).toBe(false)});it("should return false with a Text node",function(){expect(Ext.isObject(document.createTextNode("test"))).toBe(false)});it("should return true with object with properties",function(){expect(Ext.isObject({foo:1})).toBe(true)});it("should return true with object instance",function(){var A=function(){};expect(Ext.isObject(new A())).toBe(true)});it("should return true with new Object syntax",function(){expect(Ext.isObject(new Object())).toBe(true)});it("should return false with dom element",function(){expect(Ext.isObject(document.body)).toBe(false)})});describe("Ext.isPrimitive",function(){it("should return true with integer",function(){expect(Ext.isPrimitive(1)).toBe(true)});it("should return true with negative integer",function(){expect(Ext.isPrimitive(-21)).toBe(true)});it("should return true with float",function(){expect(Ext.isPrimitive(2.1)).toBe(true)});it("should return true with negative float",function(){expect(Ext.isPrimitive(-12.1)).toBe(true)});it("should return true with Number.MAX_VALUE",function(){expect(Ext.isPrimitive(Number.MAX_VALUE)).toBe(true)});it("should return true with Math.PI",function(){expect(Ext.isPrimitive(Math.PI)).toBe(true)});it("should return true with empty string",function(){expect(Ext.isPrimitive("")).toBe(true)});it("should return true with non empty string",function(){expect(Ext.isPrimitive("foo")).toBe(true)});it("should return true with boolean true",function(){expect(Ext.isPrimitive(true)).toBe(true)});it("should return true with boolean false",function(){expect(Ext.isPrimitive(false)).toBe(true)});it("should return false with null",function(){expect(Ext.isPrimitive(null)).toBe(false)});it("should return false with undefined",function(){expect(Ext.isPrimitive(undefined)).toBe(false)});it("should return false with object",function(){expect(Ext.isPrimitive({})).toBe(false)});it("should return false with object instance",function(){var A=function(){};expect(Ext.isPrimitive(new A())).toBe(false)});it("should return false with array",function(){expect(Ext.isPrimitive([])).toBe(false)})});describe("Ext.isString",function(){it("should return true with empty string",function(){expect(Ext.isString("")).toBe(true)});it("should return true with non empty string",function(){expect(Ext.isString("foo")).toBe(true)});it("should return true with String() syntax",function(){expect(Ext.isString(String(""))).toBe(true)});it("should return false with new String() syntax",function(){expect(Ext.isString(new String(""))).toBe(false)});it("should return false with number",function(){expect(Ext.isString(1)).toBe(false)});it("should return false with boolean",function(){expect(Ext.isString(true)).toBe(false)});it("should return false with null",function(){expect(Ext.isString(null)).toBe(false)});it("should return false with undefined",function(){expect(Ext.isString(undefined)).toBe(false)});it("should return false with array",function(){expect(Ext.isString([])).toBe(false)});it("should return false with object",function(){expect(Ext.isString({})).toBe(false)})});describe("Ext.isTextNode",function(){it("should return false with empty array",function(){expect(Ext.isTextNode([])).toBe(false)});it("should return false with filled array",function(){expect(Ext.isTextNode([1,2,3,4])).toBe(false)});it("should return false with boolean true",function(){expect(Ext.isTextNode(true)).toBe(false)});it("should return false with boolean false",function(){expect(Ext.isTextNode(false)).toBe(false)});it("should return false with string",function(){expect(Ext.isTextNode("foo")).toBe(false)});it("should return false with empty string",function(){expect(Ext.isTextNode("")).toBe(false)});it("should return false with number",function(){expect(Ext.isTextNode(1)).toBe(false)});it("should return false with null",function(){expect(Ext.isTextNode(null)).toBe(false)});it("should return false with undefined",function(){expect(Ext.isTextNode(undefined)).toBe(false)});it("should return false with date",function(){expect(Ext.isTextNode(new Date())).toBe(false)});it("should return false with empty object",function(){expect(Ext.isTextNode({})).toBe(false)});it("should return false with node list",function(){expect(Ext.isTextNode(document.getElementsByTagName("body"))).toBe(false)});it("should return false with element",function(){expect(Ext.isTextNode(document.body)).toBe(false)});it("should return true with TextNode",function(){var A=document.createTextNode("foobar");document.body.appendChild(A);expect(Ext.isTextNode(A)).toBe(true);document.body.removeChild(A)})});describe("Ext.clone",function(){var A;afterEach(function(){A=null});it("should clone an array",function(){var B=[2,"5",[1,3,4]];A=Ext.clone(B);expect(A).toEqual(B);expect(A).not.toBe(B)});it("should clone an object",function(){var B={fn:function(){return 1},b:2};A=Ext.clone(B);expect(A).toEqual(B);expect(A).not.toBe(B)});it("should clone a date",function(){var B=new Date();A=Ext.clone(B);expect(A).toEqual(B);expect(A).not.toBe(B)});it("should clone a dom node",function(){var B=document.createElement("DIV");document.body.appendChild(B);A=Ext.clone(B);expect(A.tagName).toEqual(A.tagName);expect(A.innerHTML).toEqual(A.innerHTML);expect(A).not.toBe(B);document.body.removeChild(B)});it("should return null for null items",function(){expect(Ext.clone(null)).toBeNull()});it("should return undefined for undefined items",function(){expect(Ext.clone(undefined)).toBeUndefined()});it("should not copy Ext.enumerable properties onto cloned object",function(){expect(Ext.clone({}).hasOwnProperty("toString")).toBe(false)});it("should copy same-named Ext.enumerable property onto cloned object",function(){expect(Ext.clone({toString:true}).hasOwnProperty("toString")).toBe(true);expect(Ext.clone({toString:true}).hasOwnProperty("valueOf")).toBe(false)})});describe("getUniqueGlobalNamespace",function(){it("should return an unique global namespace",function(){expect(Ext.getUniqueGlobalNamespace()).toBe("ExtBox1");try{delete window.ExtBox1}catch(A){window.ExtBox1=undefined}})})});