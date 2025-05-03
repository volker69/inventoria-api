FROM node:20.12.2

WORKDIR /app

# Copiar package.json y lock primero
COPY package*.json ./
COPY tsconfig.json ./

# Instalar las herramientas necesarias para compilar bcrypt
RUN apt-get update && \
    apt-get install -y python3 build-essential && \
    npm install --only=production

# Copiar el resto del código
COPY . .

# Compilar la app
RUN npm run build

# Exponer puerto
EXPOSE 3000

# Arrancar app
CMD ["node", "dist/index.js"]