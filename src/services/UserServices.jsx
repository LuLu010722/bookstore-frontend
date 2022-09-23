import { home } from "./CommonServices"
import { message } from "antd"

const root = home + "/user"

export const register = async (data) => {
  const res = await fetch(root + "/register", {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(data),
    credentials: "include"
  })
  return await res.json()
}

export const login = async (username, password) => {
  console.log(username, password)
  return fetch(root + "/login", {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    credentials: "include",
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
    .then((res) => res.json())
    .catch(() => {})
}

export const logout = () => {
  return fetch(root + "/logout", {
    credentials: "include"
  }).then((res) => res.json())
}

export const getUser = async () => {
  const res = await fetch(root + "/get", {
    credentials: "include"
  })
  return await res.json()
}

export const getAllUsers = async () => {
  const res = await fetch(root + "/all", {
    credentials: "include"
  })
  return await res.json()
}

export const addUserByAdmin = async (user) => {
  const res = await fetch(root + "/add", {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(user)
  })
  return await res.json()
}

export const updateUserByAdmin = async (user) => {
  const res = await fetch(root + "/update", {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(user)
  })
  console.log(res)
  return await res.json()
}

export const deleteUserById = (userId) => {
  return fetch(root + "/delete?user-id=" + userId, {
    credentials: "include"
  })
    .then((res) => res.json())
    .catch(() => {
      message.warn("对不起，您没有权限")
      return Promise.reject()
    })
}
