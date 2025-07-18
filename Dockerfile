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
RUN pnpm build

# Production stage
FROM base AS prod
# Copy built application from builder stage
COPY --from=builder /app/dist/dgm-lexicon/browser .
EXPOSE 8080
ENTRYPOINT ["npx", "http-server"]
