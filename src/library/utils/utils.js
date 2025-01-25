export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// https://stackoverflow.com/a/55256318
const objectsEqual = (o1, o2) =>
  typeof o1 === 'object' && Object.keys(o1).length > 0
    ? Object.keys(o1).length === Object.keys(o2).length &&
      Object.keys(o1).every((p) => objectsEqual(o1[p], o2[p]))
    : o1 === o2;

// https://stackoverflow.com/a/55256318
export const arraysEqual = (a1, a2) =>
  a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]));

export function getExerciseByID(entryExerciseID, exerciseList) {
  return exerciseList.find((exercise) => exercise.id === entryExerciseID) ?? {};
}

export function formatDateToString(date) {
  return convert24hTo12h(new Date(date).toLocaleTimeString());
}

export function reduceDailyEntriesForDisplay(payload) {
  let allEntries = {};
  Object.entries(payload).forEach(
    ([key, value]) =>
      (allEntries = {
        ...allEntries,
        [key]: value.reduce((prev, curr) => prev + curr.amount, 0),
      }),
  );
  return allEntries;
}

// https://stackoverflow.com/a/13899011
function convert24hTo12h(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(''); // return adjusted time or original string
}
