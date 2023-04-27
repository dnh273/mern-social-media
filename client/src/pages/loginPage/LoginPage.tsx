import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useAppDispatch } from "../../hooks/hooks";
import { setLogout } from "../../redux";
import { ThemeSettings } from "../../theme";
import Form from "./LoginForm";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme<ThemeSettings>();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          bgcolor: theme.palette.background.alt,
          p: "1rem 6%",
          textAlign: "center",
        }}
      >
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color="primary"
          sx={{
            cursor: "pointer",
          }}
          onClick={() => {
            dispatch(setLogout());
          }}
        >
          Fakebook
        </Typography>
      </Box>

      <Box
        p="2rem"
        m="2rem auto"
        mb="5rem"
        width={isNonMobileScreens ? "50%" : "93%"}
        sx={{
          borderRadius: "1.5rem",
          bgcolor: theme.palette.background.alt,
        }}
      >
        <Typography
          fontWeight="500"
          variant="h5"
          sx={{ mb: "1.5rem", textAlign: "center" }}
        >
          Welcome to Fakebook, the Social Media for Hacker!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
