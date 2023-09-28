FROM node:18-alpine

WORKDIR /usr/app

COPY index.mjs .
COPY package.json .
COPY package-lock.json .
COPY /src ./src/

ENV MONGO_URI mongodb+srv://jhuly_vivas:E6qJtXtGsvmWh7q@cluster0.kdttu6h.mongodb.net/?retryWrites=true&w=majority
ENV PORT 5001
EXPOSE 5001

RUN npm install --production

ENTRYPOINT [ "npm", "start" ]