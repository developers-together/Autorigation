
#include "time.h"
#include "esp_sntp.h"

void settime() {

  Serial.println("starting /timenow/settime");
  // Initialize time and get the current time
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
  Serial.println("Time synchronized!");
}


String printLocalTime() {

  Serial.println("starting /timenow/printLocalTime");

  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    Serial.println("Failed to obtain time");
    printLocalTime();
    return "";
  }

  char timeString[30];
  strftime(timeString, sizeof(timeString), "%Y-%m-%d_%H-%M-%S", &timeinfo);

  Serial.println(timeString);  // Print formatted time
  
  return String(timeString);  // Return the formatted time as a String
}

