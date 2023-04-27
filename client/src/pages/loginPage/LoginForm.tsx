import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import { ThemeSettings } from "../../theme";
import { useAppDispatch } from "../../hooks/hooks";
import { loggedInRequest } from "../../api/Auth";
import { setLogin } from "../../redux";
import Swal from "sweetalert2";

type FormValues = {
  email: string;
  password: string;
};

const Form = () => {
  // REACT-FORM-HOOK
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("data", data);
    try {
      const loggedInResponse = await loggedInRequest(data);
      console.log(loggedInResponse);
      const loggedIn = await loggedInResponse.json();

      console.log(loggedIn);

      if (loggedInResponse.status === 200) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.accessToken,
          })
        );
        Swal.fire({
          icon: "success",
          title: "Login successfully",
          text: "Welcome to Fakebook, the Social Media for Hacker!",
        });
        navigate("/");
      }
      reset();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${err}`,
      });
    }
  };

  // console.log(errors);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { palette } = useTheme<ThemeSettings>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="grid" gap="30px">
        <TextField
          type="text"
          placeholder="Email"
          {...register("email", { required: true, maxLength: 80 })}
        />
        <TextField
          type="password"
          placeholder="Password"
          {...register("password", { required: true, maxLength: 100 })}
        />

        {/* BUTTONS */}
        <Button
          type="submit"
          sx={{
            mb: "1rem",
            p: "1rem",
            backgroundColor: palette.primary.main,
            color: palette.background.alt,
            "&:hover": { color: palette.primary.main },
          }}
        >
          Login
        </Button>
      </Box>
      <Typography
        onClick={() => {
          navigate("/register");
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
    </form>
  );
};

export default Form;
