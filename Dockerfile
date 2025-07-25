FROM node:22-alpine AS base
WORKDIR /app
RUN npm install -g pnpm

FROM base AS app
# Copy application source code
COPY package.json pnpm-lock.yaml ./
COPY angular.json ./
COPY tsconfig.json tsconfig.app.json tsconfig.spec.json ./
COPY src ./src
COPY public ./public

FROM app AS dep
RUN pnpm install --frozen-lockfile

FROM app AS builder
COPY --from=dep /app/node_modules ./node_modules
RUN rm public/db.csv && mv public/db-prod.csv public/db.csv
RUN pnpm build

# Test stage
FROM base as test
RUN apk add --no-cache chromium
ENV CHROME_BIN=/usr/bin/chromium
COPY karma.conf.js ./
COPY --from=dep /app .
RUN ["pnpm", "test", "--watch=false", "--browsers=ChromeHeadless"]

# Production stage
FROM base AS prod
# Copy built application from builder stage
COPY --from=builder /app/dist/dgm-lexicon/browser .
EXPOSE 8080
ENTRYPOINT ["npx", "http-server"]
