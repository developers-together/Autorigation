
# AutoRigation

**AutoRigation** is an innovative IoT-based irrigation system designed to optimize water usage by automatically adjusting watering schedules based on real-time sensor data. By monitoring soil moisture, temperature, light, humidity, and weather conditions, AutoRigation delivers the right amount of water at the right time—minimizing waste and ensuring optimal plant health.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Hardware Prototype](#hardware-prototype)
- [Arduino Files](#arduino-files)
- [Web Dashboard](#web-dashboard)
- [Business Model & Supporting Documents](#business-model--supporting-documents)
- [Project Image & Demo Video](#project-image--demo-video)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)

---

## Project Overview

AutoRigation leverages real-time sensor data collected via an Arduino/ESP32-based prototype and a suite of sensors to drive a smart, automated irrigation system. The system collects data on temperature, humidity, soil moisture, light intensity, and even weather conditions to determine the optimal irrigation schedule. Both the hardware (Arduino code) and the web dashboard (React project) work together to maximize water efficiency and promote sustainable water use.

---

## Hardware Prototype

Our hardware prototype consists of:
- A microcontroller (ESP32 or similar) with WiFi capability.
- Multiple sensors including:
  - **DHT22** for temperature and humidity (see [DHT22.h](Arduino%20Files/DHT22.h)).
  - **LDR** for ambient light measurement ([LDR.h](Arduino%20Files/LDR.h)).
  - **Gravity Soil Moisture Sensor** for soil moisture (refer to [sms.h](Arduino%20Files/sms.h)).
- A relay controlling a water pump/valve.
- WiFi connectivity for sending sensor data and receiving commands from Firebase.

Key pin configurations and system parameters are defined in [pins.h](Arduino%20Files/pins.h).

---

## Arduino Files

The repository includes all the Arduino source code necessary to run the AutoRigation prototype:

- **code_crackers.ino**  
  The main Arduino sketch that ties together all functionalities.
  
- **DHT22.h**  
  Handles temperature and humidity readings using the DHT22 sensor.

- **LDR.h**  
  Reads ambient light levels from a photoresistor.

- **irrigation.h**  
  Contains functions for controlling the relay, calculating water usage, and determining when to irrigate.

- **firebase.h**  
  Manages connectivity to Firebase, sending sensor data and receiving configuration updates.

- **pins.h**  
  Defines hardware pin assignments, WiFi credentials, and Firebase configuration parameters.

- **sms.h**  
  Contains functions for interfacing with the soil moisture sensor.

- **timenow.h**  
  Uses NTP to synchronize time.

- **weather.h**  
  Fetches and parses weather data (e.g., rain probability).

---

## Web Dashboard

The web project, built with React, provides a user-friendly dashboard to monitor and configure the AutoRigation system. Key features include:

- **Real-Time Monitoring:**  
  Displays sensor data (temperature, humidity, soil moisture, light) and water usage logs retrieved from Firebase.

- **Parameter Configuration:**  
  Users can adjust irrigation parameters such as flow rate, temperature thresholds, and soil moisture settings through an intuitive UI.

- **API Documentation:**  
  A dedicated page ([ApiDocumentation.jsx](Web/src/ApiDocumentation.jsx)) details the REST API endpoints for sensor data, water usage, system parameters, and more.

- **Connectivity Indicators & Chat Assistant:**  
  The dashboard displays device connectivity status (based on the browser’s network status) and includes a floating Chat Assistant for additional support.

All source code for the web project is located under the `src/` directory. To run the web project, see the [Installation & Setup](#installation--setup) section below.

---

## Business Model & Supporting Documents

The AutoRigation project is supported by a robust business model designed to scale from residential applications to large urban deployments. Key highlights include:

- **Water Conservation & Efficiency:**  
  Significant reductions in water usage and energy consumption.
  
- **Subscription Model:**  
  Premium services such as advanced analytics, AI-driven crop management, and remote monitoring.
  
- **Scalability:**  
  Modular design allowing expansion to smart cities and agricultural deployments.

Supporting documentation included in this repository:
- **Business Model Canvas:** [Autorigation BMC.pdf](./Project%20Files/Autorigation%20BMC.pdf)
- **Project Presentation:** [Code Crackers.pptx](./Project%20Files/Code%20Crackers.pptx)

---

## Project Image & Demo Video 

### Project Image ![AutoRigation Prototype](./Project%20Files/High%20Quality%202160p%204K-0001.png)

### Demo Video Watch our demo video on YouTube to see AutoRigation in action: [YouTube.](https://www.youtube.com/watch?v=DiXg-b4QuAU)
---

## Installation & Setup

### Arduino (Hardware)
1. **Open the Arduino IDE or PlatformIO** and load `code_crackers.ino` from the `Autorigation/Arduino Files/` folder.
2. Update `pins.h` with your own WiFi credentials, Firebase tokens, and pin assignments.
3. Install required libraries:
   - WiFi, Firebase, ArduinoJson, HTTPClient, DHT, Gravity Soil Moisture Sensor libraries, etc.
4. **Upload** the code to your ESP32 or compatible board.

### Web Dashboard
1. **Navigate** to the web project folder:
   ```bash
   cd Autorigation/Web



2.  **Install dependencies**:
    
    ```bash
    npm install
    
    ```
    
3.  **Start the development server**:
    
    ```bash
    npm start
    
    ```
    
4.  Open your browser and visit [http://localhost:3000](http://localhost:3000/).

----------

## Usage

1.  **Power Up** your hardware prototype. Ensure the sensors are connected and the device is online.
2.  The hardware sends real-time sensor data to Firebase.
3.  **Access** the React web dashboard to view live data, water usage logs, and configure irrigation parameters.
4.  Use the dashboard’s features to adjust system settings based on your plant’s needs and monitor water efficiency.
5.  The system automatically adjusts irrigation based on sensor inputs, optimizing water usage and ensuring healthy plant growth.

----------

## Contact & Contributions

If you have any questions, suggestions, or contributions, please open an issue or submit a pull request. Your feedback is welcome!

----------

**AutoRigation**  
_Maximize efficiency, minimize waste, and ensure optimal plant health with smart, data-driven irrigation._
