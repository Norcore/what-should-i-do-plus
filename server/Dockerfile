FROM node:alpine3.19

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm cache clean --force
RUN npm install

# Copy the rest of the application
COPY . .

EXPOSE   3001

CMD [ "node", "./server.js" ]
