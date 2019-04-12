

export const logIn = (logInInfo) => ({type: "LOG_IN", payload: logInInfo})
export const signUp = (signUpInfo) => ({type: "SIGN_UP", payload: signUpInfo})
export const currentUser = (currentUserInfo) => ({type: "LOAD_CURRENT_USER", payload: currentUserInfo})
export const updateUser = (userInfo) => ({type: "UPDATE_USER", payload: userInfo})
export const createTrip = (tripInfo) => ({type: "CREATE_TRIP", payload: tripInfo})
export const selectTrip = (tripInfo) => ({type: "SELECT_TRIP", payload: tripInfo})
export const deleteStateTrip = (tripInfo) => ({type: "DELETE_TRIP", payload: tripInfo})
export const createPost = (postInfo) => ({type: "CREATE_POST", payload: postInfo})
export const finishTrip = (returnInfo) => ({type: "FINISH_TRIP", payload: returnInfo})
export const areaResponse = (res) => ({type: "GET_AREA", payload: res})
export const loadedUsers = (res) => ({type: "LOAD_USERS", payload: res})


export const loadUsers = () => (dispatch) => {
  let token = localStorage.token
  return fetch(`http://localhost:3000/api/v1/other_users`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      accepts: "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  .then(r => r.json())
  .then(res => dispatch(loadedUsers(res)))
  .catch(console.error)
}

export const getArea = (coordinates) => (dispatch) => {
  return fetch(`https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?app_id=${process.env.REACT_APP_GEOLOCATION_APP_ID}&app_code=${process.env.REACT_APP_GEOLOCATION_APP_CODE}&mode=retrieveAreas&prox=${coordinates}`)
  .then(r => r.json())
  .then( res => dispatch(areaResponse(res)))
  .catch(console.error)
  // .then(res => dispatch(areaResponse(res)))
}

export const updateFinishTrip = (id, completed) => (dispatch) => {
  let token = localStorage.token
  return fetch(`http://localhost:3000/api/v1/trips/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      accepts: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      completed: !completed
    })
  })
  .then(r => r.json())
  .then(res => dispatch(finishTrip(res)) )
}

export const postCreatePost = (postInfo) => (dispatch) => {
  let token = localStorage.token
  let formData = new FormData()
  if (postInfo.post_image) {
    formData.append("post_image", postInfo.post_image)
  }
  formData.append("title", postInfo.title)
  formData.append("content", postInfo.content)
  formData.append("geolocation", postInfo.geolocation)
  formData.append("trip_id", postInfo.trip_id)

  return fetch(`http://localhost:3000/api/v1/posts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  })
  .then(r => r.json())
  .then(res => {
    console.log(res)
    dispatch(createPost(res))} )
}

export const deleteTrip = (tripInfo) => (dispatch) => {
  let token = localStorage.token
  return fetch(`http://localhost:3000/api/v1/trips/${tripInfo.id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      accepts: "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  .then(r=>r.json())
  .then(res => dispatch(deleteStateTrip(res)))
  .catch(console.error)
}

export const postCreateTrip = (tripInfo) => (dispatch) => {
  let token = localStorage.token
  return fetch(`http://localhost:3000/api/v1/trips`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accepts: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(tripInfo)
  })
  .then(r=>r.json())
  .then(res => dispatch(createTrip(res)))
  .catch(console.error)
}


export const getCurrentUser = (token) => (dispatch) => {
  return fetch(`http://localhost:3000/api/v1/current_user`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      accepts: "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  .then(r=>r.json())
  .then(res => dispatch(currentUser(res)) )
  .catch(console.error)
}

export const updateThisUser = (id, newUserInfo) => (dispatch) => {
  let token = localStorage.token
  let formData = new FormData()
  if (newUserInfo.profile_image) {
    formData.append("profile_image", newUserInfo.profile_image)
  }
  formData.append("email", newUserInfo.email)
  formData.append("first_name", newUserInfo.first_name)
  formData.append("last_name", newUserInfo.last_name)
  formData.append("active", newUserInfo.active)

  return fetch(`http://localhost:3000/api/v1/users/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  })
  .then(r => r.json())
  .then(res => dispatch(updateUser(res)) )
}

export const createUser = (signUpInfo) => {
  return dispatch => {
    return fetch(`http://localhost:3000/api/v1/signup`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(signUpInfo)
    })
    .then(r => r.json())
    .then(res => dispatch(signUp(res)))
    .catch(console.error)
  }
}

export const loginUser = (logInInfo) => {
  return dispatch => {
    return fetch(`http://localhost:3000/api/v1/login`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(logInInfo)
    })
    .then(r => r.json())
    .then(res => dispatch(logIn(res)))
    .catch(console.error)
  }
}
