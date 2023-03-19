FROM node:16 as build-stage

WORKDIR /server
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Stage 2
FROM node:16-alpine

COPY --from=build-stage /server/dist ./dist
COPY --from=build-stage /server/package.json ./
COPY --from=build-stage /server/datasets ./dist/datasets
RUN npm install --omit=dev 

CMD npm run start