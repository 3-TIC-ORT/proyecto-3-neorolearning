 #define BOTON1A 8 //pinBoton a
 #define BOTON2B 9  //pinBoton b
 #define BOTON3D 10 //pinBoton d
 #define BOTON4I 11 //pinBoton i
 #define BOTONOK 12 //pinBoton OK


 

void setup() {
  // put your setup code here, to run once:
 pinMode(BOTON1A, INPUT); 
 pinMode(BOTON2B, INPUT);
 pinMode(BOTON3D, INPUT);
 pinMode(BOTON4I, INPUT);
 pinMode(BOTONOK, INPUT_PULLUP);
 Serial.begin(9600);
}
  int LeerBotones () {
     int x = 0; // variable que será el return según que botón fue presionado

  if (digitalRead(BOTON1A) == HIGH){
    x=1; //si es presionado el boton de arriba
  }
  else if ( digitalRead(BOTON2B) == HIGH){
    x=2; // si es presionado el boton de abajo
  }
  else if ( digitalRead(BOTON3D) == HIGH){
    x=3; // si es presionado el boton derecho
  }
  else if ( digitalRead(BOTON4I) == HIGH){
    x=4; // si es presionado el boton izquierdo
  }
  else if ( digitalRead(BOTONOK) == LOW) {
    x=5; // si es presionado el boton de ok
  }
  else {
    x=0; //en caso de que ninguno fue presionado
  }
  delay(150);
  return x; // devuelve que boton será presionado o en caso de que ninguno fue presionado
}


 void loop() {
  // put your main code here, to run repeatedly:
 int aux =LeerBotones();
 if (aux != 0) {
 Serial.println (aux); //me escribe que boton sera presionado
 delay(200);
 }
 }
  

