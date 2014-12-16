describe("Ext.event.gesture.Recognizer",function(){var A=Ext.event.gesture.Recognizer,B;it("should have Ext.mixin.Identifiable mixed in",function(){expect(A.prototype.mixins.identifiable).toBeDefined()});describe("constructor()",function(){it("should invoke initConfig() and pass the supplied config argument",function(){var C={};spyOn(A.prototype,"initConfig");new A(C);expect(A.prototype.initConfig).toHaveBeenCalledWith(C)})});describe("members",function(){beforeEach(function(){B=new A});describe("fire()",function(){it("should invoke 'onRecognized' callback, with scope 'callbackScope'",function(){var D=jasmine.createSpy(),C={};B.setOnRecognized(D);B.setCallbackScope(C);B.fire("foo","bar");expect(D).toHaveBeenCalledWith("foo","bar");expect(D.mostRecentCall.object).toBe(C)})})})});