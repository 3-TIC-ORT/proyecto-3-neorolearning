void setup() {
  // put your setup code here, to run once:
 pinMode(2,INPUT);
 pinMode(8, OUTPUT); //rojo
 pinMode(9, OUTPUT); // amarillo
 pinMode(10, OUTPUT); // verde
 pinMode(3,INPUT);
}
 
int x = 0;


int y = 0;




void loop() {
  int boton = digitalRead(2);
  int boton2= digitalRead(3);
 
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
    x= x-2;
  }
 }




  else if (boton2 == HIGH) {
    y++;


    if(y == 1){
    digitalWrite(8,LOW);
    digitalWrite(9,LOW);
    digitalWrite(10, HIGH);
    delay(500);
    }  
    if(y == 2){
    digitalWrite(8,LOW);
    digitalWrite(9,LOW);
    digitalWrite(10, LOW);
    delay(500);
    y= y-2;
    }
    }
