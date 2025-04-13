# 🚀 TTK Organizer - HackRnd Spring 2025


Репозиторий команды **Miss Click** - организация задач и статей с современным интерфейсом.

## ✨ Функционал
- 🔐 **Аутентификация**
  - Регистрация и авторизация
  - Шифрование паролей через JWT токен

- 📝 **Статьи**
  - Создание с текстом и изображениями
  - Просмотр, редактирование и удаление

- ✅ **Управление задачами**
  - Создание задач с текстом и приоритетом
  - Перетаскивание между колонками:
    - 🕒 Отложено
    - ⏳ Выполняется11111
    - ✅ Выполнено
  - Редактирование задач

- 👨‍💻 **Администрирование**
  - Просмотр всех пользователей
  - Управление пользователями

- 🌙 **Темная тема** - для комфортной работы в любое время суток

## 🛠 Cтек

### Frontend
- React + TypeScript
- Zustand (управление состоянием)
- Motion (анимации)
- React Router
- Другие  библиотеки

### Backend
- NestJS
- PostgreSQL
- Prisma ORM
- Docker

## 🚀 Установка и запуск
### Frontend
##### Устанавливаете [фронтенд репозиторий](https://github.com/Lyaguh21/Team-MissClick-Frontend) в любое удобное место
#
##### Загружаете зависимости

```bash
npm i
```
#
##### Запускаете

```bash
npm run dev
```

### Backend
##### Устанавливаете [бекенд репозиторий](https://github.com/Lyaguh21/Team-MissClick-Backend) в любое удобное место
#
##### Загружаете зависимости

```bash
npm i
```
#
##### Создаете файл .env в корневой папке c содержимым:
```
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
JWT_SECRET=super-secret-key
JWT_EXPIRES_IN=1d
```
#
##### Настраиваете prisma:

```bash
npx prisma generate
```
#
##### Открываете репозиторий через докер

```bash
docker compose up -d      
````
#
##### Запускаете backend репозиторий

```bash
npm run start:dev
```
---

##### Если хотите просмотреть бд 

```bash
npx prisma studio
```
