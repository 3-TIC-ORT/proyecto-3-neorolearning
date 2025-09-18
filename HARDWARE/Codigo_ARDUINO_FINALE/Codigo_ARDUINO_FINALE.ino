#include <CuteBuzzerSounds.h>

#define BUZZER_PIN 4
#define BOTON1A 13
#define BOTON2B 11
#define BOTON3D 10
#define BOTON4I 12
#define BOTONOK 5
#define RED 9
#define YELLOW 8
#define GREEN 6
#define BLUE 7
#define BOCINA 4
#define INTERRUPTOR_BOCINA 3
#define INTERRUPTOR_LEDS 2
#define TIMELEDS 1000
#define PAUSITA 200

int estado = 0;
unsigned long lastDebounceTime = 0;
const unsigned long debounceDelay = 50;

void setup() {
    Serial.begin(9600);
    pinMode(BOTON1A, INPUT_PULLUP);
    pinMode(BOTON2B, INPUT_PULLUP);
    pinMode(BOTON3D, INPUT_PULLUP);
    pinMode(BOTON4I, INPUT_PULLUP);
    pinMode(BOTONOK, INPUT_PULLUP);
    pinMode(RED, OUTPUT);
    pinMode(YELLOW, OUTPUT);
    pinMode(GREEN, OUTPUT);
    pinMode(BLUE, OUTPUT);
    pinMode(BOCINA, OUTPUT);
    pinMode(INTERRUPTOR_LEDS, INPUT_PULLUP);
    pinMode(INTERRUPTOR_BOCINA, INPUT_PULLUP);
    cute.init(BUZZER_PIN);
}

void PerdisteQueTriste() {
    if (digitalRead(INTERRUPTOR_BOCINA) == LOW) {
        while (true) {
            if (Serial.available()) {
                String valor = Serial.readStringUntil('\n');
                if (valor.equals("GANAR")) {
                    cute.play(S_HAPPY_SHORT);
                    delay(2000);
                    break;
                } else if (valor.equals("PERDER")) {
                    cute.play(S_SAD);
                    delay(2000);
                    break;
                } else if (valor.equals("1")) {
                    break;
                }
            }
            delay(100);
        }
    } else {
        Serial.println("Interruptor de bocina apagado.");
    }
}

int LeerBotones() {
    static int lastButtonState = HIGH;   // con pull-up, reposo = HIGH
    static int buttonState     = HIGH;

    int reading = digitalRead(BOTON1A) &&
                  digitalRead(BOTON2B) &&
                  digitalRead(BOTON3D) &&
                  digitalRead(BOTON4I) &&
                  digitalRead(BOTONOK);

    if (reading != lastButtonState) {
        lastDebounceTime = millis();
    }

    if ((millis() - lastDebounceTime) > debounceDelay) {
        if (reading != buttonState) {
            buttonState = reading;

            if (buttonState == LOW) {  // LOW = presionado
                if (digitalRead(BOTON1A) == LOW) return 1;
                if (digitalRead(BOTON2B) == LOW) return 2;
                if (digitalRead(BOTON3D) == LOW) return 3;
                if (digitalRead(BOTON4I) == LOW) return 4;
                if (digitalRead(BOTONOK) == LOW) return 5;
            }
        }
    }
    lastButtonState = reading;
    return 0;
}

void EncenderLED(int ledPin) {
    if (digitalRead(INTERRUPTOR_LEDS) == LOW) { // LOW = encendido
        digitalWrite(ledPin, HIGH);
        delay(TIMELEDS);
        digitalWrite(ledPin, LOW);
    }
}

void JugarSimon() {
    char colores[6];
    int orden = 0;
    estado = 0;

    // Leer la secuencia de colores
    while (orden < 6) {
        if (Serial.available()) {
            String data = Serial.readStringUntil('\n');
            for (int i = 0; i < data.length() && orden < 6; i++) {
                char c = data.charAt(i);
                if (c != ' ') colores[orden++] = c;
            }
        }
    }

    // Mostrar la secuencia
    for (int i = 0; i < orden; i++) {
        switch (colores[i]) {
            case 'Y': EncenderLED(YELLOW); break;
            case 'R': EncenderLED(RED); break;
            case 'G': EncenderLED(GREEN); break;
            case 'B': EncenderLED(BLUE); break;
        }
        delay(PAUSITA);
    }

    // Leer botones del jugador
    while (estado == 0) {
        int aux = LeerBotones();
        if (aux != 0) {
            Serial.println(aux);  // enviar al Serial solo el botón
            switch (aux) {
                case 1: EncenderLED(RED); break;
                case 2: EncenderLED(BLUE); break;
                case 3: EncenderLED(GREEN); break;
                case 4: EncenderLED(YELLOW); break;
            }
            delay(PAUSITA);
        }

        // Salida de emergencia
        if (Serial.available()) {
            String control = Serial.readStringUntil('\n');
            if (control.equals("1")) estado = 1;
        }
    }

    delay(500);
    PerdisteQueTriste();
}

void JugarPares() {
    int ledEncendido = 0;
    estado = 0;

    while (estado == 0) {
        if (Serial.available()) {
            String comando = Serial.readStringUntil('\n');
            if (digitalRead(INTERRUPTOR_LEDS) == HIGH) {
                if (comando.equals("PONE") && ledEncendido != YELLOW) {
                    if (ledEncendido != 0) digitalWrite(ledEncendido, LOW);
                    ledEncendido = YELLOW;
                    digitalWrite(ledEncendido, HIGH);
                } else if (comando.equals("PTWO") && ledEncendido != GREEN) {
                    if (ledEncendido != 0) digitalWrite(ledEncendido, LOW);
                    ledEncendido = GREEN;
                    digitalWrite(ledEncendido, HIGH);
                }
            } else if (ledEncendido != 0) {
                digitalWrite(ledEncendido, LOW);
                ledEncendido = 0;
            }
            if (comando.equals("1")) {
                estado = 1;
            }
        }
        int aux = LeerBotones();
        if (aux != 0) {
            Serial.println(aux);
        }
        delay(50);
    }

    if (ledEncendido != 0) {
        digitalWrite(ledEncendido, LOW);
    }
    PerdisteQueTriste();
}

void JugarJuegos() {
    estado = 0;
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

void loop() {
    if (Serial.available()) {
        String data = Serial.readStringUntil('\n');
        if (data.equals("Juegos")) {
            JugarJuegos();
        } else if (data.equals("Simon")) {
            JugarSimon();
        } else if (data.equals("Pares")) {
            JugarPares();
        }
    }

    int aux = LeerBotones();
    if (aux != 0) {
        Serial.println(aux);  // solo los botones
    }
}
