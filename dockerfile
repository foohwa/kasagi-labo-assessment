# Use Node.js base image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Compile TypeScript (assuming you have typescript installed)
RUN npm run build

# Command to run the app
CMD node dist/app.js && tail -f /dev/null