void setup() {
  // put your setup code here, to run once:
 pinMode(13,OUTPUT);
 pinMode(2,INPUT);
 pinMode(6,OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
int Boton = digitalRead (2);
 if(Boton==HIGH){
  digitalWrite(13,HIGH);
  delay(2000);
  digitalWrite(13,LOW);
  delay(500);
  digitalWrite(6,HIGH);
  delay(3000);
  digitalWrite(6,LOW)
 }
}
