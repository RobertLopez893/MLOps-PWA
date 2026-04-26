# ETAPA 1: Construcción (Build)
FROM node:20-alpine as build
WORKDIR /app

# Copia los archivos de configuración e instala dependencias
COPY package*.json ./
# Usamos legacy-peer-deps para evitar el error de Vite PWA
RUN npm install --legacy-peer-deps

# Copia todo el código de React y compila la PWA para producción
COPY . .
RUN npm run build

# ETAPA 2: Servidor Web (Nginx)
FROM nginx:alpine
# Copia la carpeta 'dist' generada en la etapa 1 a Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto 80 (el estándar web)
EXPOSE 80

# Enciende Nginx
CMD ["nginx", "-g", "daemon off;"]
