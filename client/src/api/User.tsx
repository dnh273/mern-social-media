import { DOMAIN } from "../utils/setting/config";
import { TokenType } from "./Post";

export const getUserRequest = (userId: string, token: TokenType) => {
  return fetch(`${DOMAIN}/users/${userId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getFriendsRequest = (userId: string, token: TokenType) => {
  return fetch(`${DOMAIN}/users/${userId}/friends`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const patchFriendRequest = (
  _id: string,
  friendId: string,
  token: TokenType
) => {
  return fetch(`${DOMAIN}/users/${_id}/${friendId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
