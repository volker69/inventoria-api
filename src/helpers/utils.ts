import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';import { CONFIG } from "../config/config";
;

export const  obtenerFechaActual= ()=> {
    const fecha = new Date();
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Agrega un 0 si es necesario
    const dia = String(fecha.getDate()).padStart(2, '0'); // Agrega un 0 si es necesario

    return `${anio}-${mes}-${dia}`;
}

const spinnerFrames = ['|', '/', '-', '\\'];
let currentFrame = 0;
let spinnerInterval: NodeJS.Timeout | undefined;

// 2. Función para iniciar la animación
export const startSpinner= ()=> {
  // Evitar iniciar múltiples intervalos si ya hay uno corriendo
  if (spinnerInterval) return;
  
  spinnerInterval = setInterval(() => {
    process.stdout.write(`\rConsultando BD... ${spinnerFrames[currentFrame]}`);
    currentFrame = (currentFrame + 1) % spinnerFrames.length;
  }, 100);
}

// 3. Función para detener la animación
export const stopSpinner=()=> {
  if (spinnerInterval) {
    clearInterval(spinnerInterval);
    spinnerInterval = undefined;
  }
  // Forzamos un salto de línea para "separar" el cursor del spinner
  process.stdout.write('\n');
}

export const generateCode = (name: string): string => {
  // Normaliza el nombre: quita espacios y lo pasa a mayúsculas
  const normalized = name.replace(/\s+/g, '').toUpperCase();

  // Función de hash simple
  const simpleHash = (str: string): string => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
          hash = (hash << 5) - hash + str.charCodeAt(i);
          hash |= 0; // Convertir a entero de 32 bits
      }
      return Math.abs(hash).toString(36); // Convertir a base 36
  };

  // Genera una parte aleatoria
  const randomString = (length: number): string =>
      Array.from({ length }, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.charAt(Math.floor(Math.random() * 36))).join('');

  // Construcción del código
  const hashPart = simpleHash(normalized).slice(0, 10); // 10 caracteres del hash
  const randomPart = randomString(10); // 10 caracteres aleatorios
  const namePart = normalized.slice(0, 10).padEnd(10, 'X'); // 10 caracteres del nombre

  return (namePart + hashPart + randomPart).slice(0, 30); // Asegura 30 caracteres exactos
};

export const  getCurrentDateTime = (): string =>{
  const now = new Date();

  const pad = (n: number) => n.toString().padStart(2, '0');
  const padMs = (n: number) => n.toString().padStart(3, '0');

  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1);
  const day = pad(now.getDate());
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());
  const milliseconds = padMs(now.getMilliseconds());

  const timezoneOffset = -now.getTimezoneOffset(); // en minutos
  const sign = timezoneOffset >= 0 ? '+' : '-';
  const offsetHours = pad(Math.floor(Math.abs(timezoneOffset) / 60));
  const offsetMinutes = pad(Math.abs(timezoneOffset) % 60);

  const timezone = `${sign}${offsetHours}${offsetMinutes}`;

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds} ${timezone}`;
}

async function verifyPassword(myPassword:string,hash:string):Promise<boolean> {
  const isMatch = await bcrypt.compare(myPassword, hash);
  return isMatch;
  
  }

export function descripToken(req:any):any {
  const token:string =req.headers.authorization?.split(" ")[1] as string
  const decript:any = jwt.verify(token,`${CONFIG.ACCES_TOKEN}`);
  return decript;
  
}