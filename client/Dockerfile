FROM node:alpine

WORKDIR /app

# Copy package.json and package-lock.json (if present) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other source code to the working directory
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Run your app in development mode
CMD ["npm", "run", "dev"]
