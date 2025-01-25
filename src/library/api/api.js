import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  withCredentials: true,
});

const get = async (path) => {
  try {
    return api.get(path);
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.data); // Log the response data for more details
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error('Error', error.message);
    }
  }
};

const post = async (path, req) => {
  try {
    return api.post(path, req);
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.data); // Log the response data for more details
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error('Error', error.message);
    }
  }
};

// AUTH

export async function logoutUser() {
  return await get('/auth/logout');
}

// USERS

export async function getCurrentUser() {
  return await get('/users/current');
}

export async function updateUserDetails(user) {
  return await post('/users/update', {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
  });
}

export async function getAllUsers() {
  return await get('/users/list');
}

// export async function updateUser(userID, payload) {
//   const userIdx = DATABASE.users.findIndex((user) => user.id === userID);
//   DATABASE.users[userIdx] = payload;
//   return DATABASE.users[userIdx];
// }

// EXERCISES

export async function createUserExercise(routineId, exerciseDetails, order) {
  const { name, amount, unit } = exerciseDetails;

  return await post('/exercises/create', {
    routineId,
    name,
    amount,
    unit,
    order,
  });
}

export async function getUserExercises(routineId) {
  return await post('/exercises/list', { routineId });
}

export async function deleteUserExercise(id) {
  return await post('/exercises/delete', { id });
}

export async function updateUserExerciseBatch(exercises) {
  return await post('/exercises/batch-update', {
    exercises,
  });
}

// ENTRIES

export async function getAllEntriesOfExercise(exerciseId) {
  return await post('/entries/list', { exerciseId });
}

export async function getUserEntriesDaily(exerciseIds) {
  return await post('/entries/list-batch-daily', {
    exerciseIds,
    day: new Date(),
  });
}

export async function submitExerciseEntry(exerciseId, amount) {
  return await post('/entries/create', {
    exerciseId,
    amount,
  });
}

// LEADERBOARD

export async function getDailyLeaderboard() {
  return await post('/leaderboard', {
    from: new Date(),
    to: new Date(),
  });
}

export async function getUserLeaderboard(userId, days = 1) {
  return await post('/leaderboard/user', {
    from: new Date(Date.now() - 1000 * 60 * 60 * 24 * days),
    to: new Date(),
    userId,
  });
}
