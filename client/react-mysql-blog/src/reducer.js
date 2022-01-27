const initialState = {
  edit: false,
  users: [],
  alert: false,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'EDITING':
      return { ...state, edit: action.payload }
    case 'GET_DATA':
      return { ...state, users: action.payload }
    case 'SET_ALERT':
      return { ...state, alert: action.payload }
    default:
      return state
  }
}
