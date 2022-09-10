import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { getLeaderboard } from "../../api/api";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const resp = await getLeaderboard();
        if (resp.status === 200) {
          setLeaderboard(() => Object.values(resp.data));
        }
      } catch (error) {
        console.log("error getting leaderboard", error.response.data);
      }
    })();
  }, []);

  if (leaderboard.length < 1) return;
  <Typography>No users to display</Typography>;

  return (
    <>
      <Typography variant="h4" sx={{ my: 3 }}>
        Leaderboard
      </Typography>
      <Grid
        container
        justifyContent="space-between"
        sx={{
          my: 2,
          p: 3,
          width: "95%",
          minHeight: "35vh",
          height: "fit-content",
          bgcolor: "lightgrey",
        }}
      >
        {leaderboard.map((entry) => (
          <LeaderboardItem
            key={entry.userId}
            firstName={entry.firstName}
            lastName={entry.lastName}
            percentage={entry.percentage}
          />
        ))}
      </Grid>
    </>
  );
}

const LeaderboardItem = ({ firstName, lastName, percentage }) => {
  return (
    <>
      <Typography variant="body1">{`${firstName} ${lastName}`}</Typography>
      <Typography variant="body1">{percentage * 100}%</Typography>
    </>
  );
};
