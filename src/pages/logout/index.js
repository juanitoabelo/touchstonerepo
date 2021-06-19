import * as React from "react"
import { logout } from "../../components/services/auth"

export default function Index() {
    const isBrowser = typeof window !== "undefined"
    logout();
    if (isBrowser) {
        window.location.href="/";
      }
    
      return (
        <>
        </>
        );
}