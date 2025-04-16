
# 📦 Ecommerce Backend

This is a Node.js-based backend for an eCommerce application, built with Express and MongoDB (via Mongoose). It provides core functionalities like user authentication, category management, and more.

---

## 🚀 Features

- User authentication with JWT
- Secure password handling with bcrypt
- RESTful APIs for categories and potentially other resources
- Modular code structure (configs, controllers, middlewares, models)

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB (via Mongoose)
- **Auth:** JWT, bcrypt

---

## 📁 Project Structure

```
ecommerce-backend/
├── configs/           # Configuration files (auth, DB, server)
├── controllers/       # Route controllers (auth, category)
├── middlewares/       # Middleware logic (e.g., auth)
├── models/            # Mongoose models (e.g., Category)
├── server.js          # Main entry point for the app
├── package.json       # Project metadata and dependencies
```

---

## 🧪 Installation & Usage

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/ecommerce-backend.git
   cd ecommerce-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Set up `.env` or edit `configs/server.config.js`, `db.config.js`, and `auth.config.js` with your custom settings.

4. **Run the server:**
   ```bash
   node server.js
   ```

---

## 📝 Scripts

- **Start server:** `node server.js`
- **Test:** `npm test` *(currently not implemented)*

---

## 📄 License

This project is licensed under the ISC License.
