import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  withCredentials: true,
});

// AUTH

export async function logoutUser() {
  return api.get("/auth/logout");
}

// USERS

export async function getCurrentUser() {
  return await api.get("/users/current");
}

export async function updateUserDetails(sessionUserID, user) {
  return await api.post("/users/update", {
    sessionUserID,
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
  });
}

export async function getAllUsers() {
  return await api.get("/users/list");
}

// export async function updateUser(userID, payload) {
//   const userIdx = DATABASE.users.findIndex((user) => user.id === userID);
//   DATABASE.users[userIdx] = payload;
//   return DATABASE.users[userIdx];
// }

// EXERCISES

export async function createUserExercise(
  sessionUserID,
  routineId,
  exerciseDetails,
  order
) {
  const { name, amount, unit } = exerciseDetails;

  return await api.post("/exercises/create", {
    sessionUserID,
    routineId,
    name,
    amount,
    unit,
    order,
  });
}

export async function getUserExercises(sessionUserID, routineId) {
  return await api.post("/exercises/list", { sessionUserID, routineId });
}

export async function deleteUserExercise(sessionUserID, id) {
  return await api.post("/exercises/delete", { sessionUserID, id });
}

export async function updateUserExerciseBatch(sessionUserID, exercises) {
  return await api.post("/exercises/batch-update", {
    sessionUserID,
    exercises,
  });
}

// ENTRIES

export async function getUserEntry(sessionUserID, exerciseId) {
  return await api.post("/entries/list", { sessionUserID, exerciseId });
}

export async function getUserEntries(sessionUserID, exerciseIds) {
  return await api.post("/entries/list-batch", { sessionUserID, exerciseIds });
}

export async function getUserEntriesDaily(sessionUserID, exerciseIds) {
  return await api.post("/entries/list-batch-daily", {
    sessionUserID,
    exerciseIds,
    day: new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "Australia/Brisbane",
      })
    ),
  });
}

export async function submitExerciseEntry(sessionUserID, exerciseId, amount) {
  return await api.post("/entries/create", {
    sessionUserID,
    exerciseId,
    amount,
  });
}

// LEADERBOARD

export async function getLeaderboard(sessionUserID) {
  return await api.post("/leaderboard", {
    sessionUserID,
    day: new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "Australia/Brisbane",
      })
    ),
  });
}
