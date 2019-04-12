const initialState = {
  current_user: {},
  selected_trip: {},
  selected_trip_posts: [],
  post_geolocation: '',
  set_term: '',
  loaded_users: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ('LOAD_USERS'): {
      return {...state, loaded_users: action.payload}
    }

    case ("SET_TERM"): {
      return {...state, set_term: action.payload}
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

    case ('LOG_OUT'): {
      state = initialState
      return state
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
      return {...state, selected_trip: action.payload.trip, current_user: action.payload.user}
    }

    case ('SELECT_TRIP'): {
      let posts = state.current_user.posts.filter(post => post.trip_id === action.payload.id)
      console.log("selecting trip", posts)
      return {...state, selected_trip: action.payload, selected_trip_posts: posts}
    }

    case ('DELETE_TRIP'): {
      // let newTrips = [...state.all_trips].filter(trip => trip.id !== action.payload.id)
      return {...state, current_user: action.payload.user}
    }

    case ('CREATE_POST'): {
      let posts = action.payload.user.posts.filter(post => post.trip_id === action.payload.trip.id)
      return {...state, current_user: action.payload.user, selected_trip: action.payload.trip, selected_trip_posts: posts}
    }

    case ('FINISH_TRIP'): {
      return {...state, current_user: action.payload.user}
    }

    case ('GET_AREA'): {
      let place = action.payload['Response']['View'][0]["Result"][0]["Location"]["Address"].Label
      return {...state, post_geolocation: place }
    }

    default:
      return state
  }
}

export default reducer
