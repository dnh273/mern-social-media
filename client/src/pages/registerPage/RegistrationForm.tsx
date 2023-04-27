import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import { ThemeSettings } from "../../theme";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import { useAppDispatch } from "../../hooks/hooks";
import { savedUserRequest } from "../../api/Auth";
import Swal from "sweetalert2";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location: string;
  occupation: string;
};

const RegistrationForm = () => {
  // REACT-FORM-HOOK
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const savedUserResponse = await savedUserRequest(data);
      const saveUser = await savedUserResponse.json();
      console.log(saveUser);
      reset();
      if (saveUser) {
        Swal.fire({
          icon: "success",
          title: "Registration completed successfully",
          text: "Your account has been created!",
        });
        navigate("/login");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${err}`,
      });
    }
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { palette } = useTheme<ThemeSettings>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        <TextField
          type="text"
          placeholder="First name"
          {...register("firstName", { required: true, maxLength: 80 })}
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          type="text"
          placeholder="Last name"
          {...register("lastName", { required: true, maxLength: 100 })}
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          type="text"
          placeholder="Email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          sx={{ gridColumn: "span 4" }}
        />
        <TextField
          type="password"
          placeholder="Password"
          {...register("password", { required: true, maxLength: 12 })}
          sx={{ gridColumn: "span 4" }}
        />

        <TextField
          type="text"
          placeholder="Location"
          {...register("location", { required: true })}
          sx={{ gridColumn: "span 4" }}
        />
        <TextField
          type="text"
          placeholder="Occupation"
          {...register("occupation", { required: true })}
          sx={{ gridColumn: "span 4" }}
        />

        {/* BUTTONS */}
      </Box>

      <Box>
        <Button
          fullWidth
          type="submit"
          sx={{
            m: "2rem 0 1rem 0",
            p: "1rem",
            backgroundColor: palette.primary.main,
            color: palette.background.alt,
            "&:hover": { color: palette.primary.main },
          }}
        >
          Register
        </Button>
        <Typography
          onClick={() => {
            navigate("/login");
            // resetForm();
          }}
          sx={{
            textDecoration: "underline",
            color: palette.primary.main,
            textAlign: "center",
            transition: "all .3s",
            "&:hover": {
              cursor: "pointer",
              color: palette.primary.light,
            },
          }}
        >
          Already have an account? Login here.
        </Typography>
      </Box>
    </form>
  );
};

export default RegistrationForm;
