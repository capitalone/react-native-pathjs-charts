package com.example;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.util.Log;
import android.view.KeyEvent;

import com.facebook.react.*;
import com.facebook.react.BuildConfig;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.shell.MainReactPackage;

/**
 * Created by young on 2017/5/10.
 */

public class RNActivity extends Activity implements DefaultHardwareBackBtnHandler {

    private ReactRootView rnRootView;
    private ReactInstanceManager rnInstanceManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

//        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
//            if (!Settings.canDrawOverlays(this)) {
//                Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
//                        Uri.parse("package:" + getPackageName()));
//                startActivityForResult(intent, OVERLAY_PERMISSION_REQ_CODE);
//            }
//        }

        rnRootView = new ReactRootView(this);
        Log.i("加载RN模块", "测试");
        ReactInstanceManagerBuilder builder = ReactInstanceManager.builder().setApplication(getApplication())
                .setBundleAssetName("index.android.bundle")
                .setJSMainModuleName("index.android")
                .addPackage(new MainReactPackage())
                .setUseDeveloperSupport(true)
                .setInitialLifecycleState(LifecycleState.RESUMED);

        RNHost host =  (RNHost) ((ReactApplication) getApplication()).getReactNativeHost();

        for (ReactPackage reactPackage : host.packages()) {
            builder.addPackage(reactPackage);
        }

        rnInstanceManager = builder.build();
        rnRootView.startReactApplication(rnInstanceManager, "example", null);

        setContentView(rnRootView);
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }


    @Override
    protected void onPause() {
        super.onPause();

        if (rnInstanceManager != null) {
            rnInstanceManager.onHostPause(this);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();

        if (rnInstanceManager != null) {
            rnInstanceManager.onHostResume(this, this);
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        if (rnInstanceManager != null) {
            rnInstanceManager.onHostDestroy(this);
        }
    }

    @Override
    public void onBackPressed() {

        if (rnInstanceManager != null) {
            rnInstanceManager.onBackPressed();
        } else  {
            super.onBackPressed();
        }
    }


    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {

        if (keyCode == KeyEvent.KEYCODE_MENU && rnInstanceManager != null) {
            rnInstanceManager.showDevOptionsDialog();
            return true;
        }
        return super.onKeyUp(keyCode, event);
    }
}
