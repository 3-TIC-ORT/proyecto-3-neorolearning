// otro codigo (terminar simon says)
#define red 8
#define yellow 9
#define green 10
#define blue 11
#define redTime 1000
#define yellowTime 1000
#define greenTime 1000
#define blueTime 1000
#define pausita 200


void setup() {
  // put your setup code here, to run once:
 pinMode(red,OUTPUT); //las constantanes declaradas
 pinMode(yellow,OUTPUT); //las constantes declaradas
 pinMode(green, OUTPUT); //las constantes declaradas
 pinMode(blue, OUTPUT); // las constantes declaradas
 Serial.begin(9600);
}


 String data = "";
 char colores [8]; //LA LISTA QUE ALMACENA HASTA 8 LETRAS
 int  orden = 0; // LA POSICIÓN DEL VECTOR


void loop() {
  // put your main code here, to run repeatedly:
  if (Serial.available()) {
  String data = Serial.readStringUntil('\n'); // lee la cadena completa hasta el salto de línea
  int dataLength = data.length(); // para ver la longitud de la cadena

  // se reccorre todo lo mandado en la cadena
  for (int i = 0; i < dataLength; i++) {
    char c = data.charAt(i); 

    // va almacenar la letra mientras que no sea un espacio
    if (c != ' ' && orden < 8) {
      colores[orden] = c; // almacena la letra si no es un espacio
      orden++; 
    }
  }
} 

  // al guardarse las variables, deberá correr el siguiente codigo

   for (int i=0; i<orden; i++) { //HASTA QUE LA LISTA TERMINE Y ESO LO SABREMOS HASTA QUE ORDEN SEA EL MAXIMO, DEBERA HACER LO SIGUIENTE

   if (colores[i] == 'Y') { //SI LA POSICION LA CUAL ES ELEGIDA ES IGUAL A Y, QUE PRENDA LA LED
     digitalWrite(yellow,HIGH);
     delay(yellowTime);
     digitalWrite(yellow,LOW);
   }
   else if (colores[i] == 'R'){ //SI LA POSICION LA CUAL ES ELEGIDA ES IGUAL A R, QUE PRENDA LA LED
     digitalWrite(red,HIGH);
     delay(redTime);
     digitalWrite(red,LOW);
   }
   else if (colores[i] == 'G') { //SI LA POSICION LA CUAL ES ELEGIDA ES IGUAL A G, QUE PRENDA LA LED
     digitalWrite(green,HIGH);
     delay(greenTime);
     digitalWrite(green,LOW);
   }
   else if (colores[i] == 'B'){ //SI LA POSICION LA CUAL ES ELEGIDA ES IGUAL A B, QUE PRENDA LA LED
     digitalWrite(blue,HIGH);
     delay(blueTime);
     digitalWrite(blue, LOW);
   }
     delay (pausita); // delay de pausa pequeña para que se distinga entre el prendidop y apagado de la led
   }

 orden = 0;

}


    
