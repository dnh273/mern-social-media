import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserRequest } from "../../api/User";
import { useAppSelector } from "../../hooks/hooks";
import Navbar from "../navbar/Navbar";
import FriendListWidget from "../widgets/FriendListWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import UserWidget from "../widgets/UserWidget";

type UserParam = {
  userId: string;
};

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  picturePath: string;
  friends: [];
  location: string;
  occupation: string;
  viewedProfile: string;
};

const ProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<User>();
  console.log("user", user);
  const token = useAppSelector((state) => state.auth.token);
  const { _id } = useAppSelector((state) => state.auth.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const isMe = userId === _id;

  const getUser = async () => {
    try {
      const response = await getUserRequest(userId, token);
      const data = await response.json();
      console.log(data);
      setUser(data);
    } catch (error) {
      console.log("err" + error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "74%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} isMe={isMe} />
          <PostsWidget userId={userId} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
