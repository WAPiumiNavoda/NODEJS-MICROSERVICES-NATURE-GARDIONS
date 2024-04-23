FROM node

WORKDIR /app/complains

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4001

CMD ["npm", "start"]cd