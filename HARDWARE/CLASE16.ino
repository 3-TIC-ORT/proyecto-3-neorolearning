
 #define LEDD 8 //pin
 #define LEDI 9  //pin

 
 void setup() {
  // put your setup code here, to run once:
pinMode(LEDD,OUTPUT);
pinMode(LEDI,OUTPUT);
Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
 
  String llega = Serial.readStringUntil('\n');

     if (llega.equals("Player1")) //si lo enviado del back es IGUAL A juego 1 o 2, pasara lo siguiente {
     digitalWrite (LEDD,HIGH); 
     else if (llega.equals("Player2")){
     digitalWrite(LEDI,HIGH);
     }
}
