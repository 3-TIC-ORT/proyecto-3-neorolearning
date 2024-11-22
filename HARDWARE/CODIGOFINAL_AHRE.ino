  #define BOTON1A 7 //pinBoton a
  #define BOTON2B 6  //pinBoton b
  #define BOTON3D 12 //pinBoton d
  #define BOTON4I 13 //pinBoton i
  #define BOTONOK 2 //pinBoton OK
  #define red 8
  #define yellow 9
  #define green 10
  #define blue 11
  #define bocina 3 //bocina
  #define timeleds 1000 // TIEMPO DE LEDS
  #define pausita 200
  int estado = 0; // el estado inicial del juego
  
  void setup() {
  pinMode(BOTON1A, INPUT);
  pinMode(BOTON2B, INPUT);
  pinMode(BOTON3D, INPUT);
  pinMode(BOTON4I, INPUT);
  pinMode(BOTONOK, INPUT);
  pinMode(red, OUTPUT);
  pinMode(yellow, OUTPUT);
  pinMode(green, OUTPUT);
  pinMode(blue, OUTPUT);
  pinMode(bocina, OUTPUT);
  Serial.begin(9600);
}

void PerdisteQueTriste() {
  if (Serial.available()) {
    String valor = Serial.readStringUntil('\n');
    if (valor.equals("GANAR")) {
      digitalWrite(bocina, HIGH);
      delay(1000);
      digitalWrite(bocina, LOW);
    } else if (valor.equals("PERDER")) {
      digitalWrite(bocina, HIGH);
      delay(1000);
      digitalWrite(bocina, LOW);
      delay(1000);
      digitalWrite(bocina, HIGH);
      delay(1000);
      digitalWrite(bocina, LOW);
    }
  }
}

int LeerBotones() {
  int x = 0; // variable que será el return según qué botón fue presionado

  if (digitalRead(BOTON1A) == HIGH) {
    x = 1; // si es presionado el botón de arriba
  } else if (digitalRead(BOTON2B) == HIGH) {
    x = 2; // si es presionado el botón de abajo
  } else if (digitalRead(BOTON3D) == HIGH) {
    x = 3; // si es presionado el botón derecho
  } else if (digitalRead(BOTON4I) == HIGH) {
    x = 4; // si es presionado el botón izquierdo
  } else if (digitalRead(BOTONOK) == HIGH) {
    x = 5; // si es presionado el botón de ok
  }
  
  delay(150);
  return x; // devuelve qué botón fue presionado o 0 si ninguno fue presionado
}

String data = "";
char colores[8]; // La lista que almacena hasta 8 letras
int orden = 0; // La posición del vector

void loop() {
  if (Serial.available()) {
    data = Serial.readStringUntil('\n'); // Asigna a la variable global

    if (data.equals("Juegos")) {
      while (estado == 0) {
        int aux = LeerBotones();
        if (aux != 0) {
          Serial.println(aux);
        }

        if (Serial.available()) {
          String control = Serial.readStringUntil('\n');
          if (control.equals("1")) {
            estado = 1; // Cambiar el estado para salir del bucle
          }
        }
      }
      PerdisteQueTriste();
    }

    if (data.equals("Simon")) {
      while (estado == 0) {
        if (Serial.available()) {
          data = Serial.readStringUntil('\n'); // Reutiliza la variable global
          int dataLength = data.length();

          for (int i = 0; i < dataLength; i++) {
            char c = data.charAt(i);
            if (c != ' ' && orden < 8) {
              colores[orden] = c;
              orden++;
            }
          }
        }

        for (int i = 0; i < orden; i++) {
          if (colores[i] == 'Y') {
            digitalWrite(yellow, HIGH);
            delay(timeleds);
            digitalWrite(yellow, LOW);
          } else if (colores[i] == 'R') {
            digitalWrite(red, HIGH);
            delay(timeleds);
            digitalWrite(red, LOW);
          } else if (colores[i] == 'G') {
            digitalWrite(green, HIGH);
            delay(timeleds);
            digitalWrite(green, LOW);
          } else if (colores[i] == 'B') {
            digitalWrite(blue, HIGH);
            delay(timeleds);
            digitalWrite(blue, LOW);
          }
          delay(pausita);
        }

        orden = 0;

        int aux = LeerBotones();
        if (aux != 0) {
          Serial.println(aux);
        }

        if (aux == 1) {
          while (digitalRead(BOTON1A) == HIGH) {
            digitalWrite(blue, HIGH);
          }
          digitalWrite(blue, LOW);
        } else if (aux == 2) {
          while (digitalRead(BOTON2B) == HIGH) {
            digitalWrite(yellow, HIGH);
          }
          digitalWrite(yellow, LOW);
        } else if (aux == 3) {
          while (digitalRead(BOTON3D) == HIGH) {
            digitalWrite(red, HIGH);
          }
          digitalWrite(red, LOW);
        } else if (aux == 4) {
          while (digitalRead(BOTON4I) == HIGH) {
            digitalWrite(green, HIGH);
          }
          digitalWrite(green, LOW);
        }

        if (Serial.available()) {
          String control = Serial.readStringUntil('\n');
          if (control.equals("1")) {
            estado = 1; // Cambiar el estado para salir del bucle
          }
        }
      }
      PerdisteQueTriste();
    }

    if (data.equals("Pares")) {
      while (estado == 0) {
        if (Serial.available()) {
          String llega = Serial.readStringUntil('\n');
          if (llega.equals("PONE")) {
            while (llega.equals("PONE")) {
              digitalWrite(red, HIGH);
              LeerBotones();
              llega = ""; // Rompe el ciclo al final
            }
            digitalWrite(red, LOW);
          } else if (llega.equals("PTWO")) {
            while (llega.equals("PTWO")) {
              digitalWrite(blue, HIGH);
              LeerBotones();
              llega = ""; // Rompe el ciclo al final
            }
            digitalWrite(blue, LOW);
          }
        }
      }
    }

    int aux = LeerBotones();
    if (aux != 0) {
      Serial.println(aux);
    }
  }
}

