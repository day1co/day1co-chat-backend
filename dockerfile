# setup
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./

# env mode
ARG GH_TOKEN
ENV GH_TOKEN=$GH_TOKEN

# export ports
ENV HOST=0.0.0.0
ENV PORT=7000
EXPOSE 7000

# bootstrap
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

CMD ["npm", "run", "start"]
