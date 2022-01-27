const initialState = {
  edit: false,
  users: [],
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'EDITING':
      return { ...state, edit: action.payload }
    case 'GET_DATA':
      return { ...state, users: action.payload }
    default:
      return state
  }
}
