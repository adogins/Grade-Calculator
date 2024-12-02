"use client";
import React, { use } from "react";
import style from "./Login.module.css";
import Image from "next/image";
import user from "../../../public/images/User.png";
import lock from "../../../public/images/Lock.png";
import Button from "./LoginButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";
import { signIn } from "next-auth/react";
//import { redirect } from "next/dist/server/api-utils";

type LoginProps = {
  onLogin: (user: User) => void;
};

type User = {
  username: string;
  password: string;
};

export default function Login({ onLogin }: LoginProps) {
  const router = useRouter();

  //const handleLoginClick = () => {
  //  router.push("/CourseView");
  //};

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const usernameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const passwordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    setError("");

    // call signin
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid username or password.");
    } else {
      router.push("/CourseView");
      onLogin({ username, password });
      setUsername("");
      setPassword("");
      setError("");
    }

    try {
      const response = await signIn("credentials", { username, password });

      if (response?.error) {
        setError("Invalid credentials. Try again");
      } else {
        onLogin({ username, password });
        setUsername("");
        setPassword("");
        setError("");
        router.push("/CourseView");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login.");
    }
  };

  return (
    <section className={style.bg}>
      <h1>Welcome Back !</h1>
      <div className={style.bg2}>
        <form onSubmit={submitHandler}>
          <div className={style.signin}>
            <div className={style.rows}>
              <label htmlFor="username">Username</label>
              <input
                className={style.input}
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={usernameHandler}
              />
              <Image
                className={style.pic}
                src={user}
                alt="User icon"
                width={50}
                height={50}
              />
            </div>
            <div className={style.rows}>
              <label htmlFor="password">Password</label>
              <input
                className={style.input}
                id="password"
                type="text"
                placeholder="Enter your password"
                value={password}
                onChange={passwordHandler}
              />
              <Image
                className={style.pic}
                src={lock}
                alt="User icon"
                width={50}
                height={50}
              />
            </div>
          </div>
          <div className={style.link}>
            <Link id={style.forgot} href={"/"}>
              Forgot Password?
            </Link>
            <Link id={style.account} href={"/Signup"}>
              Create Account
            </Link>
          </div>
          <div className={style.btn}>
            <Button type="submit">Login</Button>
          </div>
        </form>
      </div>
    </section>
  );
}
