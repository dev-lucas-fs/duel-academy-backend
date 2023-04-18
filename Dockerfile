FROM node

WORKDIR /src/usr/

COPY . .

EXPOSE 5000

RUN npm i
RUN npm run build
RUN npm run dev:seed

CMD ["npm", "start"]