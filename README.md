# Backend Design Exercise
**Made by:** Alex Abainza, BS Computer Science 3
## About the App
This is a basic backend application built using Node.js and Express.js. It simulates a database using mock models stored in JSON files, and includes middleware for authentication, logging, and rate limiting.
<hr/>

## Features
1. **User registration**
2. **User login**
3. **Profile Management**
<hr/>

## Middleware
1. **Authentication Middleware**: Protects the profile route by checking if the user is logged in.
2. **Logging Middleware**: Logs incoming request details, including method type, route, and timestamp.
3. **Rate Limiter**: Limits the number of requests a user can make within a specified time window.
4. **Error Handler**:  Manages errors throughout the application.
5. **Input Validation**: Utilizes Joi for validating user input during registration and login.
6. **Token-Based Authentication**: Implements JWT for secure token management instead of mock tokens.

## Links

**Link to code:** [Zip File](https://drive.google.com/file/d/1IUWA6gVHIUin3Vzpqi-7tNpcpSWXc--S/view?usp=sharing)
<br/>
**Demo:** [Postman Demo](https://drive.google.com/file/d/1knZvSnKVP9CLAkI7T1SHdSZswhEgCi81/view?usp=sharing)

## Set up and installation
1. **Clone the repository**
```
git clone https://github.com/alexabainza/backend-design-activity
```

2. **Navigate to the root folder**
```
cd backend-design-activity
```

3. **Install dependencies**
```
npm install
```

4. **Run the app**
```
nodemon index.js
```


<hr/>
