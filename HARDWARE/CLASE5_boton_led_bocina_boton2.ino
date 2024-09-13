void setup() {
  // put your setup code here, to run once:
 pinMode(6,OUTPUT); // LED
 pinMode(2,INPUT_PULLUP); //BOTON LED
 pinMode(10,INPUT_PULLUP); // BOTON BUZZER
 pinMode (12,OUTPUT); // BUZZER 
 }

void loop() {
  // put your main code here, to run repeatedly:
  int Boton1 = digitalRead (2);
  int Boton2 = digitalRead (10);

  if (Boton1 == LOW){
    digitalWrite(6,HIGH);
    delay(1000);
    digitalWrite(6,LOW);
  }
  if (Boton2 == LOW){
    digitalWrite(12,HIGH);
    delay(2000);
    digitalWrite(12,LOW);
  }
}
