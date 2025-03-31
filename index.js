// const express = require('express')   require() function is equivalent to the "import" keyword in React which loads a libary into the local source. 
import express from 'express';
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import session from "express-session";
import cors from "cors";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import SessionController from "./Lab5/SessionController.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from './Kambaz/Assignments/routes.js';
import EnrollmentRoutes from './Kambaz/Enrollments/routes.js';
/**
 * import the "dotenv" library to determine whether the application is running in the
 * development environment, and configure the session accordingly.
 *  */ 
import "dotenv/config";

const app = express()   // express() function call creates an instance of the express library and assigns it to local constant "app"
/**
 * Configure CORS to support cookies and restrict network access
 * to come only from the React application.
 */
app.use(cors({
   credentials: true,
   origin: process.env.NETLIFY_URL || "http://localhost:5173",
})); 

// Configure sessions after configuring cors
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
  };
  // need to encrypt session/cookie in production environment
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      domain: process.env.NODE_SERVER_DOMAIN,
    };
  }
  app.use(session(sessionOptions));

/**
 * enable the server to parse JSON data from request body
 * make sure this comes after configuring CORS and session,
 * but before all other routes.
 */
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);
Hello(app);
Lab5(app);
SessionController(app);
app.listen(process.env.PORT || 4000)
