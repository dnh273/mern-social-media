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
  return fetch("http://localhost:6001/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userLogin),
  });
};

export const savedUserRequest = (userRegistration: UserRegistration) => {
  return fetch("http://localhost:6001/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userRegistration),
  });
};
