FROM node:argon

# Create app dir
RUN mkdir -p /Documents/dev/docker_containers/datethyme
WORKDIR /Documents/dev/docker_containers/datethyme

# Dependencies
COPY package.json /Documents/dev/docker_containers/datethyme
RUN npm install

# Bundle app source
COPY . /Documents/dev/docker_containers/datethyme

EXPOSE 8080
CMD [ "npm", "start" ]