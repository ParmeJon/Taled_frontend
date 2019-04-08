const initialState = {
  current_user: {},
  current_trip: {},
  all_trips: []
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
      return {...state, current_user: action.payload.user, all_trips: action.payload.trips}
    }

    case('UPDATE_USER'): {
      // localStorage.removeItem("token")
      // localStorage.setItem("token", action.payload.jwt)
      return {...state, current_user: action.payload.user}
    }

    case ('LOAD_CURRENT_USER'): {
      return {...state, current_user: action.payload.user}
    }

    case ('CREATE_TRIP'): {
      return {...state, current_trip: action.payload.trip, current_user: action.payload.user}
    }

    default:
      return state
  }
}

export default reducer
