# Imagen base con Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de configuración

COPY package*.json ./
COPY tsconfig.json ./


# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Compilamos TypeScript a JavaScript
RUN npm run build
# Exponemos el puerto que usa tu servidor (ajustalo si es otro)
EXPOSE 3000

# Comando para correr el servidor en producción
CMD ["node", "dist/index.js"]
