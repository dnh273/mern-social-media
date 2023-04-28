// @ts-nocheck
import {
  AttachFileOutlined,
  DeleteOutlined,
  EditOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import Dropzone from "react-dropzone";
import Swal from "sweetalert2";
import { createPostRequest } from "../../api/Post";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setPosts } from "../../redux";
import { ThemeSettings } from "../../theme";

interface MyPostWidgetProps {
  picturePath: string;
  isMe: boolean;
}

const MyPostWidget = ({ picturePath, isMe }: MyPostWidgetProps) => {
  const dispatch = useAppDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme<ThemeSettings>();
  const { _id } = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("description", post);
      if (image) {
        formData.append("picture", image);
        formData.append("picturePath", image.name);
      }

      const response = await createPostRequest(token, formData);
      const posts = await response.json();
      console.log(response);
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Great",
          text: "Your post successfully posted",
        });
        dispatch(setPosts({ posts }));
        setImage(null);
        setPost("");
      }
    } catch (error) {
      console.log("err" + error);
    }
  };

  return (
    <>
      {isMe && (
        <WidgetWrapper mb="2rem">
          <FlexBetween gap="1.5rem">
            <UserImage image={picturePath} />
            <InputBase
              placeholder="What's on your mind..."
              onChange={(e) => setPost(e.target.value)}
              value={post}
              sx={{
                width: "100%",
                backgroundColor: palette.neutral.light,
                borderRadius: "2rem",
                padding: "1rem 2rem",
              }}
            />
          </FlexBetween>
          {isImage && (
            <Box
              border={`1px solid ${medium}`}
              borderRadius="5px"
              mt="1rem"
              p="1rem"
            >
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
              >
                {({ getRootProps, getInputProps }) => (
                  <FlexBetween>
                    <Box
                      {...getRootProps()}
                      border={`2px dashed ${palette.primary.main}`}
                      p="1rem"
                      width="100%"
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                      <input {...getInputProps()} />
                      {!image ? (
                        <p>Add Image Here</p>
                      ) : (
                        <FlexBetween>
                          <Typography>{image.name}</Typography>
                          <EditOutlined />
                        </FlexBetween>
                      )}
                    </Box>
                    {image && (
                      <IconButton
                        onClick={() => setImage(null)}
                        sx={{ width: "15%" }}
                      >
                        <DeleteOutlined />
                      </IconButton>
                    )}
                  </FlexBetween>
                )}
              </Dropzone>
            </Box>
          )}

          <Divider sx={{ margin: "1.25rem 0" }} />

          <FlexBetween>
            <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
              <ImageOutlined sx={{ color: mediumMain }} />
              <Typography
                color={mediumMain}
                sx={{ "&:hover": { cursor: "pointer", color: medium } }}
              >
                Image
              </Typography>
            </FlexBetween>

            {isNonMobileScreens ? (
              <>
                <FlexBetween gap="0.25rem">
                  <GifBoxOutlined sx={{ color: mediumMain }} />
                  <Typography color={mediumMain}>Clip</Typography>
                </FlexBetween>

                <FlexBetween gap="0.25rem">
                  <AttachFileOutlined sx={{ color: mediumMain }} />
                  <Typography color={mediumMain}>Attachment</Typography>
                </FlexBetween>

                <FlexBetween gap="0.25rem">
                  <MicOutlined sx={{ color: mediumMain }} />
                  <Typography color={mediumMain}>Audio</Typography>
                </FlexBetween>
              </>
            ) : (
              <FlexBetween gap="0.25rem">
                <MoreHorizOutlined sx={{ color: mediumMain }} />
              </FlexBetween>
            )}

            <Button
              disabled={!post}
              onClick={handlePost}
              sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "3rem",
              }}
            >
              POST
            </Button>
          </FlexBetween>
        </WidgetWrapper>
      )}
    </>
  );
};

export default MyPostWidget;
