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

    case "CREATE_DRAFT_PIN":
      return {
        ...state,
        draft: {
          latitude: 0,
          longitude: 0,
        },
      };

    case "UPDATE_DRAFT_LOCATION":
      return {
        ...state,
        draft: payload,
      };

    case "DELETE_DRAFT_PIN":
      return {
        ...state,
        draft: null,
      };

    default:
      return state;
  }
}
