FROM node:18-alpine
WORKDIR /app
#WORKDIR app
#/PNXdockerC
COPY package*.json .
#COPY package.json .
RUN npm create vite@latest
RUN npm install --force
COPY . .
RUN npm run build --force
#RUN npm run build
#COPY . .
EXPOSE 8000
EXPOSE 8080
EXPOSE 5173
CMD [ "npm", "run", "dev"]

