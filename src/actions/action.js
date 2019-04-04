export const logIn = (logInInfo) => ({type: "LOG_IN", payload: logInInfo})
export const signUp = (signUpInfo) => ({type: "SIGN_UP", payload: signUpInfo})
export const currentUser = (currentUserInfo) => ({type: "LOAD_CURRENT_USER", payload: currentUserInfo})
export const updateUser = (userInfo) => ({type: "UPDATE_USER", payload: userInfo})


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

export const updateCurrentUser = (id, newUserInfo) => (dispatch) => {
  let token = localStorage.token
  return fetch(`http://localhost:3000/api/v1/users/${id}`, {
    headers: {
      "content-type": "application/json",
      accepts: "application/json",
      Authorization: `Bearer ${token}`
    },
    method: "PATCH",
    body: JSON.stringify(newUserInfo)

  })
  .then(r=>r.json())
  .then(res => dispatch(updateUser(res)) )
  .catch(console.error)
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
