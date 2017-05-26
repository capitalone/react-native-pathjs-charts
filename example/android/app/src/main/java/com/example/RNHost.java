package com.example;

import android.app.Application;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.horcrux.svg.RNSvgPackage;

import java.util.Arrays;
import java.util.List;

/**
 * Created by young on 2017/5/10.
 */

public class RNHost extends ReactNativeHost {

    public RNHost(Application application) {
        super(application);
    }

    @Override
    public boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new RNSvgPackage(),
                new ExampleReactPackage()
        );
    }

    public List<ReactPackage> packages() {
        return this.getPackages();
    }
}
