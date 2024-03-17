/**
  ΝΕΚΤΑΡΙΟΣ ΚΟΝΤΟΛΑΙΜΑΚΗΣ - ΕΑΠ - ΠΛΗ 40

  Board: esp32 --> ESP32 Dev Module
  Port: COM5
  Folder: D:\_ΕΑΠ_ΠΛΗΡΟΦΟΡΙΚΗ\ΠΛΗ_40\ESP32\ESP32_DS18B20_with_SCT-013-020
  Στο Clamp το βέλος δείχνει προς το ESP32
  το καλώδιο ακουμπάει στην πάνω και έξω γωνία του Clamp
**/

#include <WiFi.h>                     // Βιβλιοθήκη για σύνδεση με WiFi
#include "ThingSpeak.h"               // Βιβλιοθήκη για σύνδεση με ThingSpeak
#include <OneWire.h>                  // Βιβλιοθήκη για αισθητήρες θερμοκρασίας
#include <DallasTemperature.h>        // Βιβλιοθήκη για αισθητήρες θερμοκρασίας
#include "EmonLib.h"                  // Βιβλιοθήκη Emon για αισθητήρα ηλεκτρικού ρεύματος
EnergyMonitor emon1;                  // Δημιουργία στιγμιότυπου

// WiFi σπιτιού
const char* ssid = "cosmosdeco";      // your network SSID (name) 
const char* password = "maratonia";   // your network password

// WiFi Εργαστηριακού Κέντρου Νεάπολης
// const char* ssid = "office";   // your network SSID (name) 
// const char* password = "administrator@56";   // your network password

WiFiClient client;

// ThingSpeak κανάλι για τις Θερμοκρασίες
unsigned long myChannelNumber = 2274990;
const char * myWriteAPIKey = "U9WX15Y14WWFAN15";

// ThingSpeak κανάλι για την Ένταση του ρεύματος και on/off
unsigned long myChannelNumberC = 2277637;
const char * myWriteAPIKeyC = "6ENRLT09OV5ITA6C";

// Timer variables
unsigned long lastTime = 0;
unsigned long timerDelay = 5000;

const int numAverages = 3;  // Αριθμός μετρήσεων για υπολογισμό Μέσου Όρου
int on; // Μεταβλητή που δείχνει αν είναι ανοικτός ή κλειστός ο Συμπιεστής

//------------------------------------------------

// Data wire for three (3) temperature sensors is plugged TO GPIO 4
#define ONE_WIRE_BUS 4

// Setup a oneWire instance to communicate with any OneWire devices (not just Maxim/Dallas temperature ICs)
OneWire oneWire(ONE_WIRE_BUS);

// Pass our oneWire reference to Dallas Temperature. 
DallasTemperature sensors(&oneWire);

int numberOfDevices; // Αριθμός συσκευών που βρέθηκαν
DeviceAddress tempDeviceAddress; // Μεταβλητή για διεύθυνση αισθητήρα θερμοκρασίας

void setup(){
  Serial.begin(9600);
  pinMode(34, INPUT); // Στο pin=34 διαβάζω την Ένταση του ηλεκτρικού ρεύματος

  emon1.current(34, 15);     // Current: input pin=34, calibration=15.
  // με calibration=22 ταιριάζει η ένδειξη με την αμπεροτσιμπίδα (Μέσος Όρος 10 μετρήσεων)
  // κανονικά θέλει calibration=20 γιατί 20Α δίδει έξοδο 1V
  // !!! GRD = pin near 23
  // Αν περάσω το καλώδιο 2 φορές τότε calibration = 7.5 (15 διά 2= 7.5)
  // Αν περάσω το καλώδιο 3 φορές τότε calibration = 5 (15 διά 3= 5 ) κοκ
  
  sensors.begin(); // Εκκίνηση βιβλιοθήκης για αισθητήρες θερμοκρασίας
  
  // Grab a count of devices on the wire (number of temperature sensors)
  numberOfDevices = sensors.getDeviceCount();
  
  // locate devices on the bus
  Serial.print("Locating devices...");
  Serial.print("Found ");
  Serial.print(numberOfDevices, DEC);
  Serial.println(" devices.");

  // Loop through each device, print out address
  for(int i=0;i<numberOfDevices; i++){
    // Search the wire for address
    if(sensors.getAddress(tempDeviceAddress, i)){
      Serial.print("Found device ");
      Serial.print(i, DEC);
      Serial.print(" with address: ");
      printAddress(tempDeviceAddress);
      Serial.println();
    } else {
      Serial.print("Found ghost device at ");
      Serial.print(i, DEC);
      Serial.print(" but could not detect address. Check power and cabling");
    }
  }

  ThingSpeak.begin(client);  // Αρχικοποίηση ThingSpeak

  WiFi.mode(WIFI_STA);   
  WiFi.begin(ssid, password);
  Serial.println("");

  // Αναμονή για σύνδεση με WiFi
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void loop(){
  float tempC[3]; // Πίνακας για τις 3 θερμοκρασίες
  
  sensors.requestTemperatures(); // Send the command to get temperatures
  
  // Loop through each device, print out temperature data
  for(int i=0;i<numberOfDevices; i++){
    // Search the wire for address
    if(sensors.getAddress(tempDeviceAddress, i)){
      // Output the device ID
      Serial.print("Temperature for device: ");
      Serial.println(i,DEC);
      // Print the data
      tempC[i] = sensors.getTempC(tempDeviceAddress);
      Serial.print("Temp C");
      Serial.print(i);
      Serial.print(": ");
      Serial.println(tempC[i]);
      // Serial.print(" Temp F: ");
      // Serial.println(DallasTemperature::toFahrenheit(tempC[i])); // Converts tempC to Fahrenheit
    }
  }

  // get Current
  float Irms = emon1.calcIrms(1480);  // 1480 Calculate Irms only, number of samples=8900 or 5588 ?? other example
  //Irms = Irms-0.30;

  Serial.println("-----------Current-------------");
  // Serial.print("Power= ");
  // Serial.print(Irms*230.0);	       // Apparent power
  // Serial.print(" ");
  Serial.print("Irms= ");
  Serial.println(Irms, 2);		       // Irms= Root mean square current (Ampere) - 2 decimal digits

   // Calculate and print average of last three measurements
  static float averageMeasurements[numAverages] = {0};
  static int currentIndex = 0;
  averageMeasurements[currentIndex] = Irms;
  currentIndex = (currentIndex + 1) % numAverages;
  float avg = 0.0;
  for (int i = 0; i < numAverages; i++) {
    avg += averageMeasurements[i];
  }
  avg /= numAverages;
  Serial.print("Average of Last 3 Measurements: ");
  Serial.print(avg, 2);
  Serial.println(" A");


  if ((millis() - lastTime) > timerDelay) {
    //Connect or reconnect to WiFi
    if(WiFi.status() != WL_CONNECTED){
      Serial.print("Attempting to connect");
      while(WiFi.status() != WL_CONNECTED){
        WiFi.begin(ssid, password); 
        delay(5000);     
      } 
      Serial.println("\nConnected.");
    }

    // έλεγχος αν δουλεύει (on) ή όχι (off) ο συμπιεστής
    if(Irms > 0.24) { on = 1; } 
    else {on = 0; Irms = 0.0; }
    
    ThingSpeak.setField(2, on);
    ThingSpeak.setField(1, Irms);
    int x2 = ThingSpeak.writeFields(myChannelNumberC, myWriteAPIKeyC);
    if(x2 == 200){
      Serial.println("Channel Current update successful.");
      Serial.println("----------------------------");
    }
    else{
      Serial.println("Problem updating Current channel. HTTP error code " + String(x2));
    }
    
    ThingSpeak.setField(1, tempC[0]);
    ThingSpeak.setField(2, tempC[1]);
    ThingSpeak.setField(3, tempC[2]);
    // //ThingSpeak.setField(3, DallasTemperature::toFahrenheit(tempC[0]));

    // Write to ThingSpeak. There are up to 8 fields in a channel, allowing you to store up to 8 different
    // pieces of information in a channel.
    int x = ThingSpeak.writeFields(myChannelNumber, myWriteAPIKey);
    //int x = ThingSpeak.writeField(myChannelNumber, 1, temperatureF, myWriteAPIKey);
    if(x == 200){
      Serial.println("Channel DS18B20 update successful.");
      Serial.println("----------------------------");
    }
    else{
      Serial.println("Problem updating DS18B20 channel. HTTP error code " + String(x));
    }
    lastTime = millis();
  }
  
  // το ελάχιστο χρονικό διάστημα για νέες τιμές στο ThingSpeak είναι 15 secs...
  delay(2000); // Παίρνω μέτρηση κάθε 2 sec
}

// function to print a device address
void printAddress(DeviceAddress deviceAddress) {
  for (uint8_t i = 0; i < 8; i++){
    if (deviceAddress[i] < 16) Serial.print("0");
      Serial.print(deviceAddress[i], HEX);
  }
}
