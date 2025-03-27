/**
 * implements various CRUD operations for handling the users array in the Database.
 */
import db from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
let { users } = db;
export const createUser = (user) => {
 const newUser = { ...user, _id: uuidv4() };
 users = [...users, newUser];
 return newUser;
};
// export const createUser = (user) => (users = [...users, { ...user, _id: uuidv4() }]);
export const findAllUsers = () => users;
export const findUserById = (userId) => users.find((user) => user._id === userId);
/**
 * "findUserByUsername()"function is called to check if a user with specified
 * username already exists. 
 * */ 
export const findUserByUsername = (username) => users.find((user) => user.username === username);
export const findUserByCredentials = (username, password) =>
  users.find( (user) => user.username === username && user.password === password );
export const updateUser = (userId, user) => (users = users.map((u) => (u._id === userId ? user : u)));
export const deleteUser = (userId) => (users = users.filter((u) => u._id !== userId));