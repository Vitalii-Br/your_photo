# Используем официальный образ Node.js
FROM node:23.5.0

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY backend/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь код проекта в контейнер
COPY backend/ .

# Строим проект NestJS
RUN npm run build

# Открываем порт, на котором работает приложение
EXPOSE 4200

# Команда для запуска приложения
CMD ["npm", "run", "start:prod"]