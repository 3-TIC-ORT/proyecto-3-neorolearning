#include <CuteBuzzerSounds.h>

#define BUZZER_PIN 4
#define BOTON1A 13
#define BOTON2B 11
#define BOTON3D 10
#define BOTON4I 12
#define BOTONOK 5
#define red 9
#define yellow 8
#define green 6
#define blue 7
#define bocina 4
#define interruptorBocina 3
#define interruptorLeds 2
#define timeleds 1000 // TIEMPO DE LEDS
#define pausita 200

int estado = 0; // estado inicial del while SIEMPRE 0

void setup() {
  Serial.begin(9600); // inicia la comunicación serial
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
  pinMode(interruptorLeds, INPUT);
  pinMode(interruptorBocina, INPUT);
  
}

void PerdisteQueTriste() {
  // probamos si esta prendido el interrupor de bocina para hacerlo funcionar
  if (digitalRead(interruptorBocina) == HIGH) {
    if (Serial.available()) {
      String valor = Serial.readStringUntil('\n');
      if (valor.equals("GANAR")) {
        digitalWrite(bocina, HIGH);
        delay(1000);
        digitalWrite(bocina, LOW);
      }
      if (valor.equals("PERDER")) {
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
}

int LeerBotones() { // para leer botones
  int x = 0;

  if (digitalRead(BOTON1A) == HIGH) {
    x = 1;
  } else if (digitalRead(BOTON2B) == HIGH) {
    x = 2;
  } else if (digitalRead(BOTON3D) == HIGH) {
    x = 3;
  } else if (digitalRead(BOTON4I) == HIGH) {
    x = 4;
  } else if (digitalRead(BOTONOK) == HIGH) {
    x = 5;
  } else {
    x = 0;
  }
  delay(150);
  return x;
}

// función para prender leds si esta encendido el interruptor
void EncenderLED(int ledPin) {
  if (digitalRead(interruptorLeds) == HIGH) {
    digitalWrite(ledPin, HIGH);
    delay(timeleds);
    digitalWrite(ledPin, LOW);
  }
}

String data = "";
char colores[8]; // Lista para almacenar hasta 8 letras
int orden = 0;   // Posición del vector

void loop() {
  // empezamos a ver si me mando algo mica 
  if (Serial.available()) {
    data = Serial.readStringUntil('\n');

    if (data.equals("Juegos")) {
      while (estado == 0) {
        int aux = LeerBotones();
        if (aux != 0) {
          Serial.println(aux);  //  continuar leyendo los botones hasta que salga del while
        }

        if (Serial.available()) {
          String control = Serial.readStringUntil('\n');
          if (control.equals("1")) {
            estado = 1;
          }
        }
      }
      PerdisteQueTriste();
    }

    if (data.equals("Simon")) {
      while (estado == 0) {
        if (Serial.available()) {
          String data = Serial.readStringUntil('\n');
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
            EncenderLED(yellow);  // Encender LED amarillo
          } else if (colores[i] == 'R') {
            EncenderLED(red);     // Encender LED rojo
          } else if (colores[i] == 'G') {
            EncenderLED(green);   // Encender LED verde
          } else if (colores[i] == 'B') {
            EncenderLED(blue);    // Encender LED azul
          }
          delay(pausita);
        }

        orden = 0;

        int aux = LeerBotones();
        if (aux != 0) {
          Serial.println(aux);
        }

        if (Serial.available()) {
          String control = Serial.readStringUntil('\n');
          if (control.equals("1")) {
            estado = 1;
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
            EncenderLED(red);  // encendes el led rojo si esta el interruptor
            LeerBotones();
          } else if (llega.equals("PTWO")) {
            EncenderLED(blue); // encender el led azul si esta el interruptor
            LeerBotones();
          }
        }
      }
    }
  }

  // si no llega a haaaber info en el serial segui leyendo los botones
  int aux = LeerBotones();
  if (aux != 0) {
    Serial.println(aux);  // los botones se van a leer y mandar por el serial
  }
}



