// #include <HTTPClient.h>

// int parseWeatherData(String json) {

//    Serial.println("starting /weather/parseWeatherData");

//   DynamicJsonDocument doc(4096); // Adjust buffer size based on response
//   DeserializationError error = deserializeJson(doc, json);

//   if (error) {
//     Serial.print("JSON parsing failed: ");
//     Serial.println(error.c_str());
//     return -10;
//   }

//   // Extract the first forecast entry (next 3 hours)
//   JsonObject firstEntry = doc["list"][0];

//   // Get probability of precipitation (0 to 1, convert to percentage)
//   float pop = firstEntry["pop"]; // e.g., 0.25 = 25% chance of rain
//   int rainProbability = pop * 100;

//   Serial.print("Rain Probability (next 3 hours): ");
//   Serial.print(rainProbability);
//   Serial.println("%");

//   return rainProbability;
// }


// int getrain(){

//   Serial.println("starting /weather/getrain");

//       HTTPClient http;

//     http.begin(URL); // Use http.begin(URL) for HTTP, or WiFiClientSecure for HTTPS

//     int httpCode = http.GET();

//     Serial.println("getrain is excuting");

//     if (httpCode == HTTP_CODE_OK) {
//       String payload = http.getString();
//      int rain = parseWeatherData(payload);

//     http.end();

//     return rain;

//     } 
    
//     else {
//       Serial.printf("HTTP request failed. Error code: %d\n", httpCode);
//     }

//     http.end();

// }


// int getrainProb(){

//   Serial.println("starting /weather/getrainProb");

//   currentMillis = millis();

//   // 1. Check weather periodically (non-blocking)
//   if (currentMillis - previousMillis >= interval) {

//     previousMillis = currentMillis;
//     int rain1 = getrain();
//     return rain1;
//   }

// }


#include <HTTPClient.h>
// #include <ArduinoJson.h>

void parseWeatherData(String json) {
    Serial.println("Starting /weather/parseWeatherData");

    DynamicJsonDocument doc(2048); // Reduced buffer size for efficiency
    DeserializationError error = deserializeJson(doc, json);

    if (error) {
        Serial.print("JSON parsing failed: ");
        Serial.println(error.c_str());
        // return -1; // Return -1 to indicate an error
    }

    // Extract the first forecast entry (next 3 hours)
    JsonObject firstEntry = doc["list"][0];

    // Get probability of precipitation (0 to 1, convert to percentage)
    float pop = firstEntry["pop"]; // Example: 0.25 = 25% rain probability
    int rainProbability = pop * 100;

    Serial.print("Rain Probability (next 3 hours): ");
    Serial.print(rainProbability);
    Serial.println("%");
    rainProb = rainProbability;
    // return rainProbability;
}

int getrain() {
    Serial.println("Starting /weather/getrain");

    if (WiFi.status() != WL_CONNECTED) {
        Serial.println("WiFi not connected! Cannot fetch weather data.");
        return -1; // Return error if no WiFi
    }

    HTTPClient http;
    http.begin(URL); 

    int httpCode = http.GET();

    Serial.println("getrain is executing...");

    if (httpCode > 0) {  // Check if HTTP request succeeded
        Serial.printf("HTTP response code: %d\n", httpCode);
        
        if (httpCode == HTTP_CODE_OK) {
            String payload = http.getString();
            http.end(); // Close connection

            // return 
            parseWeatherData(payload);
        } else {
            Serial.printf("Failed to get valid response. HTTP Code: %d\n", httpCode);
        }
    } else {
        Serial.println("HTTP request failed.");
    }

    http.end();
    // return -1; // Return -1 if the request failed
}

void getrainProb() {
    Serial.println("Starting /weather/getrainProb");

    currentMillis = millis();

    // Check weather periodically (non-blocking)
    if (currentMillis - previousMillis >= interval) {
        previousMillis = currentMillis;
        int rain1 = getrain();
        //  return rain1;
    }

     // Return the last known rain probability
}