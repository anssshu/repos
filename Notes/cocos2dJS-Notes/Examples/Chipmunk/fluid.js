//
//##############################################################
//        app.js Basic Physics template with a colored background
//--------------------------------------------------------------
//################################################################
var water ;
var rect   ;

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
       
  
        
        water=new StaticRect(res.balls_png,230,70,450,150,space,"water");
        this.addChild(water);
        water.setScale(.2);
        water.shape.setCollisionType(1);
        water.shape.setSensor(true);
       // console.log(water.shape.getBB().t);

        rect=new DynamicRect(res.balls_png,340,280,150,50,space,"Crect");
        this.addChild(rect);
        rect.setScale(.13);
        
       

    
//-----------------------------------------------------------------------------------------  //     
        //enabling the collision handler
space.addCollisionHandler( 1, 0, null, this.waterPreSolve, null, null);
//setDefaultCollisionHandler = function(begin, preSolve, postSolve, separate)
       // space.setDefaultCollisionHandler(
        //    this.collisionBegin,null,null,null);
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
        console.log(rect.shape.getVert(0).y);

                return true;//it must return true or collision discarded
//----------------------------------------------------------------------------
    },
    waterPreSolve:function(arb,space,ptr){
        
        //GET THE WATER AND COL OBJECT
        var water =arb.getShapes()[0];
        var rect = arb.getShapes()[1];
        var body = rect.getBody();
        
        //get the water level
        var level=water.getBB().t;

        //get the total no of vertices in the lolygon
        var j=rect.verts.length/2;

        var clip=[];

        //for each vertices check if its below or above water
        for (var i=0;i<j;i++){
            //get the world coordinate of vert
            var cord=body.local2World(rect.getVert(i));
            //console.log(cord);

            //if the cord is below water level put into array
            if (cord.y<level){clip.push(cord.x);clip.push(cord.y);}

            //if area >level grab the cliped y cord
            if (cord.y>=level){
                clip.push(cord.x);
                clip.push(level);
            }

        }
        //calculate the displaced water area
        var dt = space.getCurrentTimeStep();

        var area=cp.areaForPoly(clip);
        //calculate the centre of buoyancy
        var B =cp.v.sub(cp.centroidForPoly(clip),body.getPos());
        B=cp.v(Math.floor(B.x),Math.floor(B.y));
        var FLUID_DRAG=.2;
        var FLUID_DENSITY=0.0008;
        //calculate upthrust 
        var up=cp.v.mult(space.gravity,-1*area*FLUID_DENSITY*dt);

	//apply impulse      
	 body.applyImpulse(up,B);

        console.log(B.x+','+B.y);

        // Apply linear damping for the fluid drag.
        
        var clippedArea=area;
        var r=B;
        var v_centroid = cp.v.add(body.getVel(), cp.v.mult(cp.v.perp(r), body.w));
        var k = 1; //k_scalar_body(body, r, cp.v.normalize_safe(v_centroid));
        var damping = clippedArea*FLUID_DRAG*FLUID_DENSITY;
        var v_coef = Math.exp(-damping*dt*k); // linear drag
//      var v_coef = 1.0/(1.0 + damping*dt*cp.v.len(v_centroid)*k); // quadratic drag
        body.applyImpulse( cp.v.mult(cp.v.sub(cp.v.mult(v_centroid, v_coef), v_centroid), 1.0/k), r);

        // Apply angular damping for the fluid drag.
        var w_damping = cp.momentForPoly(FLUID_DRAG*FLUID_DENSITY*clippedArea, clip, cp.v.neg(body.p));
        body.w *= Math.exp(-w_damping*dt* (1/body.i));


        return true;
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




