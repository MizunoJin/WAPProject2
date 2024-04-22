const initialState = {
  userProfile: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_PROFILE":
      return { ...state, userProfile: action.payload };
    case "CLEAR_USER_PROFILE":
      return { ...state, userProfile: null };
    default:
      return state;
  }
};

export default userReducer;
