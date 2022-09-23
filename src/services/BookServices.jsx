import { home } from "./CommonServices"
import cookie from 'react-cookies'

const root = home + "/book"

export const getAllBook = async () => {
  const res = await fetch(root + "/all")
    .then((res) => res.json())
    .catch(() => {})

  return await res
}

export const getBook = async (id) => {
  const res = await fetch(root + "/select?id=" + id).then((res) => res.json())
  return await res
}

export const saveBook = async (book) => {
  console.log(cookie.load("JSESSIONID"))
  const res = await fetch(root + "/add", {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    credentials: "include",
    body: JSON.stringify(book)
  })

  return await res.json()
}

export const deleteBookById = (bookId) => {
  return fetch(root + "/delete?book-id=" + bookId, {
    credentials: "include"
  })
}
