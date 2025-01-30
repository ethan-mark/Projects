# Retire Confident and Clear

This project powers [Retire Confident and Clear](https://www.retireconfidentandclear.com/), a website that allows users to submit their information via a React-based frontend. The form data is sent to an Express.js backend, which integrates with the **Redtail CRM API** to store user submitted data.

---

## **Project Overview**
- **Frontend:** Built with React, it displays static HTML content and includes a form that sends user data to the backend API.
- **Backend:** Developed in Express.js, it processes form submissions and forwards the data to the **Redtail CRM API**.
- **CRM Integration:** The backend fetches authentication from Redtail and submits user details.

---

## **Tech Stack**
- **Frontend:** React
- **Backend:** Node.js, Express.js
- **API Integration:** Redtail CRM API
- **Database (Optional):** MongoDB / PostgreSQL (if needed for logging submissions)
- **Authentication:** API Key (Redtail CRM)

---

## **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/retire-confident-and-clear.git
cd retire-confident-and-clear 
```

### 2. Set up the frontend
```bash
#Frontend
* cd my-frontend
* npm install
* npm run start
```

### 3. Set up the Backend
```bash
#Backend
* cd my-backend
* npm install
* Open up server.js, scroll to the bottom and uncomment the app.listen portion to run it locally
* node server.js
```



