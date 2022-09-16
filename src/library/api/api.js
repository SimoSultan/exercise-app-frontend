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

export async function updateUserDetails(user) {
  return await api.post("/users/update", {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
  });
}

// export async function updateUser(userID, payload) {
//   const userIdx = DATABASE.users.findIndex((user) => user.id === userID);
//   DATABASE.users[userIdx] = payload;
//   return DATABASE.users[userIdx];
// }

// EXERCISES

export async function createUserExercise(routineId, exerciseDetails, order) {
  const { name, amount, unit } = exerciseDetails;

  return await api.post("/exercises/create", {
    routineId,
    name,
    amount,
    unit,
    order,
  });
}

export async function getUserExercises(routineId) {
  return await api.post("/exercises/list", { routineId });
}

export async function deleteUserExercise(id) {
  return await api.post("/exercises/delete", { id });
}

export async function updateUserExerciseBatch(exercises) {
  return await api.post("/exercises/batch-update", { exercises });
}

// ENTRIES

export async function getUserEntry(exerciseId) {
  return await api.post("/entries/list", { exerciseId });
}

export async function getUserEntries(exerciseIds) {
  return await api.post("/entries/list-batch", { exerciseIds });
}

export async function getUserEntriesDaily(exerciseIds) {
  return await api.post("/entries/list-batch-daily", {
    exerciseIds,
    day: new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "Australia/Brisbane",
      })
    ),
  });
}

export async function submitExerciseEntry(exerciseId, amount) {
  return await api.post("/entries/create", { exerciseId, amount });
}

// LEADERBOARD

export async function getLeaderboard() {
  return await api.post("/leaderboard", {
    day: new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "Australia/Brisbane",
      })
    ),
  });
}
