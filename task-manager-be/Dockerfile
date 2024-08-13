FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "run", "start:prod"]
