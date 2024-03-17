/*
  ΕΑΠ - ΠΛΗ40 - ΠΤΥΧΙΑΚΗ ΕΡΓΑΣΙΑ
  ΦΟΙΤΗΤΗΣ: ΝΕΚΤΑΡΙΟΣ ΚΟΝΤΟΛΑΙΜΑΚΗΣ
  ΕΠΙΒΛΕΠΩΝ: ΣΓΟΥΡΟΣ ΝΙΚΟΛΑΟΣ
*/

// Upload στο ESP32-CAM
// Board: esp32 --> esp32 -> AI Thinker ESP32-CAM !!!!!!!!!!!
// Port: COM6

// Περιστροφή φακού ανάποδα φορά ρολογιού = πιο κοντά η κάμερα στην εικόνα !!!!

#include <Arduino.h>
#include <WiFi.h>
#include "soc/soc.h"
#include "soc/rtc_cntl_reg.h"
#include "esp_camera.h"

const char* ssid = "cosmosdeco";
const char* password = "maratonia";

//String serverName = "192.168.1.XXX";   // REPLACE WITH YOUR Raspberry Pi IP ADDRESS
String serverName = "moodle.nkdevelopment.net";   // OR REPLACE WITH YOUR DOMAIN NAME
String serverPath = "/upload.php";     // The default serverPath should be upload.php

const int serverPort = 80;

WiFiClient client;

// CAMERA_MODEL_AI_THINKER
#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27
#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22

const int timerInterval = 4000;    // time between each HTTP POST image
unsigned long previousMillis = 0;   // last time image was sent

void setup() {
  WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0); 
  Serial.begin(115200);

  WiFi.mode(WIFI_STA);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);  
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("ESP32-CAM IP Address: ");
  Serial.println(WiFi.localIP());

  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;
  config.grab_mode = CAMERA_GRAB_LATEST; // για να στέλνει την τελευταία εικόνα από buffer

  // init with high specs to pre-allocate larger buffers
  if(psramFound()){ // εάν υφίσταται ψευδο ram
    config.frame_size = FRAMESIZE_SVGA;
    config.jpeg_quality = 8;  //0-63 lower number means higher quality, default=10
    config.fb_count = 2; 
    Serial.println("inside FRAMESIZE_SVGA");
  } else {
    config.frame_size = FRAMESIZE_CIF;
    config.jpeg_quality = 10;  //0-63 lower number means higher quality, default=10
    config.fb_count = 1;
  }
  
  // camera init
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x", err);
    delay(1000);
    ESP.restart();
  }

  sendPhoto(); 
}

void loop() {
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= timerInterval) {
    sendPhoto();
    previousMillis = currentMillis;
  }
}

String sendPhoto() {
  Serial.println("inside sendPhoto");
  String getAll;
  String getBody;

  camera_fb_t * fb = NULL; // fb: frame buffer
  fb = esp_camera_fb_get();
  if(!fb) {
    Serial.println("Camera capture failed");
    delay(500);
    ESP.restart();
  }

  // Crop image (frame buffer, cropLeft, cropRight, cropTop, cropBottom)
  // crop_image(fb, 50, 50, 250, 150);
  
  Serial.println("Connecting to server: " + serverName);

  if (client.connect(serverName.c_str(), serverPort)) {
    Serial.println("Connection successful!");    
    String head = "--NektariosK\r\nContent-Disposition: form-data; name=\"imageFile\"; filename=\"my-esp32-cam.jpg\"\r\nContent-Type: image/jpeg\r\n\r\n";
    String tail = "\r\n--NektariosK--\r\n";

    uint32_t imageLen = fb->len;
    uint32_t extraLen = head.length() + tail.length();
    uint32_t totalLen = imageLen + extraLen;
  
    client.println("POST " + serverPath + " HTTP/1.1");
    client.println("Host: " + serverName);
    client.println("Content-Length: " + String(totalLen));
    client.println("Content-Type: multipart/form-data; boundary=NektariosK");
    client.println();
    client.print(head);
  
    uint8_t *fbBuf = fb->buf;
    size_t fbLen = fb->len;
    for (size_t n=0; n<fbLen; n=n+1024) {
      if (n+1024 < fbLen) {
        client.write(fbBuf, 1024);
        fbBuf += 1024;
      }
      else if (fbLen%1024>0) {
        size_t remainder = fbLen%1024;
        client.write(fbBuf, remainder);
      }
    }   
    client.print(tail);
    
    esp_camera_fb_return(fb);
    
    int timoutTimer = 2000;
    long startTimer = millis();
    boolean state = false;
    
    while ((startTimer + timoutTimer) > millis()) {
      Serial.print(".");
      delay(100);      
      while (client.available()) {
        char c = client.read();
        if (c == '\n') {
          if (getAll.length()==0) { state=true; }
          getAll = "";
        }
        else if (c != '\r') { getAll += String(c); }
        if (state==true) { getBody += String(c); }
        startTimer = millis();
      }
      if (getBody.length()>0) { break; }
    }
    Serial.println();
    client.stop();
    Serial.println(getBody);
  }
  else {
    getBody = "Connection to " + serverName +  " failed.";
    Serial.println(getBody);
  }
  return getBody;
}



// void crop_image(camera_fb_t *fb, unsigned short cropLeft, unsigned short cropRight, unsigned short cropTop, unsigned short cropBottom)
// {
//     unsigned int maxTopIndex = cropTop * fb->width * 2;
//     unsigned int minBottomIndex = ((fb->width*fb->height) - (cropBottom * fb->width)) * 2;
//     unsigned short maxX = fb->width - cropRight; // In pixels
//     unsigned short newWidth = fb->width - cropLeft - cropRight;
//     unsigned short newHeight = fb->height - cropTop - cropBottom;
//     size_t newJpgSize = newWidth * newHeight *2;

//     unsigned int writeIndex = 0;
//     // Loop over all bytes
//     for(int i = 0; i < fb->len; i+=2){
//         // Calculate current X, Y pixel position
//         int x = (i/2) % fb->width;

//         // Crop from the top
//         if(i < maxTopIndex){ continue; }

//         // Crop from the bottom
//         if(i > minBottomIndex){ continue; }

//         // Crop from the left
//         if(x <= cropLeft){ continue; }

//         // Crop from the right
//         if(x > maxX){ continue; }

//         // If we get here, keep the pixels
//         fb->buf[writeIndex++] = fb->buf[i];
//         fb->buf[writeIndex++] = fb->buf[i+1];
//     }

//     // Set the new dimensions of the framebuffer for further use.
//     fb->width = newWidth;
//     fb->height = newHeight;
//     fb->len = newJpgSize;
// }




