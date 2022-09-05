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
        console.log(error.response.data);
      }
    })();
  }, []);

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
        {leaderboard.length > 0 ? (
          leaderboard.map((entry) => (
            <LeaderboardItem
              key={entry.userId}
              firstName={entry.firstName}
              lastName={entry.lastName}
              percentage={entry.percentage}
            />
          ))
        ) : (
          <Typography>No users to display</Typography>
        )}
      </Grid>
    </>
  );
}

const LeaderboardItem = ({ firstName, lastName, percentage }) => {
  return (
    <>
      <Typography variant="body1">{`${firstName} ${lastName}`}</Typography>
      <Typography variant="body1">{percentage}%</Typography>
    </>
  );
};
