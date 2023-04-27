import { Box, BoxProps } from "@mui/material";
import { styled } from "@mui/system";
import { ThemeSettings } from "../theme";

const WidgetWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  padding: "1.5rem 1.5rem .75rem 1.5rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: ".75rem",
}));

export default WidgetWrapper;
