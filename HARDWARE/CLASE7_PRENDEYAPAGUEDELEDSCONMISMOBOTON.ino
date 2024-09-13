void setup() {
  // put your setup code here, to run once:
 pinMode(2,INPUT);
 pinMode(8, OUTPUT);
 pinMode(9, OUTPUT);
 pinMode(10, OUTPUT);
}
 
int x = 0;




void loop() {
  int boton = digitalRead(2);
 
 if(boton == HIGH) {
  x++;




  if(x == 1){
    digitalWrite(8,HIGH);
    digitalWrite(9,LOW);
    digitalWrite(10, LOW);
    delay(500);
  }


  if(x==2){
    digitalWrite(8,LOW);
    digitalWrite(9,HIGH);
    digitalWrite(10, LOW);
    delay(500);
  }


  if(x == 3){
    digitalWrite(8,LOW);
    digitalWrite(9,LOW);
    digitalWrite(10, HIGH);
    delay(500);


    x= x-3;
  }
 }
}

