


// ==============================================================
// Pins Configuration File
// ==============================================================

#define DHTPIN 25  
#define LDR_PIN 32
#define SMSPIN 33 
#define RELAY 22

// ==============================================================
// WiFi Configuration
// ==============================================================

#define WIFI_SSID "shehab"
#define WIFI_PASSWORD "vvvvvvvv"

// ==============================================================
// Firebase Configuration
// ==============================================================

#define AUTH_TOKEN "AIzaSyBy0MWQWGOAlrSWasHzGpCP9OZP3Dv2Qzo"
#define REFERENCE_URL "https://code-crackers-54bb0-default-rtdb.europe-west1.firebasedatabase.app/"

const String datad = "/data/";
const String mond = "/monitor/";
const String params = "/params/";
const String total = "/total/";

// ==============================================================
// Time Configuration
// ==============================================================

const char* ntpServer = "0.arch.pool.ntp.org";
const long gmtOffset_sec = 0;
const int daylightOffset_sec = 3600;

// ==============================================================
// Weather Configuration
// ==============================================================

const String API_KEY = "37ffb81220d661ddafb0e5925b54c453";
const String CITY = "Cairo,EG";
String URL = "http://api.openweathermap.org/data/2.5/forecast?q=Cairo,EG&appid=37ffb81220d661ddafb0e5925b54c453";

unsigned long previousMillis = 0;
unsigned long currentMillis = 0;
const long interval = 1000 * 60 * 60 * 1;

float rainProb;

// ==============================================================
// Serial Monitor Configuration
// ==============================================================

void serialSetup() {
    Serial.begin(115200);
}

// ==============================================================
// Irrigation Configuration
// ==============================================================

bool morningWatered = false;
bool eveningWatered = false;



unsigned long startTime = 0;
// unsigned long pumpDuration = WATERING_TIME;
float totalWaterUsed = 0;
float totalwatersaved = 0;
float waterUsedValue = 0;
float totalwatern=0;

long waterpreviousMillis;
long watercurrentMillis;
const long waterinterval = 1000 * 60 *15;


//============================================================||
// cloud variables                                            ||
//============================================================||

int FLOW_RATE = 250;


int fbwatertime = 1;

long WATERING_TIME = 1000 * fbwatertime;

int mintemp =30;

int maxtemp = 30;
int minhumidity = 40;

int minmoisture = 30;

