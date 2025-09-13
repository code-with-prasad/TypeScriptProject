# Student Registration & Login App (React + TypeScript)

## Project Overview
This project is a **React + TypeScript application** that implements a **Login Form** and a **Student Registration Form** with **CRUD operations**. All student data is stored in `db.json` using **json-server** and is **AES-encrypted** for security.  

---

## Features

- **Login Form**: Email & password validation  
- **Student Registration Form** with fields:  
  - Full Name  
  - Email  
  - Phone Number  
  - Date of Birth  
  - Gender  
  - Address  
  - Course Enrolled  
  - Password  
- **CRUD Operations**:  
  - Create new student  
  - Read student list  
  - Update student  
  - Delete student  
- **Security**: AES encryption for all student data stored in `db.json`  
- **Sweet Alerts**: For success/error notifications  

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/task-react-typescript.git
cd task-react-typescript
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start JSON Server
```bash
npx json-server --watch db.json --port 3000
```

### 4. Start the React App
```bash
npm run dev
```

Open your browser and visit:  
```
http://localhost:5173
```

---

## How to Use

### Register New User
1. On the login page, click **“Register New User”**.  
2. Fill in all fields and click **Register**.  
3. After registration, you will be redirected back to the login page.  

### Login
1. Enter registered email & password.  
2. Click **Login**.  
3. If successful, the app will show the **Student Registration form** and **Student List**.  

### Add New Students
1. Fill in student details in the registration form.  
2. Click **Register**.  
3. A success message will appear, and the student will be added to the list.  

### View / Update / Delete Students
- All registered students appear in the **Student List**.  
- Click **Edit** to update a student’s details.  
- Click **Delete** to remove a student.  

---

## Tech Stack Used

- **Frontend**: React + TypeScript  
- **Backend (Mock)**: `json-server`  
- **HTTP Requests**: Axios  
- **Encryption**: CryptoJS (AES)  
- **Alerts**: SweetAlert2  
- **Styling**: CSS  

---

## How Encryption is Implemented

AES encryption is used via `crypto-js`.  

### Encrypt Function
```ts
import CryptoJS from "crypto-js";

const key = "secret_key";

export const encrypt = (data: object) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
};
```

### Decrypt Function
```ts
export const decrypt = <T>(cipherText: string): T | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, key);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted) as T;
  } catch {
    return null;
  }
};
```

- During registration → `encrypt()` is used.  
- During login → `decrypt()` is used to validate credentials.  

---


