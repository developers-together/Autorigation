#include "DHT.h"

// #define DHTPIN 25     

// #define DHTTYPE DHT22   

DHT dht(DHTPIN, DHT22);

void dhtsetup(){

    dht.begin();


}

float getTemperature() {

  
    float temperature = dht.readTemperature();
    if (isnan(temperature)) {
        Serial.println("❌ Failed to read temperature!");
        return -1;  // Return error code
    }
    Serial.print("🌡 Temperature: ");
    Serial.println(temperature);
    return temperature;
    // return 40;
}

// Function to get Humidity
float getHumidity() {
    float humidity = dht.readHumidity();
    if (isnan(humidity)) {
        Serial.println("❌ Failed to read humidity!");
        return -1;
    }
    Serial.print("💧 Humidity: ");
    Serial.print(humidity);
    Serial.println("%");
    return humidity;
    // return 20;
}

