import { TokenType } from "./Post";

export const getUserRequest = (userId: string, token: TokenType) => {
  return fetch(`http://localhost:6001/users/${userId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getFriendsRequest = (userId: string, token: TokenType) => {
  return fetch(`http://localhost:6001/users/${userId}/friends`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const patchFriendRequest = (
  _id: string,
  friendId: string,
  token: TokenType
) => {
  return fetch(`http://localhost:6001/users/${_id}/${friendId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
