// photo resitor setup
// #define LDR_PIN 32

void ldrsetup() {
    pinMode(LDR_PIN, INPUT);
    delay(100);  // Small delay to stabilize readings

    int testValue = analogRead(LDR_PIN);
    if (testValue == -1) {  // -1 means an error in most cases
        Serial.println("❌ LDR sensor error: No response!");
    } else {
        Serial.println("✅ LDR sensor is working!");
    }
}

// Get raw light value
float getLightLevel() {
    float lightLevel = analogRead(LDR_PIN);
    Serial.print("💡 Light Level: ");
    Serial.println(lightLevel);
    return lightLevel;
}

// Get light percentage (0-100%)
float getLightPercentage() {
    float rawValue = analogRead(LDR_PIN);
    float percentage =100 -( (rawValue / 4095.0) * 100);  // Convert to percentage
    Serial.print("🔆 Light Percentage: ");
    Serial.print(percentage);
    Serial.println("%");

    return percentage;
}