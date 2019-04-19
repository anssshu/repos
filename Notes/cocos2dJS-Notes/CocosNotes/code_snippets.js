////////////////////////////////////////////////////////////////

//this file is created to stroe
// the code snippets for the cocos 2d -js 
//code_snippet.js
//################################################################
//                createing a basic game object and running it
//---------------------------------------------------------------
//main.js creating a game object and running it

 cc.game.onStart = function(){
    if(!cc.sys.isNative && document.getElementById(
        "cocosLoading"))
         //If referenced loading.js, please remove it
        document.body.removeChild(
            document.getElementById("cocosLoading"));

    // Pass true to enable retina display, 
    //disabled by default to improve performance
    cc.view.enableRetina(false);
    // Adjust viewport meta
    cc.view.adjustViewPort(true);
    // Setup the resolution policy and design resolution size
    cc.view.setDesignResolutionSize(800, 450,
         cc.ResolutionPolicy.SHOW_ALL);
    // The game will be resized when browser size change
    cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new GameScene());
    }, this);
 };
 cc.game.run();
//##############################################################
//                    app.js template with a colored background
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
        size=cc.winSize;

        //create the background
        var bg=cc.LayerColor.create(new cc.Color(34,136,113,255)
            ,size.width,size.height);
        
        this.addChild(bg);



        

        //this is to be called to call update func every step
        this.scheduleUpdate();
    },
    update:function(dt){
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

//#############################################################
//  inter layer communication
//--------------------------------------
tag is an integer
//add Background layer and Animation layer to gameLayer
        this.gameLayer.addChild(new BackgroundLayer(), 0, TagOfLayer.background);
        this.gameLayer.addChild(new AnimationLayer(this.space), 0, TagOfLayer.Animation);
        this.addChild(this.gameLayer);
        this.addChild(new StatusLayer(), 0, TagOfLayer.Status);

update:function (dt) {
        var animationLayer = this.getParent().getChildByTag(TagOfLayer.Animation);
        var eyeX = animationLayer.getEyeX();
        this.checkAndReload(eyeX);
    }


//#################################################################
//           Creating a Menu Layer
//-------------------------------------------------------------------
var MenuLayer = cc.Layer.extend({
    ctor : function(){
        //1. call super class's ctor function
        this._super();
    },
    init:function(){
        //call super class's super function
        this._super();

        //2. get the screen size of your game canvas
        var winsize = cc.director.getWinSize();

        //3. calculate the center point
        var centerpos = cc.p(winsize.width / 2, winsize.height / 2);

        //4. create a background image and set it's position at the center of the screen
        var spritebg = new cc.Sprite(res.helloBG_png);
        spritebg.setPosition(centerpos);
        this.addChild(spritebg);

        //5.
        cc.MenuItemFont.setFontSize(60);

        //6.create a menu and assign onPlay event callback to it
        var menuItemPlay= new cc.MenuItemSprite(
        	new cc.Sprite(res.start_n_png), // normal state image
        	new cc.Sprite(res.start_s_png), //select state image
            this.onPlay, this);
        var menu = new cc.Menu(menuItemPlay);  //7. create the menu
        menu.setPosition(centerpos);
        this.addChild(menu);
    },

    onPlay : function(){
        cc.log("==onplay clicked");
        cc.director.runScene(new PlayScene());
    }
});

//#########################################################
//                  Timer
//---------------------------------------------------------
//call this inside the init function of a layer
var timeout=2;//in seconds

//add the timer to your layer
this.schedule(change,timeout) ;

//callback for the timer
change:function(){
        console.log("change is called");
        
        //this.unschedule(this.change);//for removing timer
    }

//##########################################################
//                   Touch event
//-----------------------------------------------------------
//one by one touch
if( 'touches' in cc.sys.capabilities ) {
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: this.onTouchBegan,
                onTouchMoved: this.onTouchMoved,
                onTouchEnded: this.onTouchEnded,
                onTouchCancelled: this.onTouchCancelled
            }, this);
        } else {
            cc.log("TOUCH-ONE-BY-ONE test is 
                not supported on desktop");
        }
//all at once
if( 'touches' in cc.sys.capabilities ) {
            // this is the default behavior. 
            //No need to set it explicitly.
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesBegan: this.onTouchesBegan,
                onTouchesMoved: this.onTouchesMoved,
                onTouchesEnded: this.onTouchesEnded,
                onTouchesCancelled: this.onTouchesCancelled
            }, this);
        } else {
            cc.log("TOUCHES not supported");
        }



//###########################################################
//           Custom Event
//--------------------------------------------------------------
var _listener1 = cc.EventListener.create({
        event: cc.EventListener.CUSTOM,
        eventName: "game_custom_event1",
        callback: function(event){
            statusLabel.setString("Custom event 1 received,
             " + event.getUserData() + " times");
        }
    });    
    cc.eventManager.addListener(this._listener1, 1);

//#############################################################
//             Acclerometer event
//------------------------------------------------------------
if( 'accelerometer' in cc.sys.capabilities ) {
            // call is called 30 times per second
            cc.inputManager.setAccelerometerInterval(1/30);
            cc.inputManager.setAccelerometerEnabled(true);
            cc.eventManager.addListener({
                event: cc.EventListener.ACCELERATION,
                callback: function(accelEvent, event){
                    var target = event.getCurrentTarget();
                    cc.log('Accel x: '+ accelEvent.x +
                     ' y:' + accelEvent.y + 
                     ' z:' + accelEvent.z + ' time:' 
                     + accelEvent.timestamp );

                    var w = winSize.width;
                    var h = winSize.height;

                    var x = w * accelEvent.x + w/2;
                    var y = h * accelEvent.y + h/2;

                    // Low pass filter
                    x = x*0.2 + target.prevX*0.8;
                    y = y*0.2 + target.prevY*0.8;

                    target.prevX = x;
                    target.prevY = y;
                    target.sprite.x = x;
                    target.sprite.y = y ;
                }
            }, this);



//#############################################################
//               Keyboard event listener
//-------------------------------------------------------------
if ('keyboard' in cc.sys.capabilities) {
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function (key, event) {
                    var strTemp = "Key down:" + key;
                    var keyStr = self.getKeyStr(key);
                    if (keyStr.length > 0)
                    {
                        strTemp += " the key name is:" + keyStr;
                    }
                    label.setString(strTemp);
                },
                onKeyReleased: function (key, event) {
                    var strTemp = "Key up:" + key;
                    var keyStr = self.getKeyStr(key);
                    if (keyStr.length > 0)
                    {
                        strTemp += " the key name is:" + keyStr;
                    }
                    label.setString(strTemp);
                }
            }, this);
        } else {
            cc.log("KEYBOARD Not supported");
        }
//############################################################
//                      Mouse event listener
//-------------------------------------------------------------
 cc.eventManager.addListener({
        event: cc.EventListener.MOUSE,
        onMouseMove: function(event){
            var str = "MousePosition X: " +
             event.getLocationX() + "  Y:" + event.getLocationY();
            // do something...
        },
        onMouseUp: function(event){
            var str = "Mouse Up detected, Key: " +
             event.getButton();
            // do something...
        },
        onMouseDown: function(event){
           
             event.getCurrentTarget().x+=1;;
            // do something...
        },
        onMouseScroll: function(event){
            var str = "Mouse Scroll detected, X: " +
             event.getLocationX() + "  Y:" + event.getLocationY();
            // do something...
        }
    },this);
 //###########################-------############################
 //////Mouse event listener plus clicked obj  detector
 var ic=this.ic=cc.Sprite.create(res.Icon_png);
         this.ic.attr({x:400,y:200,scale:1});
         this.addChild(ic);

        var listener=cc.EventListener.create(
        {

            event:cc.EventListener.MOUSE,
            
            onMouseDown:function(event){
                var tr=event.getCurrentTarget();
                var w=tr.width;
                var h=tr.height;
                

                if (Math.round(event._x-tr.x)<w/2
                 && Math.round(event._y-tr.y)<h/2){

                    console.log("click on image");
                    tr.x=500*Math.random();
                    tr.y=500*Math.random();
               // console.log(event.getButton())
           }

                        }

        });

        
        cc.eventManager.addListener(listener,this.ic);
//#############################################################
//          Simple Collision Detection
//-------------------------------------------------------------
 //sp and sp2 are sprites.    
    cc.rectIntersectsRect(this.sp.getBoundingBox(),
                                sp2.getBoundingBox());

//##############################################################
//                     creating a layer
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


        

        //this is to be called to call update func every step
        this.scheduleUpdate();
    },
    update:function(dt){
        //this  function is called every step
    }

});

//#############################################################
//                   creating a game Scene
//--------------------------------------------------------------

var GameScene = cc.Scene.extend({
    
    onEnter:function () {
        this._super();
        var layer = new myLayer();//tname of the layer added to it
        this.addChild(layer);
    }
});

//#############################################################



//###############################################################
//                  Adding a Background Layer
//---------------------------------------------------------------

        var bg=cc.LayerColor.create(new cc.Color(34,136,213,55)
            ,800,600);
        
        this.addChild(bg);

        var backgroundLayer = cc.LayerGradient.create(cc.
color(0xdf,0x9f,0x83,255), cc.color(0xfa,0xf7,0x9f,255));
 this.addChild(backgroundLayer);


//##############################################################
//                  Adding Particles
//---------------------------------------------------------------
        //create an emitter
        var em=new cc.ParticleFire();
       
        //set the emitter attributes
        em.attr({
        x:300,
        y:200,
        scale:.1,
        rotation:0,
        });
        this.addChild(em);
        
        //set the texture 
        var myTex=cc.textureCache.addImage(res.Icon_png);
        em.setTexture(myTex);
    
        
        


//###############################################################
//                  Adding Tiled Maps
//---------------------------------------------------------------
       //create the map
        this.tileMap=new cc.TMXTiledMap(res.Map_tmx);
        
        this.tileMap.attr({
        x:-160,
        scale:1
        })
        
        this.addChild(this.tileMap,0);



//##############################################################
//                       Adding sound
//--------------------------------------------------------------
    cc.audioEngine.playMusic(res.Bg_music,true);

//##############################################################
//                      Animated Sprite from sprite sheet
//---------------------------------------------------------------

        //create a sprite frame cache
        cc.spriteFrameCache.addSpriteFrames(res.Running_Plist,
            res.Running);
       
         // init runningAction
        var animFrames = [];
        for (var i = 0; i < 8; i++) {
            var str = "runner" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        //create a space holder sprite
        this.mostafa = cc.Sprite.create(animFrames[2]);

       //                or

      
       /**
         // Load sprite frames to frame cache, add texture node
        
        cc.spriteFrameCache.addSpriteFrames(res.Running_Plist);
        var mostafaTexture = cc.textureCache.addImage(res.Running);
        var mostafaImages  = cc.SpriteBatchNode.create(
            mostafaTexture);
        this.addChild(mostafaImages);
    
       **/


        //set its attributes
        this.mostafa.attr({
        x: size.width / 3,
        y: size.height / 3-40,
        scale: 2,
        rotation: 0
        });

        //add the sprites to the layer
        this.addChild(this.mostafa, 0);

        //create an animation
        var animation = cc.Animation.create(animFrames,
         0.08, 2000);

        //create an animation action
        var animate   = cc.Animate.create(animation);

        //run action on the sprite
        this.mostafa.runAction(animate);

        //inside update setSpriteFrame

//################################################################
//                       creating  Label
//---------------------------------------------------------------

    //create the label object
    this.labelMeter = new cc.LabelTTF("0M", "Helvetica", 20);
    
    //position it
    this.labelMeter.setPosition(cc.p(winsize.width - 70, 
        winsize.height - 20));
    
    //add it to the layer
    this.addChild(this.labelMeter);



//################################################################
//                     adding sprite
//---------------------------------------------------------------
        //this is to be called inside a layer and 
        //attached to the layer
        
        //create a sprite object
        this.sprite_name = cc.Sprite.create(res.foo_png); //imp
        
        //add atributes
        this.sprite_name.attr({
        x: size.width / 3,
        y: size.height / 3+40,
        scale: 1,
        rotation: 0
        });
        
        //add it to the layers
        this.addChild(this.sprite_name, 0);
//#############################################################
//         Running Actions
//----------------------------------------------------------------
     //create a sprite
        
        var sp=cc.Sprite.create(res.bubble_png);
        sp.setPosition(200,200);
        this.addChild(sp);
        //create an acttion
        var act = cc.MoveTo.create(3,cc.p(123,334));
        sp.runAction(act);



//###############################################################
