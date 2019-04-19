
var OnScreenTouchControls=cc.Layer.extend({
    switch:"off",
    angle:0,
    TagOfLayer:{inner:1,button2:2},
    ctor:function(){
        this._super();
        this.init();

    },
    init:function(){
        this._super();
        var outer=cc.Sprite.create(res.outerCircle_png);
        outer.attr({
            x:100,
            y:80,
            scale:.6,
            
        });
        outer.setColor(new cc.Color(123,123,123,155));
        this.addChild(outer);

        var inner=cc.Sprite.create(res.innerCircle_png);
        inner.attr({
            x:100,
            y:80,
            scale:.2,
        });
        inner.setColor(new cc.Color(153,153,153,255));
        this.addChild(inner,0,this.TagOfLayer.inner);

        var button1=cc.Sprite.create(res.button1_png);
        button1.attr({
            x:550,
            y:80,
            scale:1,
        });
       // this.addChild(button1);
        
        var button2=cc.Sprite.create(res.button2_png);
        button2.attr({
            x:700,
            y:80,
            scale:1,
            opacity:100,
        });
        this.addChild(button2,0,this.TagOfLayer.button2);

        var speedometer=cc.Sprite.create(res.speedometer_png);
        speedometer.attr({
            x:350,
            y:80,
            scale:.8,
        });
       // this.addChild(speedometer);
        
        cc.eventManager.addListener(this.mytouchListener,this);

        this.scheduleUpdate();


    },
    update:function(dt){
       // console.log(this.angle);
        //console.log(this.switch);
    
    }
});

OnScreenTouchControls.prototype.mytouchListener=cc.EventListener.create({
    key:0,
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    
    onTouchBegan: function (touch, event) {
        this.key=1;
        //make the button glow
        var target= event.getCurrentTarget();
        
       
        //get the clicked point
        var click_location = target.convertToNodeSpace(touch.getLocation());
         
        
        var l=cc.pDistance(click_location,cc.p(700,80));
        if (l<100){
        event.getCurrentTarget().switch="on";
       //set opacity of button
        
        var b2=target.getChildByTag( 2);
        b2.setOpacity(255);
        }
        
        return true;//very important for onTouchMoved and onTouchEnded to work
    },  
    
    onTouchMoved:function(touch,event){
        
        //for angle controller
        if (this.key==1){
            var target=event.getCurrentTarget();
            var inner=target.getChildByTag(target.TagOfLayer.inner);
            var ev_p= target.convertToNodeSpace(touch.getLocation());
            //console.log(touch.getLocation());
            //console.log(ev_p);
            
            var l=cc.pDistance(ev_p,cc.p(100,80));
            //if the drag is inside the outer circle
            if (l<50 ){
                //move the inner circle
                inner.setPosition(ev_p);
                var r =cc.pSub(ev_p,cc.p(100,80));
                target.angle=cc.pToAngle(r)*-180/Math.PI;
                //console.log(target.angle);
                
                
            
            }
        
        }
       // alert("moved");        
    },
    
    onTouchEnded:function(touch,event){
        //alert("end");
        //set key to zero
        this.key=0;
        
        //make the button dim
        var target= event.getCurrentTarget();
        var b2=target.getChildByTag( 2);
        b2.setOpacity(100);
        
        //move inner back to originral position
        var target=event.getCurrentTarget();
        var inner=target.getChildByTag(target.TagOfLayer.inner);
        inner.setPosition(100,80);
        
    },

});