import { Button } from "@mui/material";
import React from "react";
import "./Login.css";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

function Login() {
  const signIn = () => {
    signInWithPopup(auth, provider).catch((err) => alert(err.message));
  };
  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://imgs.search.brave.com/4tDZ9_9I8rmXYzpkDtcSYMUQaN-v51JESqu2jenf8Ak/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9sb2dv/cy1kb3dubG9hZC5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjEvMDEvRGlzY29y/ZF9Mb2dvLTEucG5n"
          alt=""
        />
      </div>
      <Button onClick={signIn}>Sign in with Google</Button>
    </div>
  );
}

export default Login;
