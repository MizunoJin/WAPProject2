const initialState = {
  userProfile: null,
  isAuth: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_PROFILE":
      return { ...state, userProfile: action.payload };
    case "CLEAR_USER_PROFILE":
      return { ...state, userProfile: null };
    case "SET_AUTH_STATE":
      return { ...state, isAuth: action.payload };
    default:
      return state;
  }
};

export default userReducer;
