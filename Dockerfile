# Etapa 1: construcción
FROM node:20 AS builder
WORKDIR /app

# Copiamos los archivos de configuración
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

# Copiamos el código fuente y compilamos
COPY . .
RUN npm run build

# Etapa 2: imagen liviana para producción
FROM gcr.io/distroless/nodejs20-debian12
WORKDIR /app

# Copiamos solo lo necesario desde la etapa de construcción
COPY package*.json ./
COPY --from=builder /app/dist ./dist

# Instalamos solo las dependencias de producción
RUN npm install --only=production

# Exponemos el puerto usado por la app
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["node", "dist/index.js"]
