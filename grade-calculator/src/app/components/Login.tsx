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
import { doCredentialLogin } from "../actions";

//type LoginProps = {
//  onLogin: (user: User) => void;
//};

type User = {
  username: string;
  password: string;
};

export default function Login(/*{ onLogin }: LoginProps*/) {
  const router = useRouter();

  //const handleLoginClick = () => {
  //  router.push("/CourseView");
  //};

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const usernameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const passwordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    // ensure a username and password are given
    if (!username || !password) {
      setError("Please enter a username and a password.");
      return;
    }

    setLoading(true);
    setError("");
    // new user
    //const user: User = {
    //  username: username,
    //  password: password,
    //};

    //const formData = new FormData();
    //formData.append("username", username);
    //formData.append("password", password);

    try {
      const response = await doCredentialLogin(
        new FormData(event.target as HTMLFormElement)
      );

      // check if login was successful
      if (response?.error) {
        // show error message if login failed
        setError("Invalid credentials or login failed. Please try again.");
      } else {
        router.push("/CourseView");
      }
    } catch (err) {
      // handle other errors
      console.error("Login failed:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
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
                name="username"
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
                name="password"
                type="password"
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

          {error && <p>{error}</p>}

          <div className={style.link}>
            <Link id={style.account} href={"/Signup"}>
              Create Account
            </Link>
          </div>
          <div className={style.btn}>
            <Button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
