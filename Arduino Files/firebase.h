
// // #include <FirebaseClient.h>
// // #include <FirebaseConfig.h>

// //WIFI_SSID
// //WIFI_PASSWORD
// //===============================================================

// #include <WiFi.h>
// #include <WiFiClientSecure.h>
// #include <Firebase.h>
// #include <ArduinoJson.h>




// Firebase fb(REFERENCE_URL,AUTH_TOKEN);

// void setfirebase(){

 



//   Serial.println();
//   Serial.println();
//   Serial.print("Connecting to: ");
//   Serial.println(WIFI_SSID);
//   WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

//   while (WiFi.status() != WL_CONNECTED) {
//     Serial.print("-");
//     delay(500);
//   }

//   Serial.println();
//   Serial.println("WiFi Connected");
//   Serial.println();


// }

// //"/test/"


// void sendata(float temp, float humd, float light, float moist,int rain, String timetf){

//    Serial.println("sending data used to firebase");

//   JsonDocument docOutput;

//   // String timetf = printLocalTime();

//   docOutput["temperature"] = temp;
//   docOutput["humidity"] = humd;
//   docOutput["light"] = light;
//   docOutput["moisture"] = moist;
//   docOutput["rainProbability"] = rain;
  
//   String output;

//    docOutput.shrinkToFit();

//    serializeJson(docOutput, output);

//     Serial.print("pushing data to firebase");

//    fb.pushJson(datad+timetf ,output);

//    return;
// }


// void sendmon(float waterusedtf, String timetf){

// Serial.println("sending water used to firebase");

// totalsaved();

// JsonDocument doctotalmon;

// doctotalmon["totalWaterUsed"]= totalWaterUsed;

// doctotalmon["totalWaterSaved"]= totalwatern;

// String totalmonoutput;

//    doctotalmon.shrinkToFit();

//    serializeJson(doctotalmon, totalmonoutput);
  

// fb.setJson(mond ,totalmonoutput);


//  JsonDocument docmon;

//   docmon["waterused"]= waterusedtf;

//     String monoutput;

//    docmon.shrinkToFit();

//    serializeJson(docmon, monoutput);
  

// fb.pushJson(mond+timetf ,monoutput);



// }

// //============================================================================



// // WiFiClientSecure ssl;
// // DefaultNetwork network;
// // AsyncClientClass client(ssl, getNetwork(network));

// // FirebaseApp app;
// // RealtimeDatabase Database;
// // AsyncResult result;
// // LegacyToken dbSecret(DATABASE_SECRET);

// // #include <WiFi.h>
// // #include <WiFiClientSecure.h>

// // #include <FirebaseClient.h>
// // #include <FirebaseConfig.h>

// // #define WIFI_SSID "shehab3"
// // #define WIFI_PASSWORD "JT642#@m"

// // #define DATABASE_SECRET "AIzaSyBy0MWQWGOAlrSWasHzGpCP9OZP3Dv2Qzo"
// // #define DATABASE_URL "https://code-crackers-54bb0-default-rtdb.europe-west1.firebasedatabase.app/"

// // WiFiClientSecure ssl;
// // DefaultNetwork network;
// // AsyncClientClass client(ssl, getNetwork(network));

// // FirebaseApp app;
// // RealtimeDatabase Database;
// // AsyncResult result;
// // LegacyToken dbSecret(DATABASE_SECRET);

// // void firesetup(){

// //       Serial.begin(115200);
// //     WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

// //     Serial.print("Connecting to Wi-Fi");
// //     while (WiFi.status() != WL_CONNECTED)
// //     {
// //         Serial.print(".");
// //         delay(300);
// //     }

// //   Serial.println();
// //     Serial.print("Connected with IP: ");
// //     Serial.println(WiFi.localIP());
// //     Serial.println();

// //     Firebase.printf("Firebase Client v%s\n", FIREBASE_CLIENT_VERSION);

// //     ssl.setInsecure();

// //     // Initialize the authentication handler.
// //     Serial.println("Initializing the app...");
// //     initializeApp(client, app, getAuth(dbSecret));

// //     // Binding the authentication handler with your Database class object.
// //     app.getApp<RealtimeDatabase>(Database);

// //     // Set your database URL (requires only for Realtime Database)
// //     Database.url(DATABASE_URL);

// //         // In sync functions, we have to set the operating result for the client that works with the function.
// //     client.setAsyncResult(result);
// // }

// // void sendData(String path, int value) {
// //     // Database.loop();
// //     AsyncResult sendResult;
// //     Database.set<int>(client, path, value, sendResult);

// //     if (sendResult.error() == 0) {
// //         Serial.println("Data sent successfully!");
// //     } else {
// //         Serial.println("Error sending data: " + sendResult.error().message());
// //     }
// // }


// // int getData(String path) {
// //     // Database.loop();
// //     AsyncResult getResult;
// //     int value = 0;

// //     Database.get<int>(client, path, getResult);
// //     if (getResult.error() == 0) {
// //         value = getResult.to<int>();
// //         Serial.println("Received Data: " + String(value));
// //     } else {
// //         Serial.println("Error getting data: " + getResult.error().message());
// //     }

// //     return value;
// // }


// // void updateData(String path, int newValue) {
// //     // Database.loop();
// //     AsyncResult updateResult;

// //     Database.update<int>(client, path, newValue, updateResult);
// //     if (updateResult.error() == 0) {
// //         Serial.println("Data updated successfully!");
// //     } else {
// //         Serial.println("Error updating data: " + updateResult.error().message());
// //     }
// // }

// // void firesetup() {
    
    
// //     // Connect to WiFi
// //     WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
// //     Serial.print("Connecting to Wi-Fi");
    
// //     while (WiFi.status() != WL_CONNECTED) {
// //         Serial.print(".");
// //         delay(300);
// //     }
    
// //     Serial.println("\nConnected with IP: " + WiFi.localIP().toString());

// //     // Secure connection (may be required for some Firebase clients)
// //     ssl.setInsecure(); 

// //     // Initialize Firebase
// //     Serial.println("Initializing Firebase...");
// //     initializeApp(client, app, getAuth(dbSecret));
// //     app.getApp<RealtimeDatabase>(Database);
// //     Database.url(DATABASE_URL);
    
// //     // Set async result handler
// //     client.setAsyncResult(result);

// //     Serial.println("🔥 Firebase Ready!");
// // }


// // void sendData(String path, int value) {
// //     AsyncResult sendResult;
// //     Database.set<int>(client, path, value, sendResult);

    
// // }


// // int getData(String path) {
// //     AsyncResult getResult;
// //     int value = 0;

// //     Database.get<int>(client, path, getResult);
    

// //     return value;
// // }


// // void updateData(String path, int newValue) {
// //     AsyncResult updateResult;
// //     Database.set<int>(client, path, newValue, updateResult);  // Use `set()` instead of `update()`

    
// // }


#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <Firebase.h>
#include <ArduinoJson.h>

Firebase fb(REFERENCE_URL,AUTH_TOKEN);

void initializeFirebase() {
    Serial.println("\n🔗 Connecting to WiFi...");
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    
    while (WiFi.status() != WL_CONNECTED) {
        Serial.print(".");
        delay(500);
    }
    
    Serial.println("\n✅ WiFi Connected");
}


void getParams() {

   Serial.println("retrieving data from Firebase");
    
    String input = fb.getJson(total);

    if (input == "NULL") {
    Serial.println("Could not retrieve data from Firebase");
  } else {
    // Create a JSON document to hold the deserialized data
    JsonDocument docInput;

    // Deserialize the JSON string into the JSON document
    DeserializationError error = deserializeJson(docInput, input);

    if (error) {
      Serial.print("deserializeJson() failed: ");
      Serial.println(error.c_str());
      return;
    }

    int x = docInput["totalWaterSaved"];
    totalwatersaved = (float)x;
    Serial.print("total water saved: ");
    Serial.println(totalwatersaved);

    totalWaterUsed = docInput["totalWaterUsed"];
        Serial.print("total water used: ");
    Serial.println(totalWaterUsed);

    /*
    
    int FLOW_RATE = 250;


int fbwatertime = 1;

long WATERING_TIME = 1000 * fbwatertime;

int mintemp =30;

int maxtemp = 30;
int minhumidity = 40;

int minmoisture = 30;


    */

    // f

     input = fb.getJson(params);

     error = deserializeJson(docInput, input);

    if (error) {
      Serial.print("deserializeJson() failed: ");
      Serial.println(error.c_str());
      return;
    }

        minmoisture = docInput["minmoisture"];
    minhumidity = docInput["minhumidity"];
    maxtemp = docInput["maxtemp"];
    mintemp = docInput["mintemp"];
    // WATERING_TIME = docInput["WATERING_TIME"];
    FLOW_RATE = docInput["FLOW_RATE"];
   

    fbwatertime = docInput["fbwatertime"];
            Serial.print("fbwatertime fbwatertime: ");
    Serial.println(fbwatertime);

     Serial.print("FLOW_RATE FLOW_RATE: ");
    Serial.println(FLOW_RATE);
}

}

void sendData(float temp, float humd, float light, float moist, int rain, String timestamp) {
    Serial.println("📤 Sending sensor data to Firebase...");
    
    JsonDocument doc;
    doc["temperature"] = temp;
    doc["humidity"] = humd;
    doc["light"] = light;
    doc["moisture"] = moist;
    doc["rainProbability"] = rain;
    
    String output;
    serializeJson(doc, output);
    
    if (fb.pushJson(datad + timestamp, output)) {
        Serial.println("✅ Data sent successfully");
    } else {
        Serial.println("❌ Failed to send data to Firebase");
    }
}

void sendMonitoringData(float waterUsed, String timestamp) {
    Serial.println("📤 Sending water usage data to Firebase...");
    
        JsonDocument waterDoc;
    waterDoc["waterUsed"] = waterUsed;
    
    String waterOutput;
    serializeJson(waterDoc, waterOutput);
    
    if (fb.pushJson(mond + timestamp, waterOutput)) {
        Serial.println("✅ Water usage recorded");
    } else {
        Serial.println("❌ Failed to send water usage data");
    }

}

void sendtotal(){

  Serial.println("📤 Sending total to Firebase...");

      JsonDocument totalDoc;
    totalDoc["totalWaterUsed"] = totalWaterUsed;
    totalDoc["totalWaterSaved"] = totalwatersaved;
    
    String totalOutput;
    serializeJson(totalDoc, totalOutput);
    
    if (fb.setJson(total, totalOutput)) {
        Serial.println("✅ Monitoring data updated");
    } else {
        Serial.println("❌ Failed to update monitoring data");
    }
}



