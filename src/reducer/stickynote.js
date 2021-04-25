const initialState = {
  notes: localStorage.getItem("stickynotes")
    ? JSON.parse(localStorage.getItem("stickynotes"))
    : [
        {
          name: "New Note",
          updateDate: new Date().toUTCString(),
          noteText: "",
          position: {
            x: 20,
            y: 20
          }
        },
      ],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_NOTES":
      localStorage.setItem('stickynotes', JSON.stringify(action.payload));
      return {
        ...state,
        notes: action.payload,
      };
    default:
      return state;
  }
}
