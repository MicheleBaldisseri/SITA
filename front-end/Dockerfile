FROM node:12.18.2-alpine
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]

#docker build -t sita .
#docker run -dp 4200:4200 sita