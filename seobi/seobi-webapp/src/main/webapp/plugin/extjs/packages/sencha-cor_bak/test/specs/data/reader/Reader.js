describe("Ext.data.reader.Reader",function(){var B,A;it("should have the nullResultSet defined on the prototype",function(){expect(Ext.data.reader.Reader.prototype.nullResultSet).toBeDefined()});describe("reading",function(){var E,D;beforeEach(function(){Ext.define("spec.User",{extend:"Ext.data.Model",fields:["id"]});A={setModel:Ext.emptyFn};B=new Ext.data.reader.Reader({proxy:A});B.buildExtractors=Ext.emptyFn;B.setModel(spec.User);spyOn(B,"readRecords").andReturn({})});afterEach(function(){Ext.data.Model.schema.clear();Ext.undefine("spec.User")});function C(){return B.read(E)}describe("if there is a responseText property",function(){beforeEach(function(){E={responseText:"something"};D={something:"else"};spyOn(B,"getResponseData").andCallFake(function(){return D});C()});it("should first call getResponseData with the response object",function(){expect(B.getResponseData).toHaveBeenCalledWith(E)})});describe("if there is no responseText property",function(){beforeEach(function(){spyOn(B,"getResponseData").andCallFake(function(){return D});E="something";C()});it("should not call getResponseData",function(){expect(B.getResponseData).not.toHaveBeenCalled()});it("should call readRecords with the response",function(){expect(B.readRecords.mostRecentCall.args[0]).toBe(E)})});describe("if the response was falsy",function(){var F=Ext.data.reader.Reader.prototype.nullResultSet;it("should return the nullResultSet if the response is undefined",function(){E=undefined;expect(C()).toBe(F)});it("should return the nullResultSet if the response is null",function(){E=null;expect(C()).toBe(F)});it("should return the nullResultSet if the response is false",function(){E=false;expect(C()).toBe(F)})});describe("transform",function(){it("should invoke the transform function",function(){var G={id:1};var I=function(J){J[0]={id:2};return J};var H=new Ext.data.reader.Reader({rootProperty:null,totalProperty:null,messageProperty:null,successProperty:null,model:"spec.User",transform:I});H.extractData=function(J,K){return J};var F=H.readRecords([G]).getRecords()[0];expect(F.id).not.toEqual(G.id);expect(F.id).toEqual(2)});it("should invoke the transform function with the specified scope",function(){var H={id:1};var G={};var J=function(K){expect(this).toEqual(G);K[0]={id:2};return K};var I=new Ext.data.reader.Reader({rootProperty:null,totalProperty:null,messageProperty:null,successProperty:null,model:"spec.User",transform:{fn:J,scope:G}});I.extractData=function(K,L){return K};var F=I.readRecords([H]).getRecords()[0];expect(F.id).not.toEqual(H.id);expect(F.id).toEqual(2)})})});describe("onMetaChange",function(){var C;beforeEach(function(){Ext.define("spec.User",{extend:"Ext.data.Model",fields:["id"]});A={setModel:Ext.emptyFn};B=new Ext.data.reader.Reader({proxy:A});B.buildExtractors=Ext.emptyFn;B.setModel(spec.User);C={root:"someRootProperty",totalProperty:"someTotalProperty",successProperty:"someSuccessProperty"};spyOn(B,"buildExtractors").andCallThrough()});afterEach(function(){Ext.data.Model.schema.clear();Ext.undefine("spec.User")});it("should set the root property",function(){B.onMetaChange(C);expect(B.getRootProperty()).toEqual("someRootProperty")});it("should set the totalProperty",function(){B.onMetaChange(C);expect(B.getTotalProperty()).toEqual("someTotalProperty")});it("should set the successProperty",function(){B.onMetaChange(C);expect(B.getSuccessProperty()).toEqual("someSuccessProperty")});it("should rebuild the extractor functions",function(){B.onMetaChange(C);expect(B.buildExtractors).toHaveBeenCalled()});describe("if fields are present in the meta data",function(){beforeEach(function(){Ext.apply(C,{fields:[{name:"uniqueId",type:"int"},{name:"name",type:"string"}]});spyOn(A,"setModel").andReturn()});it("should create a new model with fields",function(){var D=B.getModel().getFields();expect(D.length).toBe(1);expect(D.items[0].getName()).toBe("id");B.onMetaChange(C);D=B.getModel().getFields();expect(D.length).toBe(3);expect(D.items[0].getName()).toBe("uniqueId");expect(D.items[1].getName()).toBe("name")})})})});