FROM node:22-alpine AS base
WORKDIR /app
RUN npm install -g pnpm

FROM base AS app
# Copy application source code
COPY package.json pnpm-lock.yaml ./
COPY angular.json ./
COPY tsconfig.json tsconfig.app.json tsconfig.spec.json ./

FROM app AS app-files
COPY src ./src
COPY public ./public

FROM app AS dep
RUN pnpm install --frozen-lockfile

FROM app-files AS builder
COPY --from=dep /app/node_modules ./node_modules
RUN rm public/db.csv && mv public/db-prod.csv public/db.csv
RUN pnpm build

# Test stage
FROM base AS test
RUN apk add --no-cache chromium
ENV CHROME_BIN=/usr/bin/chromium
COPY karma.conf.js ./
COPY --from=app-files /app .
COPY --from=dep /app/node_modules ./node_modules
RUN ["pnpm", "test", "--watch=false", "--browsers=ChromeHeadless"]
RUN touch all-tests-passed

# Production stage
FROM base AS prod
# Ensure the test stage has passed
COPY --from=test /app/all-tests-passed /app/all-tests-passed
RUN rm /app/all-tests-passed
# Copy built application from builder stage
COPY --from=builder /app/dist/dgm-lexicon/browser .
EXPOSE 8080
ENTRYPOINT ["npx", "http-server"]
