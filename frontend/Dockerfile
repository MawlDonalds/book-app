#Base Image Node.js 20
FROM node:20

# install dependencies
WORKDIR /app
COPY package*.json bun.lockb ./

# Copy to Workdir
COPY . .
RUN npm install

EXPOSE 8080
CMD ["npm", "run", "dev" ]