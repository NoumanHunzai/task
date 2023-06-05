import React, { useContext } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

const RootContainer = styled(Container)(({ theme }) => ({
  height: "90vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: "bold",
}));

const Description = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const ActionButton = styled(Button)(({ theme }) => ({
  fontWeight: "bold",
}));

const Home = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const handleClick = () => {
    localStorage.removeItem("user");
    navigate("/");
    logout();
  };
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "end", padding: "10px" }}>
        <Button variant="contained" onClick={handleClick}>
          Sign Out
        </Button>
      </Box>
      <RootContainer maxWidth="md">
        <Title variant="h2">Welcome to My Website</Title>
        <Description variant="h5">
          Discover the amazing features of our platform.
        </Description>
        <Link to="/chat">
          <ActionButton variant="contained" color="primary" size="large">
            Get Started Chat
          </ActionButton>
        </Link>
      </RootContainer>
    </>
  );
};

export default Home;
