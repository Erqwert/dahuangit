describe("Ext.data.operation.Update",function(){var C,A,E,D,F;function B(G){C=new Ext.data.operation.Update(G)}beforeEach(function(){Ext.define("spec.Alien",{extend:"Ext.data.Model",fields:["name","age","planet"]});A=new spec.Alien({name:"Thor",age:5000,planet:"Orilla"});D=new spec.Alien({name:"Teal'c",age:130,planet:"Chulak"});E={id:5,name:"Baal",age:3000,planet:"P3X-888"};F={id:12,name:"Jolinar",age:1500,planet:"Vorash"}});afterEach(function(){C=A=E=D=F=null;Ext.data.Model.schema.clear();Ext.undefine("spec.Alien")});describe("execute",function(){it("should call the proxy update method and pass itself",function(){var G=new Ext.data.proxy.Proxy();spyOn(G,"update").andReturn(new Ext.data.Request());B({proxy:G});C.execute();expect(G.update).toHaveBeenCalledWith(C)})});describe("updating records",function(){describe("single record",function(){beforeEach(function(){A.setId(E.id);A.dirty=false;A.phantom=false;B({records:[A]});C.process(new Ext.data.ResultSet({success:true,records:[E]}))});it("should update the client record with the server record's data",function(){expect(A.get("id")).toBe(E.id);expect(A.get("name")).toBe(E.name);expect(A.get("age")).toBe(E.age);expect(A.get("planet")).toBe(E.planet)});it("should mark the client record as not dirty",function(){expect(A.dirty).toBe(false)});it("should mark the client record as not phantom",function(){expect(A.phantom).toBe(false)})});describe("updating a single record with no matching server record id",function(){beforeEach(function(){A.setId(100);A.dirty=false;A.phantom=false;B({records:[A]});spec.Alien.prototype.clientIdProperty="clientId";C.process(new Ext.data.ResultSet({success:true,records:[E]}))});it("should update the client record with the server record's data",function(){expect(A.get("id")).not.toBe(E.id);expect(A.get("name")).not.toBe(E.name);expect(A.get("age")).not.toBe(E.age);expect(A.get("planet")).not.toBe(E.planet)});it("should mark the client record as not dirty",function(){expect(A.dirty).toBe(false)});it("should mark the client record as not phantom",function(){expect(A.phantom).toBe(false)})});describe("updating multiple records without a clientIdProperty",function(){beforeEach(function(){A.dirty=true;D.setId(100);D.dirty=true;F.clientId=A.id;spyOn(D,"set").andCallThrough();B({records:[A,D]});spec.Alien.prototype.clientIdProperty="clientId";C.process(new Ext.data.ResultSet({success:true,records:[E,F]}))});it("should update the client records with the server records' data",function(){expect(A.get("id")).toBe(F.id);expect(A.get("name")).toBe(F.name);expect(A.get("age")).toBe(F.age);expect(A.get("planet")).toBe(F.planet);expect(D.set).not.toHaveBeenCalled()});it("should mark the client records as not dirty",function(){expect(A.dirty).toBe(false);expect(D.dirty).toBe(false)});it("should mark the client records as not phantom",function(){expect(A.phantom).toBe(false);expect(D.phantom).toBe(false)})})})});