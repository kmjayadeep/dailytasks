FROM node:slim as builder

WORKDIR /app

COPY package*.json ./

# install exact versions from package-lock.json
RUN npm ci

COPY . .

## compile typescript
RUN npm run build

## remove packages of devDependencies
RUN npm prune --production

# base image for running the compiled app
FROM node:slim as runtime

WORKDIR /app
ENV NODE_ENV=production

## Copy the necessary files form builder
COPY --from=builder "/app/dist/" "/app/dist/"
COPY --from=builder "/app/node_modules/" "/app/node_modules/"
COPY --from=builder "/app/package.json" "/app/package.json"

CMD ["npm", "start"]
