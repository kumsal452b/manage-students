"use client";
import { Button, TextField } from "@mui/material";
import { useRouter,redirect,usePathname } from "next/navigation";
import React, { useState } from "react";
function Login() {
  let thePass='12345';
  let theUser='admin'
  const router=useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const signIn=()=>{
    if(username===theUser && password===thePass){
      router.push('http://localhost:3000/home')
    }else{
      alert('Wrong password or username')
    }
  }
  return (
    <main className="w-full h-screen bg-gradient-to-r from-blue-500 to-fuchsia-500 items-center flex justify-center background-animate">
      <div className="w-96 max-h-96 flex bg-blue-300 items-center justify-center flex-col p-4 rounded-2xl bg-gradient-to-tr from-fuchsia-500 to-violet-500">
        <div className="flex mb-10">
          <div className="w-1 bg-yellow-400 mr-1"></div>
          <span className="font-sans text-2xl  uppercase antialiased hover:subpixel-antialiased">
            Manage Courses
          </span>
        </div>
        <div className="mb-10 flex flex-col items-center justify-center ">
          <span className="font-sans text-2xl  uppercase antialiased hover:subpixel-antialiased">
            Sign In
          </span>
          <span className="font-sans text-sm  antialiased hover:subpixel-antialiased">
            Enter your credentials to access your account
          </span>
        </div>
        <div className="w-80 mb-3">
          <TextField
            id="outlined-username"
            label="Username"
            variant="outlined"
            autoComplete="off"
            fullWidth
            autoCorrect="off"
            value={username}
            onChange={(event)=>{
              setUsername(event.target.value)
            }}
          />
        </div>
        <div className="w-80 mb-3">
          <TextField
            id="outlined-password"
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(event)=>{
              setPassword(event.target.value)
            }}
          />
        </div>
        <div className="w-80 mb-3 flex items-center justify-center flex-col">
          <Button variant="outlined" fullWidth onClick={signIn}>
            Sign In
          </Button>
          <div>
            <span className="font-sans text-sm  antialiased hover:subpixel-antialiased">
              Forgot your password?
            </span>
            <span className="font-sans text-sm  antialiased hover:subpixel-antialiased text-cyan-600 cursor-pointer">
              Reset Password
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
