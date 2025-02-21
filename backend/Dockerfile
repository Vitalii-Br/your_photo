  #  ==================== build разработка  ==============================

FROM node:23.5.0

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --production

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Устанавливаем порт
EXPOSE 4200

# Запускаем приложение
CMD ["node", "dist/main.js"]  # Указываем путь к собранному файлу


   