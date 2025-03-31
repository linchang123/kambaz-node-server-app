import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  const newEnrollment = { _id: uuidv4(), user: userId, course: courseId }
  enrollments.push(newEnrollment);
  return newEnrollment;

}

export function unenrollUserInCourse(enrollmentId) {
  const {enrollments} = Database;
  Database.enrollments = enrollments.filter((enrollment) => 
    (enrollment._id !== enrollmentId));
  
}

export function findEnrollmentsforUser(userId) {
    const { enrollments } = Database;
    const enrolled = enrollments.filter((enrollment) =>
      (enrollment.user === userId));
    return enrolled;
}

export function unenrollUserFromCourse(userId, courseId) {
  const {enrollments} = Database;
  Database.enrollments = enrollments.filter((enrollment) => 
    enrollment.course !== courseId || enrollment.user !== userId);
  return Database.enrollments
}