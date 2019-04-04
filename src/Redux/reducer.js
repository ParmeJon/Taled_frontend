const initialState = {
  current_user: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ('LOAD_USERS'): {
      return {...state, trips: action.payload}
    }

    case ('SIGN_UP'): {
      localStorage.setItem("token", action.payload.jwt)
      return {...state, current_user: action.payload.user}
    }

    case ('LOG_IN'): {
      localStorage.setItem("token", action.payload.jwt)
      // console.log(action.payload.user.first_name)
      return {...state, current_user: action.payload.user}
    }

    case('UPDATE_USER'): {
      // localStorage.removeItem("token")
      // localStorage.setItem("token", action.payload.jwt)
      return {...state, current_user: action.payload.user}
    }

    case ('LOAD_CURRENT_USER'): {
      return {...state, current_user: action.payload.user}
    }

    default:
      return state
  }
}

export default reducer
