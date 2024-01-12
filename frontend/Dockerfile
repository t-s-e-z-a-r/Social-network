# Use the official Node.js image
FROM node:14

# Set the working directory in the container
WORKDIR /app/frontend
RUN apt-get update && apt-get install -y \
    ca-certificates \
    openssl \
    && rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install application dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of your application code into the container
COPY . .

# Start the React application
CMD ["npm", "start", "--host", "0.0.0.0"]
