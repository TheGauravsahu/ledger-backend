# 💰 Ledger Backend (MERN Stack)

A production-ready **Ledger Backend API** built using the MERN stack principles (MongoDB, Express, Node.js). This project provides secure account management, transaction handling, and authentication using JWT.

---

## 🚀 Features

* 🔐 JWT Authentication (Register, Login, Logout)
* 👤 User Management
* 🏦 Account Creation & Balance Tracking
* 💸 Transactions Between Accounts
* 🧾 Idempotent Transactions (Prevents duplicate transfers)
* ⚙️ System-controlled Initial Funding
* 🛡️ Middleware-based Authorization
* ✅ Input Validation using custom validators
* ❤️ Clean and scalable folder structure

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT (JSON Web Tokens)
* **Validation:** Custom Validators

---

## 📂 Project Structure

```
ledger-backend/
│──src
│──── controllers/
│──── middlewares/
│───- models/
│──── routes/
│──── validators/
│──── services/
│──── utils/
│──── config/
│──── app.js
│──── server.js
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/TheGauravsahu/ledger-backend.git
cd ledger-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in root:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=dev
REFRESH_TOKEN=
GOOGLE_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GMAIL_USER=
```

### 4. Run the server

```bash
npm run dev
```

Server will start at:
👉 `http://localhost:3000`

---

## 📡 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint                   | Description      |
| ------ | -------------------------- | ---------------- |
| POST   | `/api/auth/register`       | Register user    |
| POST   | `/api/auth/login`          | Login user       |
| POST   | `/api/auth/logout`         | Logout user      |
| GET    | `/api/auth/getCurrentUser` | Get current user |

---

### 🏦 Account Routes

| Method | Endpoint                           | Description         |
| ------ | ---------------------------------- | ------------------- |
| POST   | `/api/accounts`                    | Create account      |
| GET    | `/api/accounts`                    | Get all accounts    |
| GET    | `/api/accounts/:accountId/balance` | Get account balance |

---

### 💸 Transaction Routes

| Method | Endpoint                                 | Description               |
| ------ | ---------------------------------------- | ------------------------- |
| POST   | `/api/transactions`                      | Create transaction        |
| GET    | `/api/transactions`                      | Get all user transactions |
| POST   | `/api/transactions/system/initial-funds` | System initial funding    |

---

### ❤️ Health Check

| Method | Endpoint  |
| ------ | --------- |
| GET    | `/health` |

---

## 🔑 Authentication Flow

1. User registers
2. User logs in → receives JWT
3. JWT is sent in headers:

```http
Authorization: Bearer <token>
```

4. Protected routes validate user via middleware

---

## 💡 Example Transaction Payload

```json
{
  "fromAccount": "account_id",
  "toAccount": "account_id",
  "amount": 500,
  "idempotencyKey": "unique-key-123"
}
```

---

## ⚠️ Important Concepts

### 🔁 Idempotency

* Prevents duplicate transactions
* Each transaction must include a unique `idempotencyKey`

### 🏦 System User

* Used for initial funding
* Authenticated via `SYSTEM_USER_TOKEN`

---

## 🧪 Testing

You can test APIs using:

* Postman
* Thunder Client
* Requestly (as used for exporting OpenAPI)


## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create your feature branch
3. Commit changes
4. Push and open a PR

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Gaurav Sahu**

---

## ⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!