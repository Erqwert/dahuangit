describe("Ext.direct.Provider",function(){var A;beforeEach(function(){A=new Ext.direct.Provider({id:"foo"})});it("should instantiate",function(){expect(A).toBeDefined()});it("should set isProvider property",function(){expect(A.isProvider).toBe(true)})});