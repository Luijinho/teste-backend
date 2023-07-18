FROM node:18

WORKDIR /src

COPY package.json .
COPY package-lock.json .

RUN npm install
COPY . .

EXPOSE 3001

CMD ["npm", "run", "start"]
