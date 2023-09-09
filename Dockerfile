# Use the official Node.js image as the base image
FROM node:16


# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port the application will run on
EXPOSE 3000

# Define the command to run the application
CMD ["yarn", "start:dev"]