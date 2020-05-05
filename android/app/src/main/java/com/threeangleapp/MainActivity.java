package com.threeangleapp;
import android.os.Bundle; //added for splash
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;//added for splash

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override//added for splash
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.hide(this);  // here 
        super.onCreate(savedInstanceState);
    }
    @Override
    protected String getMainComponentName() {
        return "threeangleapp";
    }
}
