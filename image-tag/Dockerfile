# import node docker image
FROM node:latest

# set workdir
WORKDIR /usr/src/app

# copy package files to workdir
# we copy this separately to take advantage of Docker cache
# modules will only be rebuilt if there is a change
COPY package*.json ./

# install npm packages
RUN npm install

# copy remaining source files
COPY . .

# make directory to hold images
RUN mkdir /media/image-tag && mkdir /media/image-tag/images

# expose localhost port
EXPOSE 8000

# start server
CMD ["node", "index.js"]
