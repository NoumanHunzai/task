import { Box } from "@mui/material";
import Routers from "./routes/route";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <Box>
      <AuthProvider>
        {" "}
        <Routers />
      </AuthProvider>
    </Box>
  );
}

export default App;
