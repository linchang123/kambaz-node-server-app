import * as enrollmentsDao from "../Enrollments/dao.js";

export default function EnrollmentRoutes(app) {
    const unenrollCourseForCurrentUser = (req, res) => {
        const { enrollmentId } = req.params;
        enrollmentsDao.unenrollUserInCourse(enrollmentId);
        res.sendStatus(204);
      };
      
    const enrollCourseForUser = (req, res) => {
      const {userId, courseId} = req.body;
      enrollmentsDao.enrollUserInCourse(userId, courseId);
      res.send(200);
    }
    const unenrollCourseForUser = (req, res) => {
      const {userId, courseId} = req.body;
      enrollmentsDao.unenrollUserFromCourse(userId, courseId);
      res.send(200);
    }
    app.delete("/api/enrollments/:enrollmentId", unenrollCourseForCurrentUser);
    app.put("/api/enrollments/enroll", enrollCourseForUser);
    app.put("/api/enrollments/unenroll", unenrollCourseForUser);
}