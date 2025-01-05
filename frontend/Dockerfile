# Используем официальный образ Node.js
FROM node:23.5.0

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY frontend/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь код проекта в контейнер
COPY frontend/ .

# Строим приложение Next.js
RUN npm run build

# Открываем порт, на котором будет доступен фронтенд
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "run", "start"]
