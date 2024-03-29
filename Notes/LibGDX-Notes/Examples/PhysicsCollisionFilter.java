

package com.gamefromscratch;

import com.badlogic.gdx.ApplicationAdapter;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.OrthographicCamera;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.Sprite;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.math.MathUtils;
import com.badlogic.gdx.math.Matrix4;
import com.badlogic.gdx.math.Vector2;
import com.badlogic.gdx.physics.box2d.*;

public class Physics4 extends ApplicationAdapter {
    SpriteBatch batch;
    Sprite sprite,sprite2;
    Texture img;
    World world;
    Body body,body2;
    Body bodyEdgeScreen;

    Matrix4 debugMatrix;
    OrthographicCamera camera;

    final float PIXELS_TO_METERS = 100f;


    final short PHYSICS_ENTITY = 0x1;    // 0001
    final short WORLD_ENTITY = 0x1 << 1; // 0010 or 0x2 in hex

    @Override
    public void create() {
        batch = new SpriteBatch();
        img = new Texture("badlogic.jpg");

        // Create two identical sprites slightly offset from each other vertically
        sprite = new Sprite(img);
        sprite.setPosition(-sprite.getWidth()/2,-sprite.getHeight()/2 +200);
        sprite2 = new Sprite(img);
        sprite2.setPosition(-sprite.getWidth()/2 + 20,-sprite.getHeight()/2 + 400);

        world = new World(new Vector2(0, -1f),true);

        // Sprite1's Physics body
        BodyDef bodyDef = new BodyDef();
        bodyDef.type = BodyDef.BodyType.DynamicBody;
        bodyDef.position.set((sprite.getX() + sprite.getWidth()/2) /
                        PIXELS_TO_METERS,
                (sprite.getY() + sprite.getHeight()/2) / PIXELS_TO_METERS);

        body = world.createBody(bodyDef);


        // Sprite2's physics body
        BodyDef bodyDef2 = new BodyDef();
        bodyDef2.type = BodyDef.BodyType.DynamicBody;
        bodyDef2.position.set((sprite2.getX() + sprite2.getWidth()/2) /
                        PIXELS_TO_METERS,
                (sprite2.getY() + sprite2.getHeight()/2) / PIXELS_TO_METERS);

        body2 = world.createBody(bodyDef2);

        // Both bodies have identical shape
        PolygonShape shape = new PolygonShape();
        shape.setAsBox(sprite.getWidth()/2 / PIXELS_TO_METERS, sprite.getHeight()
                /2 / PIXELS_TO_METERS);

        // Sprite1
        FixtureDef fixtureDef = new FixtureDef();
        fixtureDef.shape = shape;
        fixtureDef.density = 0.1f;
        fixtureDef.restitution = 0.5f;
        fixtureDef.filter.categoryBits = PHYSICS_ENTITY;
        fixtureDef.filter.maskBits = WORLD_ENTITY;


        // Sprite2
        FixtureDef fixtureDef2 = new FixtureDef();
        fixtureDef2.shape = shape;
        fixtureDef2.density = 0.1f;
        fixtureDef2.restitution = 0.5f;
        fixtureDef2.filter.categoryBits = PHYSICS_ENTITY;
        fixtureDef2.filter.maskBits = WORLD_ENTITY;

        body.createFixture(fixtureDef);
        body2.createFixture(fixtureDef2);

        shape.dispose();

        // Now the physics body of the bottom edge of the screen
        BodyDef bodyDef3 = new BodyDef();
        bodyDef3.type = BodyDef.BodyType.StaticBody;

        float w = Gdx.graphics.getWidth()/PIXELS_TO_METERS;
        float h = Gdx.graphics.getHeight()/PIXELS_TO_METERS;

        bodyDef3.position.set(0,0);
        FixtureDef fixtureDef3 = new FixtureDef();
        fixtureDef3.filter.categoryBits = WORLD_ENTITY;
        fixtureDef3.filter.maskBits = PHYSICS_ENTITY;

        EdgeShape edgeShape = new EdgeShape();
        edgeShape.set(-w/2,-h/2,w/2,-h/2);
        fixtureDef3.shape = edgeShape;


        bodyEdgeScreen = world.createBody(bodyDef3);
        bodyEdgeScreen.createFixture(fixtureDef3);
        edgeShape.dispose();

        camera = new OrthographicCamera(Gdx.graphics.getWidth(),Gdx.graphics.
                getHeight());
    }

    @Override
    public void render() {
        camera.update();
        // Step the physics simulation forward at a rate of 60hz
        world.step(1f/60f, 6, 2);

        sprite.setPosition((body.getPosition().x * PIXELS_TO_METERS) - sprite.
                        getWidth()/2 ,
                (body.getPosition().y * PIXELS_TO_METERS) -sprite.getHeight()/2 );


        sprite.setRotation((float)Math.toDegrees(body2.getAngle()));
        sprite2.setPosition((body2.getPosition().x * PIXELS_TO_METERS) - sprite2.
                        getWidth()/2 ,
                (body2.getPosition().y * PIXELS_TO_METERS) -sprite2.getHeight()/2 );
        sprite2.setRotation((float)Math.toDegrees(body.getAngle()));

        Gdx.gl.glClearColor(1, 1, 1, 1);
        Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);

        batch.setProjectionMatrix(camera.combined);
        batch.begin();

        batch.draw(sprite, sprite.getX(), sprite.getY(),sprite.getOriginX(),
                sprite.getOriginY(),
                sprite.getWidth(),sprite.getHeight(),sprite.getScaleX(),sprite.
                        getScaleY(),sprite.getRotation());
        batch.draw(sprite2, sprite2.getX(), sprite2.getY(),sprite2.getOriginX(),
                sprite2.getOriginY(),
                sprite2.getWidth(),sprite2.getHeight(),sprite2.getScaleX(),sprite2.
                        getScaleY(),sprite2.getRotation());
        batch.end();
    }

    @Override
    public void dispose() {
        img.dispose();
        world.dispose();
    }
}

