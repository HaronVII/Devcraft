# Используем официальный образ Node.js
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Собираем проект (если используете Vite)
RUN npm run build

# Указываем порт, который будет использовать контейнер
EXPOSE 5173

# Запускаем приложение
CMD ["npm", "run", "dev"]