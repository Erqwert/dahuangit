describe("Ext.util.Sorter",function(){var A;describe("instantiation",function(){var B=function(C){return function(){new Ext.util.Sorter(C)}};it("should require either a property or a function",function(){expect(B({})).toRaiseExtError()});it("should accept a property config",function(){expect(B({property:"test"})).not.toRaiseExtError()});it("should accept a sorter function",function(){expect(B({sorterFn:Ext.emptyFn})).not.toRaiseExtError()});it("should have no transform method",function(){expect(B().transform).toBeUndefined()})});describe("building sorter functions",function(){it("should default to sorting ASC",function(){A=new Ext.util.Sorter({property:"age"});var D={age:24},B={age:25},C=A.sort(D,B);expect(C).toEqual(-1)});it("should accept DESC direction",function(){A=new Ext.util.Sorter({property:"age",direction:"DESC"});var D={age:24},B={age:25},C=A.sort(D,B);expect(C).toEqual(1)});it("should allow specification of the root property",function(){A=new Ext.util.Sorter({root:"data",property:"age"});var D={data:{age:24}},B={data:{age:25}},C=A.sort(D,B);expect(C).toEqual(-1)})});it("should accept some custom transform function",function(){A=new Ext.util.Sorter({property:"age",transform:function(E){return E*-1}});var D={age:18},B={age:21},C=A.sort(D,B);expect(C).toBe(1)})});