import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { patchFriendRequest } from "../api/User";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setFriends } from "../redux";
import { ThemeSettings } from "../theme";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

interface FriendProps {
  friendId: string;
  name: string;
  subtitle: string;
  userPicturePath: string;
}

const Friend = ({ friendId, name, subtitle, userPicturePath }: FriendProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { _id } = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const friends = useAppSelector((state) => state.auth.user.friends);

  const { palette } = useTheme<ThemeSettings>();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend: any) => friend._id === friendId);
  const isMe = friendId === _id;

  const patchFriend = async () => {
    const response = await patchFriendRequest(_id, friendId, token);

    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {!isMe && (
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;
