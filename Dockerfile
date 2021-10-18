FROM node:16.5.0

RUN apt-get update && apt-get install -y ca-certificates openssl -y

ADD . .

RUN npm cache clean --force
RUN npm install
RUN npm run build

# Expose the app port
EXPOSE 3000

# Start the app
ENTRYPOINT ["npm", "start"]
#CMD ["npm", "run", "serve"]
