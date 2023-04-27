import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { ThemeSettings } from "../../theme";
import RegistrationForm from "./RegistrationForm";

const RegisterPage = () => {
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
        <Typography fontWeight="bold" fontSize="32px" color="primary">
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
        <RegistrationForm />
      </Box>
    </Box>
  );
};

export default RegisterPage;
