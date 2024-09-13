void setup() {
  // put your setup code here, to run once:
pinMode(2,OUTPUT);
pinMode(12,INPUT)
}

void loop() {
  // put your main code here, to run repeatedly:
int Boton = digitalRead(12);
  if (Boton==HIGH){
  digitalWrite(2,HIGH);
  delay(500);
  } else {
    digitalWrite(2,LOW);
  }
}
