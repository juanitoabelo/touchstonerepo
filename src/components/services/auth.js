import * as React from "react"

export const isBrowser = () => typeof window !== "undefined"
export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}
const setUser = user =>
isBrowser() && window.localStorage.setItem("gatsbyUser", JSON.stringify(user))

export const handleLogin = ({ username, password, companyid }) => {
  if ( username  && password) {
    return setUser({
      username: username,
      email: password,
      companyid: companyid,
    })
  }
  return false
}
export const isLoggedIn = () => {
  const user = getUser()
  return !!user.username
}
export const logout = () => {
  setUser({})
}


export default function Auth() {
  return (
    <>
    </>
    );
}