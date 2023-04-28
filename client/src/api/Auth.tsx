import { DOMAIN } from "../utils/setting/config";

interface UserLogin {
  email: string;
  password: string;
}

interface UserRegistration {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location: string;
  occupation: string;
}

export const loggedInRequest = (userLogin: UserLogin) => {
  return fetch(`${DOMAIN}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userLogin),
  });
};

export const savedUserRequest = (userRegistration: UserRegistration) => {
  return fetch(`${DOMAIN}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userRegistration),
  });
};
