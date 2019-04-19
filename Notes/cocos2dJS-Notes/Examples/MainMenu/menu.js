//##############################################################
//           Template for learning MenItem
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
        var bg=cc.LayerGradient.create(cc.color(123,234,233),cc.color(211,111,234));
        
        this.addChild(bg);
        
        //creack herete the callba
        var callme=function(){
                alert("You Pressed the Menu Item")};
        
        //create the manu sprites
        var sp1=cc.Sprite.create(res.bubble_png);
        var sp2=cc.Sprite.create(res.Icon_png);
        
        //create a menu item
        var item=cc.MenuItemSprite.create(sp1,sp2,callme,this);
        
        var menu =cc.Menu.create(item);
        menu.setPosition(cc.p(100,100));
        
        this.addChild(menu);
        
        
        
        



        

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


