export const DATABASE = {
  users: [
    {
      id: 1,
      firstName: "Simo",
      lastName: "Sultan",
      exercises: [
        {
          id: 1,
          amount: 20,
          dailyBanked: 0,
        },
        {
          id: 2,
          amount: 30,
          dailyBanked: 0,
        },
      ],
    },
  ],
  exercises: [
    {
      id: 1,
      name: "push ups",
    },
    {
      id: 2,
      name: "sit ups",
    },
    {
      id: 3,
      name: "crunches",
    },
  ],
  leaderboard: [
    {
      "29-06-2022": [
        {
          userId: 1,
          exercises: [
            {
              id: 1,
              total: "10/20",
            },
            {
              id: 2,
              total: "30/30",
            },
          ],
        },
      ],
    },
  ],
};
