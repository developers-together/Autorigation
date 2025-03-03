

// Main File

#include "pins.h"
#include "DHT22.h"
#include "LDR.h"
#include "sms.h"
#include "irrigation.h"
#include "firebase.h"
#include "timenow.h"
#include "weather.h"

int hour;
// int rainProb;

void setup() {
    serialSetup();
    initializeFirebase();
    delay(1000);
    dhtsetup();
    ldrsetup();
    smsetup();
    settime();
    setRelay();
    delay(1000);
    
    
}

void loop() {

    getParams();

    float temp = getTemperature();
    float humd = getHumidity();
    float light = getLightPercentage();
    float moist = getSoilMoisturePercentage();
    String timestamp = printLocalTime();
   hour = timestamp.substring(11, 13).toInt();
     getrainProb();

    // moist = 20;
    hour = 17;
    // rainProb = 12;

    Serial.printf("Rain Probability: %d%%\n", rainProb);
    sendData(temp, humd, light, moist, rainProb, timestamp);
    Serial.printf("Current Hour: %d\n", hour);

    Serial.println("Starting irrigation check...");

    float waterUsed = 0;

    if (hour >= 16 && hour <= 19 || hour >= 4 && hour <= 9)
    {
      waterUsed = irrigate(temp, humd, moist, rainProb, hour);
    }
    sendMonitoringData(waterUsed, timestamp);
    sendtotal();
}