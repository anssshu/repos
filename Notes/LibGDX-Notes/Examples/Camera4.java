

public class DesktopLauncher {
    public static void main (String[] arg) {
        LwjglApplicationConfiguration config = new LwjglApplicationConfiguration();
        config.width = 920;
        config.height = 480;
        new LwjglApplication(new CameraDemo2(), config);
    }
}

