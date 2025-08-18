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

  // Botones con INPUT_PULLUP
  pinMode(BOTON1A, INPUT_PULLUP);
  pinMode(BOTON2B, INPUT_PULLUP);
  pinMode(BOTON3D, INPUT_PULLUP);
  pinMode(BOTON4I, INPUT_PULLUP);
  pinMode(BOTONOK, INPUT_PULLUP);

  pinMode(red, OUTPUT);
  pinMode(yellow, OUTPUT);
  pinMode(green, OUTPUT);
  pinMode(blue, OUTPUT);
  pinMode(bocina, OUTPUT);
  pinMode(interruptorLeds, INPUT);
  pinMode(interruptorBocina, INPUT);
}

void PerdisteQueTriste() {
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

int LeerBotones() {
  int x = 0;

  if (digitalRead(BOTON1A) == LOW) {
    x = 1;
  } else if (digitalRead(BOTON2B) == LOW) {
    x = 2;
  } else if (digitalRead(BOTON3D) == LOW) {
    x = 3;
  } else if (digitalRead(BOTON4I) == LOW) {
    x = 4;
  } else if (digitalRead(BOTONOK) == LOW) {
    x = 5;
  } else {
    x = 0;
  }
  delay(150);
  return x;
}

void EncenderLED(int ledPin) {
  if (digitalRead(interruptorLeds) == HIGH) {
    digitalWrite(ledPin, HIGH);
    delay(timeleds);
    digitalWrite(ledPin, LOW);
  }
}

String data = "";
char colores[8];
int orden = 0;

void loop() {
  if (Serial.available()) {
    data = Serial.readStringUntil('\n');

    if (data.equals("Juegos")) {
      while (estado == 0) {
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
            EncenderLED(yellow);
          } else if (colores[i] == 'R') {
            EncenderLED(red);
          } else if (colores[i] == 'G') {
            EncenderLED(green);
          } else if (colores[i] == 'B') {
            EncenderLED(blue);
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
            EncenderLED(red);
            LeerBotones();
          } else if (llega.equals("PTWO")) {
            EncenderLED(blue);
            LeerBotones();
          }
        }
      }
    }
  }

  int aux = LeerBotones();
  if (aux != 0) {
    Serial.println(aux);
  }
}



