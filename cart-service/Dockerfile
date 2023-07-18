FROM node:18

WORKDIR /src

COPY package.json .
COPY package-lock.json .

RUN npm install
COPY . .

EXPOSE 3002

CMD ["npm", "run", "start"]
