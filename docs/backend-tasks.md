# Задачи для бекенда Subtrackify

## Контекст

Фронтенд Subtrackify имеет развитый UI. Часть эндпоинтов уже вызывается, часть данных замокана, часть функций вообще не подключена к API. Нужно составить задачи для бекенд-разработки, чтобы закрыть все потребности фронтенда.

## Формат ответа

Все эндпоинты оборачивают ответ в единый формат:

```json
{ "success": true, "data": <T>, "message": "..." }
{ "success": false, "error": "описание ошибки" }
```

---

## Tier 1 — Ядро (без этого приложение не работает)

### 1.1 Аутентификация

- [ ] `POST /api/auth/register` — регистрация `{ name, email, password }` → `{ user, token }`
- [ ] `POST /api/auth/login` — вход `{ email, password }` → `{ user, token }`
- [ ] `GET /api/auth/me` — текущий пользователь по Bearer-токену → `User`
- [ ] Middleware авторизации: проверка Bearer-токена, прокидывание `userId` в request

**Модель User:**

```
id, email, name, createdAt, updatedAt
```

### 1.2 CRUD подписок

- [ ] `POST /api/subscriptions` — создание подписки
- [ ] `GET /api/subscriptions` — список подписок текущего пользователя
- [ ] `GET /api/subscriptions/:id` — одна подписка (проверка принадлежности userId)
- [ ] `PUT /api/subscriptions/:id` — частичное обновление (все поля опциональны)
- [ ] `DELETE /api/subscriptions/:id` — удаление

**Query-параметры для GET /api/subscriptions:**

- `category` — фильтр по категории
- `status` — фильтр по статусу (`active`, `paused`, `cancelled`)
- `minPrice`, `maxPrice` — фильтр по цене

**Модель Subscription:**

```
id, name, description?, price, currency, billingCycle (daily|weekly|monthly|yearly),
nextBillingDate, status (active|paused|cancelled), category?, color?, userId, createdAt, updatedAt
```

---

## Tier 2 — Профиль и безопасность

### 2.1 Управление профилем

- [ ] `PUT /api/auth/profile` — обновление имени `{ name }` → `User`
- [ ] `POST /api/auth/change-password` — смена пароля `{ currentPassword, newPassword }` → `{ message }`
- [ ] `DELETE /api/auth/account` — удаление аккаунта (каскадное удаление всех данных) → `{ message }`

### 2.2 Аватар

- [ ] `POST /api/auth/avatar` — загрузка аватара (multipart/form-data, поле `avatar`) → `{ avatarUrl }`
- [ ] `DELETE /api/auth/avatar` — удаление аватара → `{ message }`
- [ ] Хранение файлов (S3/локальная папка) + отдача по URL

### 2.3 Сброс пароля

- [ ] `POST /api/auth/forgot-password` — отправка email со ссылкой сброса `{ email }` → `{ message }`
- [ ] (Опционально) `POST /api/auth/reset-password` — сброс пароля по токену из email

---

## Tier 3 — Замоканные данные (UI готов, нужен бекенд)

### 3.1 Пользовательские настройки (preferences)

- [ ] `GET /api/user/preferences` — получить настройки текущего пользователя
- [ ] `PUT /api/user/preferences` — обновить настройки

**Структура preferences:**

```json
{
  "notifications": {
    "emailNotifications": true,
    "pushNotifications": true,
    "paymentReminders": true,
    "priceChangeAlerts": false,
    "weeklyReport": true,
    "marketingEmails": false
  },
  "regional": {
    "currency": "USD",
    "language": "en",
    "timezone": "UTC"
  },
  "appearance": {
    "theme": "system",
    "compactMode": false
  }
}
```

### 3.2 История платежей (billing history)

- [ ] `GET /api/billing/history` — список платежей пользователя

**Модель BillingRecord:**

```
id, date, description, amount, status (paid|pending|failed), subscriptionId?
```

### 3.3 Способы оплаты (payment methods)

- [ ] `GET /api/payment-methods` — список способов оплаты
- [ ] `POST /api/payment-methods` — добавить способ оплаты
- [ ] `PUT /api/payment-methods/:id` — обновить (например, сделать default)
- [ ] `DELETE /api/payment-methods/:id` — удалить

**Модель PaymentMethod:**

```
id, brand (visa|mastercard|amex|...), last4, expiry, isDefault
```

### 3.4 Текущий план

- [ ] `GET /api/billing/plan` — текущий план пользователя

**Модель Plan:**

```
name, price, billingCycle, features[]
```

---

## Tier 4 — Новые фичи (UI частично готов или ссылки есть)

### 4.1 Экспорт / Импорт данных

- [ ] `GET /api/export/csv` — выгрузка подписок в CSV-файл (Content-Type: text/csv)
- [ ] `POST /api/import` — загрузка CSV/JSON файла с подписками

### 4.2 Аналитика

- [ ] `GET /api/analytics/summary` — сводка: общая сумма в месяц, изменение vs прошлый месяц, количество подписок по статусам
- [ ] `GET /api/analytics/spending-history` — история расходов по месяцам (для графика)
- [ ] `GET /api/analytics/by-category` — расходы по категориям

### 4.3 Google OAuth

- [ ] `POST /api/auth/google` — авторизация через Google (принимает OAuth-токен) → `{ user, token }`

### 4.4 Пагинация

- [ ] Добавить поддержку `page`, `limit` в `GET /api/subscriptions`
- [ ] Ответ: `{ data: Subscription[], total: number, page: number, limit: number }`

### 4.5 Серверный поиск

- [ ] Добавить query-параметр `search` в `GET /api/subscriptions` — поиск по имени подписки

---

## Итого: объём задач

| Tier                       | Задач        | Эндпоинтов         | Статус                    |
| -------------------------- | ------------ | ------------------ | ------------------------- |
| 1 — Ядро                   | 2 задачи     | 9 эндпоинтов       | Критично для запуска      |
| 2 — Профиль                | 3 задачи     | 5 эндпоинтов       | Нужно для полноценного UX |
| 3 — Моки → реальные данные | 4 задачи     | 7 эндпоинтов       | UI ждёт данных            |
| 4 — Новые фичи             | 5 задач      | ~8 эндпоинтов      | Можно делать итеративно   |
| **Всего**                  | **14 задач** | **~29 эндпоинтов** |                           |
