void setup() {
  // put your setup code here, to run once:
 pinMode(2,INPUT); //boton1a
 pinMode(3,INPUT); //boton2b
 pinMode(4,INPUT); //boton3d
 pinMode(5,INPUT); //boton4i
 Serial.begin(9600);
}


void loop() {
  // put your main code here, to run repeatedly:
 int Boton1A = digitalRead(2);
 int Boton2B = digitalRead(3);
 int Boton3D = digitalRead (4);
 int Boton4I = digitalRead (5);
 
 
 
 if (Boton1A == HIGH){
 Serial.println (1);
 delay (500);
 }
 else if (Boton2B == HIGH){
 Serial.println(2);
 delay (500);
 }
 else if (Boton3D == HIGH){
 Serial.println(3);
 delay (500);
 }
 else if (Boton4I == HIGH){
 Serial.println(4);
 delay (500);
 }
 }

