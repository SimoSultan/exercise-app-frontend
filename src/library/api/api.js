import axios from "axios";
import { DATABASE } from "../database";

const { users, exercises, leaderboard } = DATABASE;

const ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const api = axios.create({
  baseURL: ENDPOINT,
  withCredentials: true,
});

export async function getPing() {
  return await api.get("/ping").then((res) => res.data);
}

export async function postEcho(payload) {
  return api.post("/echo", payload).then((res) => res.data);
}

// AUTH

export async function getCurrentUser() {
  try {
    return await checkIfCurrentUser();
  } catch (error) {
    console.log(`checkIfCurrentUser: ${error.code}: ${error.message}`);
    return error;
  }
}

export async function logoutUser() {
  try {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/auth/logout`);
  } catch (error) {
    console.log(`logoutUser: ${error.code}: ${error.message}`);
    return error.message;
  }
}

// USERS

export async function checkIfCurrentUser() {
  return await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/users/current`,
    { withCredentials: true }
  );
}

export async function addNewExerciseToUser(userID, payload) {
  const userIdx = DATABASE.users.findIndex((user) => user.id === userID);
  DATABASE.users[userIdx].exercises.push({ ...payload });
  return DATABASE.users[userIdx];
}

export async function removeExerciseFromUser(userID, exerciseID) {
  const userIdx = DATABASE.users.findIndex((user) => user.id === userID);
  DATABASE.users[userIdx].exercises = DATABASE.users[userIdx].exercises.filter(
    (ex) => ex.id !== exerciseID
  );
  return DATABASE.users[userIdx];
}

export async function updateUser(userID, payload) {
  const userIdx = DATABASE.users.findIndex((user) => user.id === userID);
  DATABASE.users[userIdx] = payload;
  return DATABASE.users[userIdx];
}

// EXERCISES

export async function getAllExercises() {
  return await exercises;
}

export async function getExercise(id = 1) {
  return await exercises.find((exercise) => exercise.id === id);
}

export async function addNewExerciseToExercises(name) {
  let exercisesLength = exercises.length;
  DATABASE.exercises.push({ id: exercisesLength + 1, name });
  return exercisesLength + 1;
}
