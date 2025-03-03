#include <Arduino.h>
#include "gravity_soil_moisture_sensor.h"

GravitySoilMoistureSensor gravity_sensor;

// #define SMSPIN 33  // remember it's analog

void smsetup() {
    pinMode(SMSPIN, INPUT);  // Set pin mode

    int attempts = 3;
    while (!gravity_sensor.Setup(SMSPIN) && attempts > 0) {
        Serial.println("⚠️ Sensor not detected, retrying...");
        delay(1000);  // Wait 1 second before retrying
        attempts--;
    }

    if (attempts == 0) {
        Serial.println("❌ Gravity Soil Moisture Sensor failed to initialize.");
    } else {
        Serial.println("✅ Gravity Soil Moisture Sensor initialized.");
    }
}

// Get raw soil moisture value
int getSoilMoisture() {
    int value = gravity_sensor.Read();

    if (value == -1) {
        Serial.println("❌ Failed to read soil moisture!");
        return -1;
    }

    Serial.printf("💧 Soil Moisture: %d\n", value);
    return value;
}

// Get soil moisture percentage (0-100%)
float getSoilMoisturePercentage() {
    int rawValue = gravity_sensor.Read();
    if (rawValue == -1) {
        Serial.println("❌ Failed to read soil moisture!");
        return -1;
    }

    float percentage = (rawValue / 4095.0) * 100;  // Convert to percentage
    Serial.printf("💧 Soil Moisture: %.2f%%\n", percentage);
    return percentage;
    // return 20;
}