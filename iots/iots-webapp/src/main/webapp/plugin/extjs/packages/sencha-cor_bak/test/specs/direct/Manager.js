describe("Ext.direct.Manager",function(){var A=Ext.direct.Manager,B,C;beforeEach(function(){B=new Ext.direct.Provider({id:"foo"});C=jasmine.createSpy("event handler")});afterEach(function(){A.providers.clear();A.transactions.clear();A.clearListeners()});it("should be a singleton",function(){expect(A.isInstance).toBeTruthy()});describe("handles Providers:",function(){it("adds provider as instance",function(){A.addProvider(B);expect(A.providers.getCount()).toBe(1)});it("adds provider as config object",function(){A.addProvider({id:"bar",type:""});expect(A.getProvider("bar")).toBeDefined()});it("subscribes to provider's 'data' event",function(){spyOn(A,"onProviderData").andReturn();A.addProvider(B);B.fireEvent("data");expect(A.onProviderData).toHaveBeenCalled()});it("connects the provider if it's not alredy connected",function(){spyOn(B,"connect");A.addProvider(B);expect(B.connect).toHaveBeenCalled()});it("relays provider events if requested",function(){B.relayedEvents=["foo"];A.addProvider(B);A.on("foo",C);B.fireEvent("foo");expect(C).toHaveBeenCalled()});it("returns provider by id",function(){A.addProvider(B);var D=A.getProvider("foo");expect(D.id).toBe("foo")});it("removes provider by id",function(){A.addProvider(B);A.removeProvider("foo");expect(A.providers.getCount()).toBe(0)});it("removes provider by instance",function(){A.addProvider(B);A.removeProvider(B);expect(A.providers.getCount()).toBe(0)});it("stops relaying 'data' event on removed provider",function(){A.on("data",C);A.addProvider(B);A.removeProvider("foo");B.fireEvent("data");expect(C).not.toHaveBeenCalled()});it("stops relaying specified provider events on removed provider",function(){B.relayedEvents=["foo"];A.addProvider(B);A.on("foo",C);A.removeProvider(B);B.fireEvent("foo");expect(C).not.toHaveBeenCalled()})});describe("handles Transactions:",function(){var D;beforeEach(function(){D=new Ext.direct.Transaction({provider:B})});it("adds transaction",function(){A.addTransaction(D);expect(A.transactions.getCount()).toBe(1)});it("finds transaction by tid",function(){A.addTransaction(D);var E=A.getTransaction(D.tid);expect(E).toEqual(D)});it("finds transaction by instance",function(){A.addTransaction(D);var E=A.getTransaction(D);expect(E).toEqual(D)});it("removes transaction by tid",function(){A.addTransaction(D);A.removeTransaction(D.tid);expect(A.transactions.getCount()).toBe(0)});it("removes transaction by instance",function(){A.addTransaction(D);A.removeTransaction(D);expect(A.transactions.getCount()).toBe(0)})});describe("handles provider data:",function(){var F,D,E,G;beforeEach(function(){F=new Ext.direct.Event({name:"foo",data:{foo:"bar"}});D=new Ext.direct.ExceptionEvent({data:"bar is closed"});E=jasmine.createSpy("handler foo");G=jasmine.createSpy("handler bar")});it("fires events with name 'event' only once",function(){F.name="event";A.on("event",C);A.on("exception",E);A.onProviderData(B,F);expect(C).toHaveBeenCalled();expect(E).not.toHaveBeenCalled()});it("fires events with name 'exception' only once",function(){F.name="exception";A.on("event",C);A.on("exception",E);A.onProviderData(B,F);expect(C).toHaveBeenCalled();expect(E).not.toHaveBeenCalled()});it("fires unnamed exceptions twice",function(){A.on("exception",C);A.on("event",E);A.onProviderData(B,D);expect(C).toHaveBeenCalled();expect(E).toHaveBeenCalled()});it("fires other events twice",function(){A.on("foo",C);A.on("event",E);A.on("exception",G);A.onProviderData(B,F);expect(C).toHaveBeenCalled();expect(E).toHaveBeenCalled();expect(G).not.toHaveBeenCalled()})});describe("handles method resolving:",function(){var E={actions:{TestAction:[{name:"foo",len:0}],"TestAction.Foo":[{name:"bar",len:0}],"TestAction.Foo.Bar":[{name:"baz",len:0}],"TestAction.Foo.Bar.Baz":[{name:"qux",len:0}]},namespace:"Direct",type:"remoting",url:"/router"};function D(F){return Ext.isFunction(F)}beforeEach(function(){A.addProvider(E)});afterEach(function(){try{delete Ext.global.Direct}catch(F){Ext.global.Direct=undefined}});it("forwards methods passed as function",function(){var F=A.parseMethod(C);expect(F).toEqual(C)});it("parses methods of a first level Actions",function(){var F=A.parseMethod("Direct.TestAction.foo");expect(D(F)).toBeTruthy()});it("parses methods of a nested Action",function(){var F=A.parseMethod("Direct.TestAction.Foo.bar");expect(D(F)).toBeTruthy()});it("parses methods of a deeply nested Action",function(){var F=A.parseMethod("Direct.TestAction.Foo.Bar.baz");expect(D(F)).toBeTruthy()});it("parses methods of a really truly deeply nested Action",function(){var F=A.parseMethod("Direct.TestAction.Foo.Bar.Baz.qux");expect(D(F)).toBeTruthy()})})});