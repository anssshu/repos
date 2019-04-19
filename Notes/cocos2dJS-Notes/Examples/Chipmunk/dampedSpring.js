//
//##############################################################
//        app.js Basic Physics template with a colored background
//--------------------------------------------------------------
//################################################################
var v=cp.v;
var space;
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
        var bg=cc.LayerColor.create(new cc.Color(244,186,213,255)
            ,size.width,size.height);
        
        this.addChild(bg);
        
        ////////////////////////////////////
        //create a space
        space=this.space=new cp.Space();
        //set its gravity
        space.gravity=cp.v(0,-100);
        //create a static body
        
       //--------------------------------------------------------------------//
        
        var line=new StaticSegment(
            [cp.v(10,300),cp.v(10,10),cp.v(300,10),cp.v(500,200),
            cp.v(780,200),cp.v(780,400)],
            space,"ground");
        this.addChild(line);
       
  
        
        var rect=new StaticRect(res.balls_png,130,300,100,100,space,"rect");
        this.addChild(rect);
        rect.setScale(.2);
        
        var icon=new DynamicSphere(res.Icon_png,100,200,30,space,"icon");
        this.addChild(icon);

        var  heart=new DynamicRect(res.life_png,400,200,32,32,space,"heart");
        this.addChild(heart);

        
        var bubble=new DynamicSphere(res.bubble_png,300,200,50,space,"bubble");
        this.addChild(bubble);

        //create a pin joint
        space.addConstraint(new cp.DampedSpring(rect.body,bubble.body,v(0,0),
         v(0,-130),30,10,0.3));
    
//-----------------------------------------------------------------------------------------  //     
        //enabling the collision handler
        space.setDefaultCollisionHandler(
            this.collisionBegin,null,null,null);
//-----------------------------------------------------------------------------------------

        //For enabling the debug draw
        var debugDraw = cc.PhysicsDebugNode.create(space);
debugDraw.setVisible(true);
this.addChild(debugDraw);
       
        ///////////////////////////////////////
        //this is to be called to call update func every step
        this.scheduleUpdate();
    },
//--------------------------------------------------------------------------
    //function to define main collision logic
    collisionBegin : function (arbiter, space ) {
        console.log(arbiter.a.name +"--"+arbiter.b.name);

                return true;//it must return true or collision discarded
//----------------------------------------------------------------------------
    },
    update:function(dt){
        //this  function is called every step
        this.space.step(dt);
    }

});
/////////////END OF MAIN LAYER //////////////////////////////////


var GameScene = cc.Scene.extend({
    
    onEnter:function () {
        this._super();
        var layer = new myLayer();//tname of the layer added to it
        this.addChild(layer);
    }
});

///////////////////CLASS DEFINATIONS/////////////////////////

//Class to Create a dynamic circle shape object
var DynamicSphere=cc.PhysicsSprite.extend({

    /////////////////////////////////////
    ctor:function(file_name,x,y,r,space,name){
        this._super();
        this.init(file_name,x,y,r,space,name);
    },
    init:function(file_name,x,y,r,space,name){
        this.name=name;
        this.initWithFile(file_name);
        
        
        this.body=new cp.Body(2,cp.momentForCircle(2,0,r,cp.v(0,0)));
        this.body.setPos(cc.p(x,y));
        space.addBody(this.body);
        
        this.shape=new cp.CircleShape(this.body,
                                   r,cp.v(0,0));
        
        this.shape.setFriction(0.5);
        this.shape.setElasticity(1);
        
        this.shape.name=name;
        space.addShape(this.shape);
        this.setBody(this.body);
        },
    

});

//////////////////////////////////////////////////
//Class to Create a dynamic rectangle shape object
var DynamicRect=cc.PhysicsSprite.extend({

    /////////////////////////////////////
    ctor:function(file_name,x,y,w,h,space,name){
        this._super();
        this.init(file_name,x,y,w,h,space,name);
    },
    
    init:function(file_name,x,y,w,h,space,name){

        this.initWithFile(file_name);
        
        
        this.body=new cp.Body(2,cp.momentForBox(2,w,h));
        this.body.setPos(cc.p(x,y));
        space.addBody(this.body);

        
        
        this.shape=new cp.BoxShape(this.body,
                                   w,h);
        
        this.shape.setFriction(0.5);
        this.shape.setElasticity(.5);

        this.shape.name=name;
        
        
        space.addShape(this.shape);
        this.setBody(this.body);
        },
    

});

//////////////////////////////////////////////////////////
var StaticSegment=cc.Layer.extend({
    ctor:function(array,space,name){
        this._super();
        this.init(array,space,name);
    },
    init:function(array,space,name){
        this.body= new cp.StaticBody();
        for (var i=0;i<array.length-1;i++){
            var shape=new cp.SegmentShape(this.body,array[i],array[i+1],0);
            shape.setFriction(1);
            shape.setElasticity(1);
            shape.name=String(name)+i;
            space.addShape(shape);
        }
        
       // this.shape=new cp.SegmentShape(this.body,p1,p2,0);
        //this.shape.setFriction(1);
       // this.shape.setElasticity(1);
       // space.addShape(this.shape);
        var draw=cc.DrawNode.create();
        this.addChild(draw);
        for (var i=0;i<array.length-1;i++)
        draw.drawSegment(array[i],array[i+1],2,cc.color.RED);
        
        
    }



});
////////////////////////////////////////////////////////////
var StaticRect=cc.PhysicsSprite.extend({

    ctor:function(imagefile,x,y,w,h,space,name){
        this._super();
        this.init(imagefile,x,y,w,h,space,name);
    },
    init:function(imagefile,x,y,w,h,space,name){
        this.initWithFile(imagefile);
        
        this.body=new cp.StaticBody();
        this.body.setPos(cp.v(x,y));
        
        this.shape=new cp.BoxShape(this.body,w,h);
        this.shape.name=name;//helper for collision

        space.addShape(this.shape);
        
        this.setBody(this.body);


    },
});




