import React, { useEffect, useState } from "react";
import { getPostsRequest, getUserPostsRequest } from "../../api/Post";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setPosts } from "../../redux";
import PostWidget from "./PostWidget";

interface PostsWidgetProps {
  userId: string;
  isProfile?: boolean;
}

const PostsWidget = ({ userId, isProfile = false }: PostsWidgetProps) => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.auth.posts);
  const token = useAppSelector((state) => state.auth.token);
  const getPosts = async () => {
    try {
      const response = await getPostsRequest(token);
      const data = await response.json();
      if (response.status === 200) {
        dispatch(setPosts({ posts: data.reverse() }));
      }
    } catch (err) {
      console.log("err" + err);
    }
  };
  console.log("posts", posts);

  const getUserPosts = async () => {
    try {
      const response = await getUserPostsRequest(userId, token);
      const data = await response.json();
      console.log(response);
      console.log(data);
      if (response.status === 200) {
        dispatch(setPosts({ posts: data }));
      }
    } catch (err) {
      console.log("err" + err);
    }
  };

  useEffect(() => {
    if (isProfile === true) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);

  const renderPosts = () => {
    return posts?.map(
      ({
        _id,
        userId,
        firstName,
        lastName,
        description,
        location,
        picturePath,
        userPicturePath,
        likes,
        comments,
      }) => (
        <PostWidget
          key={_id}
          postId={_id}
          postUserId={userId}
          name={`${firstName} ${lastName}`}
          description={description}
          location={location}
          picturePath={picturePath}
          userPicturePath={userPicturePath}
          likes={likes}
          comments={comments}
        />
      )
    );
  };

  return <>{!!posts.length && renderPosts()}</>;
};

export default PostsWidget;
