
                  #  ==================== build разработка  
#Используем Node.js
FROM node:23.5.0

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install 

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Устанавливаем порт
EXPOSE 3000

# Запускаем приложение
CMD ["node", ".next/standalone/server.js"]


