import { Box, Typography, useTheme } from "@mui/material";
import React, { memo, useEffect } from "react";
import { getFriendsRequest } from "../../api/User";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setFriends } from "../../redux";
import { ThemeSettings } from "../../theme";

interface FriendListWidgetProps {
  userId: string;
}

const FriendListWidget = ({ userId }: FriendListWidgetProps) => {
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.auth.token);
  const friends = useAppSelector((state) => state.auth.user.friends);

  const getFriends = async () => {
    try {
      const response = await getFriendsRequest(userId, token);

      const data = await response.json();
      dispatch(setFriends({ friends: data }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFriends();
  }, []);
  const { palette } = useTheme<ThemeSettings>();

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend: any) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
