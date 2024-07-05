# Frontend Dockerfile
FROM node:21

# Set the working directory
WORKDIR /usr/src/app 

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install -g @angular/cli && npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 4200

# Start the application
CMD ["ng", "serve", "--host", "0.0.0.0"]
