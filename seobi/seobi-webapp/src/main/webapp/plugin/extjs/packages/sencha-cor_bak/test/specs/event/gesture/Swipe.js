describe("Ext.event.gesture.Swipe",function(){var B=Ext.event.gesture.Swipe,A;describe("constructor()",function(){});describe("members",function(){beforeEach(function(){})});describe("scenarios",function(){beforeEach(function(){A=new B();spyOn(A,"fail").andCallThrough()});it("should FAIL if there are more than 1 touches in touchstart initially",function(){Ext.testHelper.recognize(A,[{type:"touchstart",touches:[{},{}],changedTouches:[{},{}]},{type:"touchmove",touches:[{},{}],changedTouches:[{},{}]},{type:"touchend",changedTouches:[{},{}]}]);expect(A.fail).toHaveBeenCalledWith(B.NOT_SINGLE_TOUCH)});it("should FAIL if there is another touchstart after the first one",function(){Ext.testHelper.recognize(A,[{type:"touchstart",touches:[{}],changedTouches:[{}]},{type:"touchstart",touches:[{},{}],changedTouches:[{}]},{type:"touchmove",touches:[{},{}],changedTouches:[{},{}]},{type:"touchend",changedTouches:[{},{}]}]);expect(A.fail).toHaveBeenCalledWith(B.NOT_SINGLE_TOUCH)});describe("with config: minDistance=80, maxOffset=35, maxDuration=1000 and touchstart pageX=0, pageY=0",function(){var C;beforeEach(function(){C={type:"touchstart",pageX:0,pageY:0,time:0,touches:[{pageX:0,pageY:0,time:0}],changedTouches:[{pageX:0,pageY:0,time:0}]};var F=80,E=35,D=1000;A=new B({minDistance:F,maxOffset:E,maxDuration:D});spyOn(A,"fail").andCallThrough()});describe("FAIL",function(){it("should FAIL if there is a touchmove with pageX equals 36 and pageY equals -40",function(){Ext.testHelper.recognize(A,[C,{type:"touchmove",time:0,touches:[{pageX:36,pageY:-40}],changedTouches:[{pageX:36,pageY:-40}]},{type:"touchend",changedTouches:[{}]}]);expect(A.fail).toHaveBeenCalledWith(B.MAX_OFFSET_EXCEEDED)});it("should FAIL if there is a touchmove with pageX equals 36 and another touchmove with pageY equals -40",function(){Ext.testHelper.recognize(A,[C,{type:"touchmove",time:0,touches:[{pageX:0,pageY:-40}],changedTouches:[{pageX:0,pageY:-40}]},{type:"touchmove",time:0,touches:[{pageX:36,pageY:0}],changedTouches:[{pageX:36,pageY:0}]},{type:"touchend",time:0,changedTouches:[{}]}]);expect(A.fail).toHaveBeenCalledWith(B.MAX_OFFSET_EXCEEDED)});it("should FAIL if touchend's pageX equals 36 and equals -40",function(){Ext.testHelper.recognize(A,[C,{type:"touchmove",time:0,touches:[{pageX:10,pageY:-10}],changedTouches:[{pageX:10,pageY:-10}]},{type:"touchend",time:0,changedTouches:[{pageX:36,pageY:-40}]}]);expect(A.fail).toHaveBeenCalledWith(B.MAX_OFFSET_EXCEEDED)});it("should FAIL if there is a touchmove more than 1 second later from the touchstart",function(){Ext.testHelper.recognize(A,[C,{type:"touchmove",time:1001,touches:[{}],changedTouches:[{}]},{type:"touchend",changedTouches:[{}]}]);expect(A.fail).toHaveBeenCalledWith(B.MAX_DURATION_EXCEEDED)});it("should FAIL if touchend is more than 1 second later from the touchstart",function(){Ext.testHelper.recognize(A,[C,{type:"touchend",time:1001,changedTouches:[{}]}]);expect(A.fail).toHaveBeenCalledWith(B.MAX_DURATION_EXCEEDED)});it("should FAIL if the distance between touchstart and touchend is less than 80 on x-axis",function(){Ext.testHelper.recognize(A,[C,{type:"touchend",time:1,changedTouches:[{pageX:79,pageY:1}]}]);expect(A.fail).toHaveBeenCalledWith(B.DISTANCE_NOT_ENOUGH)});it("should FAIL if the distance between touchstart and touchend is less than 80 on y-axis",function(){Ext.testHelper.recognize(A,[C,{type:"touchend",time:1,changedTouches:[{pageX:1,pageY:79}]}]);expect(A.fail).toHaveBeenCalledWith(B.DISTANCE_NOT_ENOUGH)})});describe("PASS",function(){beforeEach(function(){spyOn(A,"fire").andCallThrough()});it("should invoke fire() with 'swipe', direction='left', distance=100, duration=500",function(){var F={type:"touchend",time:500,changedTouches:[{pageX:-100,pageY:0}]};var E=Ext.testHelper.recognize(A,[C,F]);var D=E[1].changedTouches[0];expect(A.fire).toHaveBeenCalledWith("swipe",E[1],{touch:D,direction:"left",distance:100,duration:500})});it("should invoke fire() with 'swipe', direction='right', distance=100, duration=500",function(){var F={type:"touchend",time:500,changedTouches:[{pageX:100,pageY:0}]};var E=Ext.testHelper.recognize(A,[C,F]);var D=E[1].changedTouches[0];expect(A.fire).toHaveBeenCalledWith("swipe",E[1],{touch:D,direction:"right",distance:100,duration:500})});it("should invoke fire() with 'swipe', direction='up', distance=100, duration=500",function(){var F={type:"touchend",time:500,changedTouches:[{pageX:0,pageY:-100}]};var E=Ext.testHelper.recognize(A,[C,F]);var D=E[1].changedTouches[0];expect(A.fire).toHaveBeenCalledWith("swipe",E[1],{touch:D,direction:"up",distance:100,duration:500})});it("should invoke fire() with 'swipe', direction='down', distance=100, duration=500",function(){var F={type:"touchend",time:500,changedTouches:[{pageX:0,pageY:100}]};var E=Ext.testHelper.recognize(A,[C,F]);var D=E[1].changedTouches[0];expect(A.fire).toHaveBeenCalledWith("swipe",E[1],{touch:D,direction:"down",distance:100,duration:500})})})})})});