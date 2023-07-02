"use client";
import { useRouter } from "next/navigation";
export default function Home2() {
  const router = useRouter();
  const theLoginKey = localStorage.getItem("isLoggedIn");
  if (!theLoginKey) {
    router.push("http://localhost:3000/login");
  } else {
    router.push("http://localhost:3000/home");
  }
  return <div>Non-Auth Stuation has dedected. Redirecting...</div>;
}
