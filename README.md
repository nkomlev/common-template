## Сервис-шаблон

Сервис представляет собой шаблон, позволяющий быстро начать разработку приложений

### Шаблон включает в себя:

- **Сервис администратора**

    Рабочее место администратора позволяет удобно работать с базой данных c помощью Next-Admin(Ready-to-go Admin for Next.js and Prisma.)
    
    Админка представляет собой предварительно настроенный проект next-admin с добавленной авторизацией и формой создания администратора при начальном развертывании сервиса


- **Сервис клиента**   

    Рабочее место клиента представляет собой шаблон для первичного создания веб-сервиса, по умолчанию включающего следующий функционал:
    
    - Авторизация по паролю
    - WebAuth
    - Установка PWA 
    - Отправка WebPush

Оба сервиса используют next v15.1.7 и tailwind v3.4.17

### Описание структуры 

Основной проект - монорепозиторий, включающий в себя компоненты и функции, которые используются как в админской, так и в клиентской частях

/apps - директория, содержащая админскую и клиенсткую части
/packages/share - функции и компоненты общие для разных частей 
/uploads - директория для хранения статики

### Запуск проекта 

Для корректной работы необходимо сделать следующее:

1. **Настройка .env в корне проекта**

```
DATABASE_URL="postgresql://testadmin:123456@localhost:5432/test?schema=public"
```

2. **Настройка .env для next-admin-app**

```
JWT_SECRET="secret"
```

3. **Настройка .env для next-client-app**

```
JWT_SECRET="secret"
NEXT_PUBLIC_VAPID_PUBLIC_KEY = BKA8Tv4SCygZtL9oHVZXCsVsb_k2RGnfzZ820f_m4F0GovyhG3UigN9mfmrpXxV6yRWrGNBqt2Ko7o__GF3kly8
VAPID_PRIVATE_KEY = m_mhR0RrCeWKZYkIlg_MJk_sEszpDK9EhqPXzTrQ7To
DOMAIN_NAME = localhost
NEXT_PUBLIC_APP_NAME = Common App Template
ORIGIN_URL=http://localhost:3000
```

Чтобы получить Vapid Keys необходимо сделать следующее:

npm i web-push -g

web-push generate-vapid-keys / npx web-push generate-vapid-keys

4. **Установка пакетов**

```
Запуск скрипта в корне проекта
npm install
```

5. **Подготовка prisma и базы данных **

```
1. Установка prisma
   npm i prisma -g
2. Обновление базы данных
   prisma migrate dev / prisma db push   

```

6. **Генерация клиентов prisma**

```
Запуск скрипта в корне проекта
prisma generate
```

7. Запускаем проекты next-admin-app и next-client-app

```
npm run dev в директории проекта /apps/...
или
npm run dev-admin / npm run dev-client в корне проекта
```