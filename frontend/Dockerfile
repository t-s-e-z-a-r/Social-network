FROM node:14

WORKDIR /app/frontend
RUN apt-get update && apt-get install -y \
    ca-certificates \
    openssl \
    && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

CMD ["npm", "start", "--host", "0.0.0.0"]
