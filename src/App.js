import { useState } from "react";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

import {
  FixedBottomNavigation,
  Header,
  Footer,
} from "./library/components/exports";
import ExerciseRouter from "./library/routes/ExerciseRouter";

import {
  BOTTOM_NAVIGATION_HEIGHT,
  HEADER_HEIGHT,
  FOOTER_HEIGHT,
} from "./library/styles/styles";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  function handleLogin() {
    setAuthenticated(true);
    switch (activeTab) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/profile");
        break;
      case 2:
        navigate("/bank");
        break;
      case 3:
        navigate("/leaderboard");
        break;
    }
  }
  function handleLogout() {
    setAuthenticated(false);
    navigate("/");
  }

  function handleChangeTab(tabNumber) {
    setActiveTab(parseInt(tabNumber));
  }

  return (
    <div className="App">
      <Header
        handleLogout={handleLogout}
        authenticated={authenticated}
        handleLogin={handleLogin}
      />
      <Container
        maxWidth="sm"
        sx={{
          minHeight: `calc(100vh - ${
            BOTTOM_NAVIGATION_HEIGHT + HEADER_HEIGHT + FOOTER_HEIGHT
          }px)`,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ExerciseRouter
          handleLogin={handleLogin}
          authenticated={authenticated}
        />
      </Container>
      <Footer />
      <FixedBottomNavigation
        activeTab={activeTab}
        handleChangeTab={handleChangeTab}
      />
    </div>
  );
}

export default App;
