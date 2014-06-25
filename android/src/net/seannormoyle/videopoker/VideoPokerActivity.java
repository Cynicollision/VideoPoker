package net.seannormoyle.videopoker;

import android.os.Bundle;
import android.view.Menu;
import org.apache.cordova.*;

public class VideoPokerActivity extends DroidGap {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.activity_video_poker, menu);
        return true;
    }
}
