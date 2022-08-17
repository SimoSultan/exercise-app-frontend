import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { getAllUsers } from "../../api/api";

export default function Leaderboard() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const resp = await getAllUsers();
        console.log(resp);
        if (resp.status === 200) {
          setUserList(resp.data);
        }
      } catch (error) {}
    })();
  }, []);

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 5 }}>
        All Users
      </Typography>
      {userList.length > 0 ? (
        userList.map((user) => (
          <Typography>
            {user.first_name} {user.last_name}
          </Typography>
        ))
      ) : (
        <Typography>No users to display</Typography>
      )}
    </div>
  );
}
