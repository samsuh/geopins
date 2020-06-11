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
        currentPin: null,
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

    case "GET_PINS":
      return {
        ...state,
        pins: payload,
      };

    case "CREATE_PIN":
      const newPin = payload;
      const prevPins = state.pins.filter((pin) => pin._id !== newPin._id);
      return {
        ...state,
        pins: [...prevPins, newPin],
      };

    case "SET_PIN":
      return {
        ...state,
        currentPin: payload,
        draft: null,
      };

    case "DELETE_PIN":
      const deletedPin = payload;
      const filteredPins = state.pins.filter(
        (pin) => pin._id !== deletedPin._id
      );
      return {
        ...state,
        pins: filteredPins,
        currentPin: null,
      };

    case "CREATE_COMMENT":
      //take the return value from mutation, once we have updated pin with the added comment, go through entire pins array, find the pin with matching id from payload, and swap out old pin with new pin.
      const updatedCurrentPin = payload;
      //find and replace
      const updatedPins = state.pins.map((pin) =>
        pin._id === updatedCurrentPin._id ? updatedCurrentPin : pin
      );
      return {
        ...state,
        pins: updatedPins,
        currentPin: updatedCurrentPin, //stays on the pin the user was just on so they see their comment.
      };

    default:
      return state;
  }
}
