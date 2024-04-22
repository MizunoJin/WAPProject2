export const setUserProfile = (profile) => ({
  type: "SET_USER_PROFILE",
  payload: profile,
});

export const clearUserProfile = () => ({
  type: "CLEAR_USER_PROFILE",
});
