import { Grid, Typography } from "@mui/material";
import {
  capitalize,
  formatDateToString,
  getExerciseByID,
} from "../../utils/utils";
import { SectionTitle } from "../exports";

export default function EntriesList({ userEntries, userExercises }) {
  return (
    <>
      <SectionTitle>Previously Banked Today</SectionTitle>
      {Object.values(userEntries).every((entry) => entry === 0) ? (
        <Typography>No entries submitted yet.</Typography>
      ) : (
        <Grid
          container
          flexDirection="column"
          justifyContent="center"
          alignItems="space-between"
        >
          {Object.entries(userEntries).length > 0
            ? Object.entries(userEntries).map(([exerciseID, entryList]) => {
                const { name = "", unit = "reps" } = getExerciseByID(
                  exerciseID,
                  userExercises
                );
                return (
                  <Grid
                    key={exerciseID}
                    item
                    container
                    justifyContent="space-between"
                    sx={{ px: 4, py: 1 }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      {capitalize(name)}
                    </Typography>
                    <EntryList entryList={entryList} unit={unit} />
                  </Grid>
                );
              })
            : null}
        </Grid>
      )}
    </>
  );
}

const EntryList = ({ entryList, unit }) => {
  if (entryList.length < 1) return null;

  return (
    <Grid container flexDirection="column">
      {entryList.map(({ id, amount, created_at }) => (
        <Grid
          key={id}
          item
          container
          justifyContent="space-between"
          sx={{ px: 4, py: 1 }}
        >
          <Typography>
            {amount} {amount === 1 ? unit.slice(0, -1) : unit}
          </Typography>
          <Typography>{formatDateToString(created_at)}</Typography>
        </Grid>
      ))}
    </Grid>
  );
};
