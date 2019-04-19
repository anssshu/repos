//##############################################################
//                    app.js Basic template with a colored background
//--------------------------------------------------------------
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
        winSize=cc.winSize;

        //create the background
        var bg=cc.LayerColor.create(new cc.Color(34,136,113,255)
            ,winSize.width,winSize.height);
        
        this.addChild(bg);
        //////////////////////////////////////////////////////////
        var draw=this.draw=cc.DrawNode.create();
        
        this.addChild(draw);
        
        draw.drawDot(cc.p(300,300),3,cc.color.GREEN);
        
        // Polygons
        //
        var points = [ cc.p(winSize.height/4,10), 
                      cc.p(winSize.width-10,winSize.height/5),
                      cc.p(winSize.width/3*2,winSize.height-10) ];
        
        
        pol=draw.drawPoly(points,cc.color.BLUE,4,cc.color.RED );
    
        //check the update function the screen is wiped out here
        
                        

        this.i=10;

        

        //this is to be called to call update func every step
        this.scheduleUpdate();
    },
    update:function(dt){
        this.draw.clear();
        this.draw.drawRect(cc.p(200,200),cc.p(400,400),cc.color.ORANGE);
        
        this.i+=1;
        this.draw.drawCircle(cc.p(this.i,200),20,360,20);
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
