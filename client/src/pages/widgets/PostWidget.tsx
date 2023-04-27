import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { patchLikeRequest } from "../../api/Post";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setPost } from "../../redux";
import { ThemeSettings } from "../../theme";

interface PostWidgetProps {
  postId: string;
  postUserId: string;
  name: string;
  description: string;
  location: string;
  picturePath: string;
  userPicturePath: string;
  likes: any;
  comments: [string];
}

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}: PostWidgetProps) => {
  const [isComments, setIsComments] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const loggedInUserId = useAppSelector((state) => state.auth.user._id);

  const [isLiked, setIsLiked] = useState<boolean>(
    Boolean(likes[loggedInUserId])
  );

  const [likeCount, setLikeCount] = useState<number>(Object.keys(likes).length);

  // console.log(isLiked);
  const { palette } = useTheme<ThemeSettings>();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    try {
      const response = await patchLikeRequest(postId, token, loggedInUserId);
      console.log("response", response);
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setIsLiked(!isLiked);
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <WidgetWrapper mb="2rem">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:6001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
