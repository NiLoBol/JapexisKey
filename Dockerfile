FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json ./
RUN npm install --omit=dev --no-audit --no-fund
COPY . .
ENV PORT=3000
EXPOSE 3000
CMD ["node", "server.js"]
