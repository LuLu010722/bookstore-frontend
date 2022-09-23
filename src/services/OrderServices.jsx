import { home } from "./CommonServices";

const root = home + "/order";

export const createOrderByBookIds = async (books) => {
  const res = await fetch(root + "/create", {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(books),
    credentials: "include",
  })
    .then((data) => data.json())
    .catch(() => {});

  return await res;
};

export const getOrders = async () => {
  const res = await fetch(root + "/get", {
    credentials: "include",
  })
    .then((data) => data.json())
    .catch(() => {});

  return await res;
};

export const getAllOrders = async () => {
  const data = await fetch(root + "/all", {
    credentials: "include",
  });
  return await data.json();
};
