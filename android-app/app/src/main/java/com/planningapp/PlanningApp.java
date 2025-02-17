package com.planningapp;

import android.app.Application;
import com.jakewharton.threetenabp.AndroidThreeTen;

public class PlanningApp extends Application {
    
    @Override
    public void onCreate() {
        super.onCreate();
        
        // Initialize date/time library
        AndroidThreeTen.init(this);
        
        // Initialize other app-wide dependencies here
    }
} 