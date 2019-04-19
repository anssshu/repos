Sound wavSound = Gdx.audio.newSound(Gdx.files.internal("data/wav.wav"));
Sound oggSound = Gdx.audio.newSound(Gdx.files.internal("data/ogg.ogg"));
Sound mp3Sound = Gdx.audio.newSound(Gdx.files.internal("data/mp3.mp3"));



        wavSound.play();

        long id = mp3Sound.loop();
        Timer.schedule(new Task(){
        @Override
        public void run(){
        mp3Sound.stop(id);
        }
        }, 5.0f);


        wavSound.dispose();
        oggSound.dispose();
        mp3Sound.dispose();


        long id = wavSound.play();
        wavSound.setPitch(id,0.5f);

        long id = wavSound.play();
        wavSound.setPan(id, 1f, 1f);

        Music mp3Music = Gdx.audio.newMusic(Gdx.files.internal("data/RideOfTheValkyries.mp3"));
        mp3Music.play();

        Music mp3Music = Gdx.audio.newMusic(Gdx.files.internal("data/RideOfTheValkyries.mp3"));
        mp3Music.play();
        mp3Music.setVolume(1.0f);
        mp3Music.pause();
        mp3Music.stop();
        mp3Music.play();
        Gdx.app.log("SONG",Float.toString(mp3Music.getPosition()));



        AudioDevice playbackDevice = Gdx.audio.newAudioDevice(44100, true);
        AudioRecorder recordingDevice = Gdx.audio.newAudioRecorder(44100, true);
        short[] samples = new short[44100 * 10]; // 10 seconds mono audio
        recordingDevice.read(samples, 0, samples.length);
        playbackDevice.writeSamples(samples, 0, samples.length);
        recordingDevice.dispose();
        playbackDevice.dispose();