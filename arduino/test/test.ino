#include "DHT.h"

DHT dht;
float humidity = 0;
float temperature = 0;
int light = 0;
void setup() {
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(9600);
  dht.setup(2); // data pin 
}

// the loop function runs over and over again forever
void loop() {
  delay(dht.getMinimumSamplingPeriod());
  light = analogRead(A0);
  humidity = dht.getHumidity();
  temperature = dht.getTemperature();
  delay(1000);
  Serial.print("{");
  Serial.print("\"light\":"+String(light)+",");
  Serial.print("\"humidity\":"+String(humidity)+",");
  Serial.print("\"temperature\":"+String(temperature));
  Serial.println("}");
}
