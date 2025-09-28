FROM node:lts-alpine

WORKDIR /app

# install dependencies
COPY package*.json ./
#COPY config*.json ./
#COPY src ./
#COPY tsconfig.json ./
RUN npm install

COPY . .

# run
CMD ["node", "run main"]