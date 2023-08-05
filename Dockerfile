# Node.js LTS sürümünü kullanın
FROM node:14

# Çalışma dizinini ayarlayın
WORKDIR /usr/src/app

# Bağımlılıkları kopyalayın ve yükleyin
COPY package*.json ./
RUN npm install

# Uygulama kodunu kopyalayın
COPY . .

# Uygulamanın çalıştırılacağı port
EXPOSE 3000

# Uygulamayı başlatın
CMD ["npm", "run", "start"]
