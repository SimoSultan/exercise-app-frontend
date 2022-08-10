export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function getExerciseName(id, allExercises) {
  return capitalize(
    allExercises.find((ex) => ex.id === id)?.name || "not found"
  );
}
