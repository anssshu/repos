var DrawNewAPITest = DrawTestDemo.extend({
    _title : "cc.DrawNode",
    _subtitle : "Testing cc.DrawNode API",

    ctor:function() {
        this._super();

        var draw = cc.DrawNode.create();
        this.addChild( draw, 10 );

        //
        // Circles
        //
        for( var i=0; i < 10; i++) {
            draw.drawDot( cc.p(winSize.width/2, winSize.height/2), 10*(10-i), cc.c4f( Math.random(), Math.random(), Math.random(), 1) );
        }

        //
        // Polygons
        //
        var points = [ cc.p(winSize.height/4,0), cc.p(winSize.width,winSize.height/5), cc.p(winSize.width/3*2,winSize.height) ];
        draw.drawPoly(points, cc.c4f(1,0,0,0.5), 4, cc.c4f(0,0,1,1) );

        // star poly (triggers bugs)
        var o=80;
        var w=20;
        var h=50;
        var star = [
            cc.p(o+w,o-h), cc.p(o+w*2, o),                  // lower spike
            cc.p(o + w*2 + h, o+w ), cc.p(o + w*2, o+w*2),  // right spike
            cc.p(o +w, o+w*2+h), cc.p(o,o+w*2),             // top spike
            cc.p(o -h, o+w), cc.p(o,o)                     // left spike
        ];
        draw.drawPoly(star, cc.c4f(1,0,0,0.5), 1, cc.c4f(0,0,1,1) );

        // star poly (doesn't trigger bug... order is important un tesselation is supported.
        o=180;
        w=20;
        h=50;
        star = [
            cc.p(o,o), cc.p(o+w,o-h), cc.p(o+w*2, o),       // lower spike
            cc.p(o + w*2 + h, o+w ), cc.p(o + w*2, o+w*2),  // right spike
            cc.p(o +w, o+w*2+h), cc.p(o,o+w*2),             // top spike
            cc.p(o -h, o+w)                                 // left spike
        ];
        draw.drawPoly(star, cc.c4f(1,0,0,0.5), 1, cc.c4f(0,0,1,1) );

        //
        // Segments
        //
        draw.drawSegment( cc.p(20,winSize.height), cc.p(20,winSize.height/2), 10, cc.c4f(0, 1, 0, 1) );
        draw.drawSegment( cc.p(10,winSize.height/2), cc.p(winSize.width/2, winSize.height/2), 40, cc.c4f(1, 0, 1, 0.5) );
    }
});