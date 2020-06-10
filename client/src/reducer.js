// export default function reducer(state, action) {
//   switch (action.type) {
//     case "LOGIN_USER":
//       return { ...state, currentUser: action.payload };

//     default:
//       return state;
//   }
// }
export default function reducer(state, { type, payload }) {
  switch (type) {
    case "LOGIN_USER":
      return { ...state, currentUser: payload };

    case "IS_LOGGED_IN":
      return {
        ...state,
        isAuth: payload,
      };

    case "SIGNOUT_USER":
      return {
        ...state,
        isAuth: false,
        currentUser: null,
      };

    default:
      return state;
  }
}
