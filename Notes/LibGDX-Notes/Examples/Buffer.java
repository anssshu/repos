package com.mygdx.game;

import com.badlogic.gdx.ApplicationAdapter;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.audio.Music;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.BitmapFont;
import com.badlogic.gdx.graphics.g2d.Sprite;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;

public class MyGdxGame extends ApplicationAdapter {
    SpriteBatch batch;
    Texture img;
    Music music;
    Sprite ic;
    BitmapFont font;

    @Override
    public void create() {
        font = new BitmapFont(Gdx.files.internal("utf-font.fnt"));

        //directly study online

        //screen size and other graphics

        //create a sprite
        img = new Texture("badlogic.jpg");
        ic = new MySprite(img);
        //ic.setPosition(120.0f,111.6f);
        //ic.setRotation(120.0f);



        music = Gdx.audio.newMusic(Gdx.files.internal("music.mp3"));
        music.setLooping(true);
        music.play();

        batch = new SpriteBatch();

    }

    @Override
    public void render() {
        Gdx.gl.glClearColor(1, 0.6f, 0, 1);
        Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);
        batch.begin();
        if (Gdx.input.isTouched()) {
            ic.setRotation(ic.getRotation()-Gdx.graphics.getDeltaTime()*60);
            ic.draw(batch);
            //batch.draw(ic, (float)Math.random()*100.0f, 100);

        }

        font.draw(batch, "Click on it", 300, 500);
        batch.end();
    }
}

