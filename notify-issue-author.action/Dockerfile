# Use the latest version of Node.js
#
# You may prefer the full image:
# FROM node
#
# or even an alpine image (a smaller, faster, less-feature-complete image):
# FROM node:alpine
#
# You can specify a version:
# FROM node:10-slim
FROM node:10-stretch-slim

# Labels for GitHub to read your action
LABEL "com.github.actions.name"="Notify issue author"
LABEL "com.github.actions.description"="Notifies an issue's author when an issue is closed."
# Here are all of the available icons: https://feathericons.com/
LABEL "com.github.actions.icon"="alert-circle"
# And all of the available colors: https://developer.github.com/actions/creating-github-actions/creating-a-docker-container/#label
LABEL "com.github.actions.color"="yellow"

# Make sure dependencies are up to date. 
RUN apt-get update -y && \
  apt-get install -y --no-install-recommends make python && \
  rm -rf /var/lib/apt/lists/*

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy the rest of your action's code
COPY . .

# Run `node /index.js`
ENTRYPOINT ["node", "/index.js"]
