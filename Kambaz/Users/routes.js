import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

// let currentUser = null;
export default function UserRoutes(app) {
  const createUser = (req, res) => { };
  const deleteUser = (req, res) => { };
  const findAllUsers = (req, res) => { 
    const users = dao.findAllUsers();
    res.json(users);
  };
  const findUserById = (req, res) => { };
  const updateUser = (req, res) => { 
    const userId = req.params.userId;
    const userUpdates = req.body;
    dao.updateUser(userId, userUpdates);
    const currentUser = dao.findUserById(userId);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);

  };
  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username);
    /**
     * if a user is found a 400 error status is returned along with
     * an error message for display in the UI
     *  */ 
    if (user) {
      res.status(400).json(
        { message: "Username already in use" });
      return;
    }
    /**
     * (deleted) If the username is not already taken the user is inserted into
     * (deleted) the database and stored in the currentUser server variable.
     * (deleted) The response returned by the server includes the newly created user.
     * If the username is not already taken, create the new user and store it
     * in the session's "currentUser" property to remember that this new user
     * is now the currently logged-in user.
     */
    // currentUser = dao.createUser(req.body);
    const currentUser = dao.createUser(req.body);
    req.session["currentUser"] = currentUser;

    res.json(currentUser);

   };
  const signin = (req, res) => {
    // extracts username and password from the request's body
    const { username, password } = req.body;
    // pass username and password properties into findUserByCredentials function
    // implemented by the DAO.
    // currentUser = dao.findUserByCredentials(username, password);

    // the found user is sent to the client in the response
    // res.json(currentUser);

    /**
     * signin route looks up the user by their credentials, stores it in "currentUser"
     * session, and responds with the user if they exist.
     * Otherwise, responds with an error.
     */
    const currentUser = dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }

   };

   // route for users to signout which resets "currentUser" to null in the server
  const signout = (req, res) => { 
    // currentUser = null;
    req.session.destroy(); // users can be signed out by destroying the session
    res.sendStatus(200);

  };

/**
 * When a successful sign in occurs, the account information is stored in a server variable
 * called "currentUser". The variable retains the signed-in user information as long as the
 * server is running.
 * The Sign in screen in the client copies "currentUser" from the server into the "currentUser"
 * state variable in the reducer and then navigates to the Profile screen.
 * If the browser reloads, the "currentUser" state variable is cleared and the user is logged out.
 * To address this, the browser must check whether someone is already logged in from the server,
 * and if so, update the copy in the reducer.
 * create profile route on the server to provide access to "currentUser"
 */
  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = courseDao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };
  const findEnrollmentsForUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const enrollments = enrollmentsDao.findEnrollmentsforUser(userId);
    res.json(enrollments);
  };
  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    const newCourse = courseDao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };
  const enrollCourseForCurrentUser = (req, res) => {
    const currentUser = req.session["currentUser"];
    const courseId = req.body.courseId;
    const newEnrollment = enrollmentsDao.enrollUserInCourse(currentUser._id, courseId);
    res.json(newEnrollment);
  };

  app.post("/api/users/current/courses", createCourse);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);

  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);

  // "signup" route is mapped to the "api/users/signup" path
  app.post("/api/users/signup", signup);

  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);

  app.post("/api/users/enroll", enrollCourseForCurrentUser);

}
