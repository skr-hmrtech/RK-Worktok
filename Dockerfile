FROM node:22.1-alpine

RUN apk update && apk upgrade && \
    apk add curl && \
    addgroup -g 1001 appuser && \
    adduser -u 1001 -G appuser -s /bin/sh -D appuser && \
    rm -rf /var/cache/apk/*

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production && npm cache clean --force

COPY . .

# Build the application
RUN npm run build

RUN chown -R appuser:appuser .

USER appuser

EXPOSE 4488

CMD ["npm", "start"]

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4488/health || exit 1