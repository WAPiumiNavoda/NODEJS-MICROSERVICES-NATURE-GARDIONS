FROM node

WORKDIR /app/feedback

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4003

CMD ["npm", "start"]cd