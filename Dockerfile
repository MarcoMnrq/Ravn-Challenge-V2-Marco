# Use an official Node.js runtime as the base image
FROM node:16.14.0-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the remaining files to the container
COPY . .

# Specify the environment variables
ENV DATABASE_URL=<database_url>
ENV JWT_SECRET=<jwt_secret>

# Expose the app on port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
