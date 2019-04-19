//###########################################################################################
//                    app.js Basic template with a colored background
//-------------------------------------------------------------------------------------------

var myLayer = cc.Layer.extend({
    //constructor function
    ///////////////
    //instance variables go here
    /////////////
    ctor:function(){
        //call the super constructor
        this._super();
        this.init();
    },
    //create the init function
    init:function () {
        this._super();

        //get the window size
        size=cc.winSize;

        //create the background
        var bg=cc.LayerColor.create(new cc.Color(234,136,113,255)
            ,size.width,size.height);
        
        this.addChild(bg);
        ////////////////////////Your Code Goes Below////////////////////////////////
        
        
        //create a sprite
        
        var sp=this.sp=cc.Sprite.create(res.bubble_png);
        sp.setPosition(200,200);
        this.addChild(sp);
        //create an acttion
        var act = cc.MoveTo.create(1,cc.p(123,300*Math.random()));
        sp.runAction(act);
        
        ////////////////////////////////////////////////////////////////////////////////////////
        //repeated,sequence and infite actions
        
        sp2=cc.Sprite.create(res.Icon_png);
        sp2.attr({
        x:100,
            y:200,
            scale:3,
        });
        this.addChild(sp2);
        
        act1=cc.RotateBy.create(1,45);
        
        
        act2=cc.MoveBy.create(1,cc.p(100,0));
       
        //repeat 5 times
        sp2.runAction( cc.repeatForever(act1));
        
        //repeat for ever
        sp2.runAction( cc.repeat(act2,2));
        
        //act 4and act 3 for sequence
        
        act3=cc.MoveBy.create(1,cc.p(0,50));
        act4=cc.RotateBy.create(1,-360);
        
        sp2.runAction(cc.sequence(act3,act4));
        //this is to be called to call update func every step
        
        this.schedule(this.update_,2);
    },
    update_:function(dt){
         var act = cc.MoveTo.create(1,cc.p(cc.winSize.width*Math.random(),cc.winSize.height*Math.random()));

    
         this.sp.runAction(act);
    if(cc.rectIntersectsRect(this.sp.getBoundingBox(),
                                sp2.getBoundingBox()))alert('col');
   
        
        
        //this  function is called every step
    }

});


var GameScene = cc.Scene.extend({
    
    onEnter:function () {
        this._super();
        var layer = new myLayer();//tname of the layer added to it
        this.addChild(layer);
    }
});
