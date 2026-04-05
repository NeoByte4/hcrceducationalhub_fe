# =========================
# 1. Builder Stage
# =========================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files first (better caching)
COPY package.json package-lock.json ./

# Install dependencies using npm
RUN npm ci

# Copy full project
COPY . .

# Build Next.js app
RUN npm run build


# =========================
# 2. Production Stage
# =========================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy only required files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/next.config.* ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

# Install only production dependencies
RUN npm ci --omit=dev

# Expose Next.js port
EXPOSE 3000

# Start production server
CMD ["npm", "start"]