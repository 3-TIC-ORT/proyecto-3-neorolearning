// otro codigo (terminar simon says)
#define red 8
#define yellow 9
#define green 10
#define blue 11
#define redTime 1000
#define yellowTime 1000
#define greenTime 1000
#define blueTime 1000


void setup() {
  // put your setup code here, to run once:
 pinMode(red,OUTPUT); //las constantanes declaradas
 pinMode(yellow,OUTPUT); //las constantes declaradas
 pinMode(green, OUTPUT); //las constantes declaradas
 pinMode(blue, OUTPUT); // las constantes declaradas
 Serial.begin(9600);
}


String data = "";


void loop() {
  // put your main code here, to run repeatedly:
 if (Serial.available()){
  data = Serial.readStringUntil('\n');
 }
 if (data == "Y") {
   digitalWrite(yellow,HIGH);
   delay(yellowTime);
   digitalWrite(yellow,LOW);
   data = "";
 }
 else if (data == "R"){
    digitalWrite(red,HIGH);
   delay(redTime);
   digitalWrite(red,LOW);
   data = "";
 }
 else if (data == "G") {
   digitalWrite(green,HIGH);
   delay(greenTime);
   digitalWrite(green,LOW);
   data = "";


 }
 else if (data == "B"){
   digitalWrite(blue,HIGH);
   delay(blueTime);
   digitalWrite(blue, LOW);
   data = "";
 }
 }