import { DOMAIN } from "../utils/setting/config";

export type TokenType = string | null;

export const getPostsRequest = (token: TokenType) => {
  return fetch(`${DOMAIN}/posts`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getUserPostsRequest = (userId: string, token: TokenType) => {
  return fetch(`${DOMAIN}/posts/${userId}/posts`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const patchLikeRequest = (
  postUserId: string,
  token: TokenType,
  userId: string
) => {
  return fetch(`${DOMAIN}/posts/${postUserId}/like`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: userId }),
  });
};

export const createPostRequest = (token: TokenType, data: any) => {
  return fetch(`${DOMAIN}/posts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: data,
  });
};
