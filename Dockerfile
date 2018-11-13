FROM node:boron
WORKDIR /usr/src/app
RUN npm install
COPY . .
EXPOSE 8182
CMD [ "npm", "start" ]
