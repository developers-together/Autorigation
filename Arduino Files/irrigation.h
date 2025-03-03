// Irrigation Control

void setRelay() {
    pinMode(RELAY, OUTPUT);
    digitalWrite(RELAY, LOW);
    Serial.println("✅ Relay initialized (OFF state)");
}

void updateTotalSaved() {
    Serial.println("💾 Updating total water saved...");
    totalwatersaved += (totalwatern - totalWaterUsed);
}

float calculateWaterUsed(unsigned long WATERING_TIME) {
    Serial.println("💧 Calculating water usage...");
    
    float durationSec = WATERING_TIME / 1000.0;
    float waterUsed = FLOW_RATE * durationSec; // mL
    totalWaterUsed += waterUsed;
    totalwatern += 1000;

    updateTotalSaved();
    Serial.print("nooooo");
    Serial.println(WATERING_TIME);
    Serial.printf("🚰 Pump ran for: %.2f sec | Water Used: %.2f mL\n", durationSec, waterUsed);
    Serial.printf("📊 Total Water Used Today: %.2f mL\n", totalWaterUsed);

    
    return waterUsed;
}



float irrigate(float temp, float humd, float moist, float rainProb, float hour) {
    Serial.println("🚜 Checking irrigation conditions...");

    bool shouldIrrigate = (moist < minmoisture && rainProb < 70 && (temp > maxtemp && humd < minhumidity || temp <= mintemp));

    //  shouldIrrigate = true;
    // eveningWatered=false;

    if (!morningWatered && hour >= 4 && hour <= 9 && shouldIrrigate) {  // Morning window (4 AM - 9 AM)

       

    // Check weather periodically (non-blocking)
    

        
        Serial.println("🌅 Morning irrigation started...");
        // startTime = millis();
        digitalWrite(RELAY, HIGH);
        delay(WATERING_TIME);
        digitalWrite(RELAY, LOW);
        morningWatered = true;
        
        // pumpDuration = millis() - startTime;
        return calculateWaterUsed(WATERING_TIME);
    }

 
    
    
    if (!eveningWatered && hour >= 16 && hour <= 19 && shouldIrrigate) {  // Evening window (4 PM - 7 PM) //true
    // if (!eveningWatered) { 

        Serial.println("🌇 Evening irrigation started...");
        // startTime = millis();
        digitalWrite(RELAY, HIGH);
        delay(WATERING_TIME);
        digitalWrite(RELAY, LOW);
        eveningWatered = true;
        
        // pumpDuration = millis() - startTime;
        // pumpDuration = WATERING_TIME;
        return calculateWaterUsed(WATERING_TIME);
    }


    
    
    if (hour == 0) {  // Reset flags at midnight
        morningWatered = false;
        eveningWatered = false;
        Serial.println("🌙 Reset irrigation flags for the next day.");
    }
    
    Serial.println("🚫 No irrigation needed at this time.");
    return -100;

}