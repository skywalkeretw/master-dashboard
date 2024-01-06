FROM node:21 as build

WORKDIR /app

COPY . .
RUN npm install && npm run build


FROM node:21

WORKDIR /app

COPY --from=build /app/build build
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci --omit dev
# COPY --from=build /app/node_modules node_modules

EXPOSE 3000

ENTRYPOINT [ "node", "build" ]
