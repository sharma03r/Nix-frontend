import { Box } from "@mui/material";
import TypingAnimation from "../components/typer/TypingAnimation";
import nixImg from "../assets/nix.svg";

const Home = () => {
  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 5,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { md: "row", xs: "column", sm: "column" },
            gap: 5,
            my: 10,
          }}
        >
          <img
            className="rotate"
            src={nixImg}
            alt="nix logo"
            style={{ width: "200px", margin: "auto" }}
          />
        </Box>
        <Box>
          <TypingAnimation />
        </Box>
      </Box>
    </Box>
  );
};
export default Home;
