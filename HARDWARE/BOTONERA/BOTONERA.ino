#include <CuteBuzzerSounds.h>

#define BUZZER_PIN 3
#define BOTON1A 7
#define BOTON2B 6
#define BOTON3D 12
#define BOTON4I 13
#define BOTONOK 2
#define RED 8
#define YELLOW 9
#define GREEN 10
#define BLUE 11
#define BOCINA 3
#define INTERRUPTOR_BOCINA 4
#define INTERRUPTOR_LEDS 5
#define TIMELEDS 1000
#define PAUSITA 200

int estado = 0;
unsigned long lastDebounceTime = 0;
const unsigned long debounceDelay = 50;

void setup() {
    Serial.begin(9600);
    pinMode(BOTON1A, INPUT);
    pinMode(BOTON2B, INPUT);
    pinMode(BOTON3D, INPUT);
    pinMode(BOTON4I, INPUT);
    pinMode(BOTONOK, INPUT);
    pinMode(RED, OUTPUT);
    pinMode(YELLOW, OUTPUT);
    pinMode(GREEN, OUTPUT);
    pinMode(BLUE, OUTPUT);
    pinMode(BOCINA, OUTPUT);
    pinMode(INTERRUPTOR_LEDS, INPUT);
    pinMode(INTERRUPTOR_BOCINA, INPUT);
    cute.init(BUZZER_PIN);
}

void PerdisteQueTriste() {
    if (digitalRead(INTERRUPTOR_BOCINA) == HIGH) {
        Serial.println("Esperando comando de juego...");
        while (true) {
            if (Serial.available()) {
                String valor = Serial.readStringUntil('\n');
                Serial.print("Comando recibido: ");
                Serial.println(valor);
                if (valor.equals("GANAR")) {
                    Serial.println("Jugaste bien, ¡ganaste!");
                    cute.play(S_HAPPY_SHORT);
                    delay(2000);
                    break;
                } else if (valor.equals("PERDER")) {
                    Serial.println("Perdiste, ¡intenta de nuevo!");
                    cute.play(S_SAD);
                    delay(2000);
                    break;
                } else if (valor.equals("1")) {
                    Serial.println("Saliendo de PerdisteQueTriste...");
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
    static int lastButtonState = LOW;
    static int buttonState = LOW;

    int reading = digitalRead(BOTON1A) || digitalRead(BOTON2B) || digitalRead(BOTON3D) || digitalRead(BOTON4I) || digitalRead(BOTONOK);
    if (reading != lastButtonState) {
        lastDebounceTime = millis();
    }

    if ((millis() - lastDebounceTime) > debounceDelay) {
        if (reading != buttonState) {
            buttonState = reading;
            if (buttonState == HIGH) {
                if (digitalRead(BOTON1A) == HIGH) return 1;
                if (digitalRead(BOTON2B) == HIGH) return 2;
                if (digitalRead(BOTON3D) == HIGH) return 3;
                if (digitalRead(BOTON4I) == HIGH) return 4;
                if (digitalRead(BOTONOK) == HIGH) return 5;
            }
        }
    }
    lastButtonState = reading;
    return 0;
}

void EncenderLED(int ledPin) {
    if (digitalRead(INTERRUPTOR_LEDS) == HIGH) {
        digitalWrite(ledPin, HIGH);
        delay(TIMELEDS);
        digitalWrite(ledPin, LOW);
    }
}

void JugarSimon() {
    char colores[6];
    int orden = 0;
    estado = 0;

    Serial.println("Entrando a JugarSimon");
    while (orden < 6) {
        if (Serial.available()) {
            String data = Serial.readStringUntil('\n');
            Serial.print("Datos recibidos: ");
            Serial.println(data);
            for (int i = 0; i < data.length() && orden < 6; i++) {
                char c = data.charAt(i);
                if (c != ' ') {
                    colores[orden++] = c;
                }
            }
            Serial.print("Colores almacenados: ");
            for (int i = 0; i < orden; i++) {
                Serial.print(colores[i]);
            }
            Serial.println();
        }
        if (Serial.available()) {
            String control = Serial.readStringUntil('\n');
            if (control.equals("1")) {
                estado = 1;
                Serial.println("Cambiando estado a 1, saliendo de JugarSimon.");
                PerdisteQueTriste();
                return;
            }
        }
    }

    Serial.println("Mostrando la secuencia de colores.");
    for (int i = 0; i < orden; i++) {
        if (colores[i] == 'Y') EncenderLED(YELLOW);
        else if (colores[i] == 'R') EncenderLED(RED);
        else if (colores[i] == 'G') EncenderLED(GREEN);
        else if (colores[i] == 'B') EncenderLED(BLUE);
        delay(PAUSITA);
    }

    while (estado == 0) {
        int aux = LeerBotones();
        if (aux != 0) {
            Serial.println(aux);
            if (aux == 1) EncenderLED(RED);
            else if (aux == 2) EncenderLED(BLUE);
            else if (aux == 3) EncenderLED(GREEN);
            else if (aux == 4) EncenderLED(YELLOW);
            delay(PAUSITA);
        }
        if (Serial.available()) {
            String control = Serial.readStringUntil('\n');
            if (control.equals("1")) {
                estado = 1;
                Serial.println("Cambiando estado a 1, saliendo de JugarSimon.");
            }
        }
    }
              delay(1000);
               PerdisteQueTriste();
}

void JugarPares() {
    Serial.println("Entrando a JugarPares");
    int ledEncendido = 0;
    estado = 0;

    while (estado == 0) {
        if (Serial.available()) {
            String comando = Serial.readStringUntil('\n');
            Serial.print("Comando recibido: ");
            Serial.println(comando);
            if (digitalRead(INTERRUPTOR_LEDS) == HIGH) {
                if (comando.equals("PONE") && ledEncendido != YELLOW) {
                    if (ledEncendido != 0) digitalWrite(ledEncendido, LOW);
                    ledEncendido = YELLOW;
                    digitalWrite(ledEncendido, HIGH);
                    Serial.println("Encendiendo LED amarillo");
                } else if (comando.equals("PTWO") && ledEncendido != GREEN) {
                    if (ledEncendido != 0) digitalWrite(ledEncendido, LOW);
                    ledEncendido = GREEN;
                    digitalWrite(ledEncendido, HIGH);
                    Serial.println("Encendiendo LED verde");
                }
            } else if (ledEncendido != 0) {
                digitalWrite(ledEncendido, LOW);
                ledEncendido = 0;
            }
            if (comando.equals("1")) {
                estado = 1;
                Serial.println("Cambiando estado a 1, saliendo del juego.");
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
    Serial.println("pood");
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
        Serial.println(aux);
    }
}
