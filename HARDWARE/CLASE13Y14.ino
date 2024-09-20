 #define BOTON1A 8 //pinBoton a
 #define BOTON2B 9  //pinBoton b
 #define BOTON3D 10 //pinBoton d
 #define BOTON4I 11 //pinBoton i
 #define BOTONOK 12 //pinBoton OK
 #define LEDVERDE 2 //pinLED verde
 #define LEDAMARILLO 3 //pinLED amarillo
 #define LEDROJO 4 //pinLED rojo
 #define LEDAZUL 5 //pinLED azul
 
 int x = 0; // variable que será el return según que botón fue presionado
 int juego= 0; //variable 

void setup() {

  // put your setup code here, to run once:
 pinMode(BOTON1A, INPUT); 
 pinMode(BOTON2B, INPUT);
 pinMode(BOTON3D, INPUT);
 pinMode(BOTON4I, INPUT);
 pinMode(BOTONOK, INPUT);
 Serial.begin(9600);

}

void loop() {
  // put your main code here, to run repeatedly:
 Serial.println (LeerBotones()); //me escribe que boton sera presionado
 
  String llega = Serial.readStringUntil('\n');

     if (llega.equals("Juego1") || llega.equals("Juego2") ) //si lo enviado del back es IGUAL A juego 1 o 2, pasara lo siguiente {
     Serial.println (LeerBotones()); 
     }
     else if (llega.equals("Juego3")){ // si lo enviado es el juego tres deberán solo leerse 4 botones
     Serial.println (LeerSoloCuatro()); 
      } 
     else if (llega.equals("Juego4")) { // si lo enviado es el juego cuatro deberán leerse todos los botones y a su vez recibir que led prender
     }
     else if (llega.equals("Juego5")|| llega.equals("Juego5")){

     }


int LeerBotones () {
  if ( digitalRead(BOTON1A) == HIGH){
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
  else if ( digitalRead(BOTONOK) == HIGH) {
    x=5; // si es presionado el boton de ok
  }
  else {
    x=0; //en caso de que ninguno fue presionado
  }
  return x; // devuelve que boton será presionado o en caso de que ninguno fue presionado
}

int LeerSoloCuatro () {
  if ( digitalRead(BOTON1A) == HIGH){
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
  else {
    x=0; //en caso de que ninguno fue presionado
  }
  return x; // devuelve que boton será presionado o en caso de que ninguno fue presionado
}