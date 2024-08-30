import readlineSync from 'readline-sync';
import fs from 'fs';
import path from 'path';
let todas_las_palabras = JSON.parse(fs.readFileSync("palabras.json","utf-8"))
