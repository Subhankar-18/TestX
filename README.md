📘 TestX – Online Examination Portal
🚀 Overview
TestX is a full-stack web application that enables administrators to create and manage exams, categories, and questions, while students can attempt exams and view their results.

The system follows Role-Based Access Control (RBAC) and uses JWT authentication for secure access. Passwords are securely stored using BCrypt hashing.

👥 User Roles
🔹 Admin
Create and manage categories
Create and manage exams
Add, update, delete questions
View system data
🔹 Student
Register and login
Attempt exams
Submit answers
View results
🔐 Security Features
JWT (JSON Web Token) for authentication
RBAC (Role-Based Access Control) for authorization
BCrypt for secure password hashing
Protected APIs based on user roles
⚙️ Features
📌 Admin Features
Create categories (e.g., Java, DBMS, Aptitude)
Create exams under categories
Add multiple questions per exam
Manage questions (CRUD operations)
📌 Student Features
Browse available exams
Attempt exams (no timer constraint)
Submit answers
View scores/results
🧱 Tech Stack
🔹 Backend
Spring Boot
Spring Security (JWT-based authentication)
JPA (Hibernate)
MySQL
🔹 Frontend
React.js
🔹 Deployment
Backend → Render
Frontend → Netlify
Database → Aiven (MySQL)
🗄️ Database Design (High-Level)
User (id, username, password,firstname,lastname,phone number,email)
Role (id,name)
Category (id, title, description)
Quiz (id, title, category_id,description,maxMarks,numberOfQuestions,active)
Question (id, question_text, option 1,option 2,option 3,option 4, correct_answer, exam_id)
🔁 Application Flow
User registers/logs in
JWT token is generated
Admin creates categories, exams, questions
Student selects and attempts exam
Answers are submitted
Backend evaluates and stores result
Student views score
📡 Sample API Endpoints
🔐 Authentication
POST /user/
POST //generate-token
📂 Category
POST /category/ (Admin)
GET /category/
GET /category/{cid}
📝 Quiz
POST /quiz/ (Admin)
GET /quiz/active
❓ Quiz
POST /quiz/ (Admin)
GET /quiz/{qid}
🔧 Installation & Setup
Backend (Spring Boot)
git clone <backend-repo-url>
cd backend
mvn clean install
mvn spring-boot:run
Frontend (React)
git clone <frontend-repo-url>
cd frontend
npm install
npm start
🌍 Deployment Links
Frontend (Netlify): <your-netlify-url>
Backend (Render): <your-render-url>
Database (Aiven): Managed MySQL instance
⚠️ Notes
No timer functionality is implemented for exams
JWT token must be included in headers for protected APIs
Role-based access is strictly enforced
📌 Future Enhancements
Add timer-based exams
Advanced analytics for performance
teacher tracking performance
👨‍💻 Author
TestX Project – Full-stack Exam system built using Spring Boot and React.

⭐ Summary
TestX is a secure, role-based online examination platform that allows admins to manage exams and students to attempt them, built with modern technologies and deployed on cloud platforms.
