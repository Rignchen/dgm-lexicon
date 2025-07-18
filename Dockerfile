FROM node:22-alpine as base
WORKDIR /app
RUN npm install -g pnpm

FROM base as app
# Copy application source code
COPY package.json pnpm-lock.yaml ./
COPY angular.json ./
COPY tsconfig.json tsconfig.app.json tsconfig.spec.json ./
COPY src ./src
COPY public ./public

FROM app as dep
RUN pnpm install --frozen-lockfile

FROM app as builder
COPY --from=dep /app/node_modules ./node_modules
RUN pnpm build

# Production stage
FROM base as prod
# Copy built application from builder stage
COPY --from=builder /app/dist/dgm-lexicon .
EXPOSE 4000
ENTRYPOINT ["node", "server/server.mjs"]
